#!/usr/bin/env python3
"""Differential Python oracle and CLI verifier for XinOrigin/moon-warc."""

from __future__ import annotations

import atexit
import base64
import gzip
import hashlib
import io
import json
import os
from pathlib import Path
import pwd
import shutil
import subprocess
import sys
import zlib
from typing import Dict, List, Optional, Tuple


REPO_ROOT = Path(__file__).resolve().parent.parent
PROBE_DIR_NAME = "_oracle_probe_tmp"


def resolve_moon_bin() -> Tuple[Optional[str], Optional[str]]:
    which_moon = shutil.which("moon")
    if which_moon:
        moon_bin = str(Path(which_moon).resolve().parent)
        return moon_bin, str(Path(moon_bin).parent)
    candidates: List[Path] = []
    if os.environ.get("MOON_HOME"):
        candidates.append(Path(os.environ["MOON_HOME"]))
    candidates.append(Path.home() / ".moon")
    try:
        candidates.append(Path(pwd.getpwuid(os.getuid()).pw_dir) / ".moon")
    except KeyError:
        pass
    candidates.append(Path("/Users/xinorigin/.moon"))
    for home_dir in candidates:
        exe = home_dir / "bin" / "moon"
        if exe.is_file() and os.access(exe, os.X_OK):
            return str(exe.parent), str(home_dir)
    return None, None


def moon_env() -> Dict[str, str]:
    env = os.environ.copy()
    moon_bin, moon_home = resolve_moon_bin()
    if not moon_bin:
        raise FileNotFoundError(
            "Unable to locate 'moon' binary via PATH, MOON_HOME, HOME, or passwd home; "
            "export MOON_HOME or add ~/.moon/bin to PATH."
        )
    path_parts = env.get("PATH", "").split(os.pathsep) if env.get("PATH") else []
    if moon_bin not in path_parts:
        env["PATH"] = moon_bin + os.pathsep + env.get("PATH", "")
    if moon_home and "MOON_HOME" not in env:
        env["MOON_HOME"] = moon_home
    return env


def run_cmd(cmd: List[str], cwd: Path) -> subprocess.CompletedProcess[str]:
    proc = subprocess.run(
        cmd,
        cwd=str(cwd),
        env=moon_env(),
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(
            f"Command failed ({proc.returncode}): {' '.join(cmd)}\n"
            f"STDOUT:\n{proc.stdout}\nSTDERR:\n{proc.stderr}"
        )
    return proc


def py_warc_sha1(data: bytes) -> str:
    return "sha1:" + base64.b32encode(hashlib.sha1(data).digest()).decode("ascii")


def py_warc_sha256(data: bytes) -> str:
    return "sha256:" + base64.b32encode(hashlib.sha256(data).digest()).decode("ascii")


def py_decode_chunked(raw: bytes) -> bytes:
    out = bytearray()
    pos = 0
    n = len(raw)
    while True:
        if pos >= n:
            raise ValueError("truncated chunk stream")
        crlf = raw.find(b"\r\n", pos)
        if crlf == -1:
            raise ValueError("missing CRLF after chunk size")
        size_line = raw[pos:crlf].decode("ascii")
        size_hex = size_line.split(";", 1)[0].strip()
        chunk_size = int(size_hex, 16)
        pos = crlf + 2
        if chunk_size == 0:
            while True:
                if pos + 2 > n:
                    raise ValueError("truncated chunk trailer")
                if raw[pos : pos + 2] == b"\r\n":
                    return bytes(out)
                next_crlf = raw.find(b"\r\n", pos)
                if next_crlf == -1:
                    raise ValueError("missing trailer CRLF")
                pos = next_crlf + 2
        if pos + chunk_size + 2 > n:
            raise ValueError("truncated chunk payload")
        out.extend(raw[pos : pos + chunk_size])
        pos += chunk_size
        if raw[pos : pos + 2] != b"\r\n":
            raise ValueError("missing CRLF after chunk payload")
        pos += 2


def _is_ipv4(host: str) -> bool:
    parts = host.split(".")
    if len(parts) != 4:
        return False
    for part in parts:
        if not part.isdigit() or len(part) > 3 or int(part) > 255:
            return False
    return True


def _normalize_path(raw_path: str) -> str:
    trailing_slash = raw_path.endswith("/")
    segments: List[str] = []
    for seg in raw_path.split("/"):
        if seg == "" or seg == ".":
            continue
        if seg == "..":
            if segments:
                segments.pop()
        else:
            segments.append(seg)
    if not segments:
        return "/"
    rendered = "/" + "/".join(segments)
    if (
        trailing_slash
        and not raw_path.endswith("/.")
        and not raw_path.endswith("/..")
    ):
        rendered += "/"
    return rendered


def py_to_surt(raw_url: str) -> str:
    trimmed = raw_url.strip()
    scheme_raw, after_scheme = trimmed.split("://", 1)
    scheme = scheme_raw.lower()
    auth_end = len(after_scheme)
    for ch in ("/", "?", "#"):
        idx = after_scheme.find(ch)
        if idx != -1 and idx < auth_end:
            auth_end = idx
    authority = after_scheme[:auth_end]
    tail = after_scheme[auth_end:]
    host_port = authority.rsplit("@", 1)[-1]
    port: Optional[int] = None
    if host_port.startswith("["):
        rb = host_port.find("]")
        host = host_port[: rb + 1].lower()
        rest = host_port[rb + 1 :]
        if rest.startswith(":"):
            port = int(rest[1:])
    elif ":" in host_port:
        h, p = host_port.rsplit(":", 1)
        host = h.lower()
        port = int(p)
    else:
        host = host_port.lower()

    clean_host = host[:-1] if host.endswith(".") and len(host) > 1 else host
    if clean_host.startswith("[") or _is_ipv4(clean_host):
        surt_host = clean_host
    else:
        labels = [lbl for lbl in clean_host.split(".") if lbl]
        labels.reverse()
        surt_host = ",".join(labels)

    default_ports = {"http": 80, "https": 443, "ftp": 21, "ws": 80, "wss": 443}
    port_part = (
        ""
        if port is None or default_ports.get(scheme) == port
        else f":{port}"
    )

    before_frag = tail.split("#", 1)[0]
    if "?" in before_frag:
        path_raw, query = before_frag.split("?", 1)
    else:
        path_raw, query = before_frag, None
    path = _normalize_path(path_raw if path_raw else "/")

    query_part = ""
    if query is not None:
        items = []
        for part in query.split("&"):
            if not part:
                continue
            if "=" in part:
                k, v = part.split("=", 1)
            else:
                k, v = part, ""
            items.append((k, v, part))
        items.sort(key=lambda x: (x[0], x[1], x[2]))
        if items:
            query_part = "?" + "&".join(item[2] for item in items)

    return f"{surt_host}{port_part}){path}{query_part}"


def py_build_warc_record(
    fields: List[Tuple[str, str]],
    payload: bytes,
    version: str = "WARC/1.1",
) -> bytes:
    lines = [version]
    for k, v in fields:
        lines.append(f"{k}: {v}")
    hdr = ("\r\n".join(lines) + "\r\n\r\n").encode("utf-8")
    return hdr + payload + b"\r\n\r\n"


def mbt_bytes_expr(data: bytes) -> str:
    if not data:
        return 'b""'
    chunks = []
    for i in range(0, len(data), 48):
        piece = "".join(f"\\x{b:02x}" for b in data[i : i + 48])
        chunks.append(f'b"{piece}"')
    return " + ".join(chunks)


def verify_cli_outputs() -> None:
    native_out = run_cmd(["moon", "run", "cmd/main", "--target", "native"], REPO_ROOT).stdout
    js_out = run_cmd(["moon", "run", "cmd/main", "--target", "js"], REPO_ROOT).stdout
    if native_out != js_out:
        raise AssertionError("CLI stdout differs between native and js targets")

    required_markers = [
        "moon-warc v0.5.1",
        "Sample archive size: 3188 bytes",
        "=== Records (6) ===",
        "type=warcinfo",
        "type=request",
        "type=response",
        "type=metadata",
        "type=resource",
        "type=revisit",
        "=== ISO 28500 Validation: valid=true records=6 errors=0 warnings=0 ===",
        "=== Sorted CDXJ Index (3 entries) ===",
        "lookup_exact('https://example.org:443/index.html#top') -> 2 hit(s)",
        "lookup_closest('https://example.org/index.html', '20261125121000') -> ts=20261125121500 warc_type=revisit",
        "=== Revisit Resolution (1) ===",
        "kind=ByRecordId target=<urn:uuid:00000000-0000-4000-8000-000000000003>",
        "=== Round-trip byte equality: true (3188 == 3188 bytes) ===",
        "=== ISO 28500 §9 Segmentation & Reassembly ===",
        "payload_exact=true",
        "=== Subset Filter & Export (CDX-11 / JSONL) ===",
        "CDX-11 lines=4 (1 header + 3 rows) | JSONL lines=6",
        "=== Multi-Member .warc.gz & Compressed CDXJ ===",
        "Multi-member .warc.gz: members=6",
        "=== Streaming WarcGzReader & Crawler HTTP Exchange ===",
        "scan_archive_gz streamed=6 records (6 emitted)",
        "WarcGzReader (17B chunks): records=6",
        "finish_ok=true",
        "Crawler HTTP exchange .warc.gz: records=3",
    ]
    for marker in required_markers:
        if marker not in native_out:
            raise AssertionError(f"Missing expected CLI marker: {marker!r}")

    # Cross-check Python hashlib digests against sample_archive_bytes() output markers
    sample_html = b"<!doctype html><html><body><h1>Hello WARC</h1></body></html>\n"
    sample_json = b'{"status":"ok","version":1}\n'
    expected_html_digest = py_warc_sha256(sample_html)
    expected_json_digest = py_warc_sha256(sample_json)
    if f"payload-digest={expected_html_digest}" not in native_out:
        raise AssertionError("CLI response payload-digest does not match Python SHA-256")
    if f"block-digest={expected_json_digest}" not in native_out:
        raise AssertionError("CLI resource block-digest does not match Python SHA-256")

    # Cross-check CDXJ lines emitted by CLI
    cdxj_lines = [
        line
        for line in native_out.splitlines()
        if line.startswith("org,example")
    ]
    if len(cdxj_lines) != 3:
        raise AssertionError(f"Expected 3 CDXJ lines from CLI, got {len(cdxj_lines)}")
    parsed_keys = []
    for line in cdxj_lines:
        surt_key, ts, json_part = line.split(" ", 2)
        obj = json.loads(json_part)
        if py_to_surt(obj["url"]) != surt_key:
            raise AssertionError(f"CDXJ SURT mismatch: {surt_key} vs {obj['url']}")
        parsed_keys.append((surt_key, ts, int(obj["offset"])))
    if parsed_keys != sorted(parsed_keys):
        raise AssertionError(f"CLI CDXJ entries are not sorted: {parsed_keys}")

    ex_native = run_cmd(["moon", "run", "examples/crawler_to_rag", "--target", "native"], REPO_ROOT).stdout
    ex_js = run_cmd(["moon", "run", "examples/crawler_to_rag", "--target", "js"], REPO_ROOT).stdout
    if ex_native != ex_js:
        raise AssertionError("Example crawler_to_rag stdout differs between native and js targets")
    for marker in [
        "moon-warc v0.5.1 Example:",
        "records=5 valid=true errors=0",
        "WACZ 1.1.1 datapackage bytes=",
        "cdxj_entries=2",
        '"text":"<html><body>MoonBit WARC</body></html>"',
        '"text":"<html><body>MoonBit WARC v2</body></html>"',
    ]:
        if marker not in ex_native:
            raise AssertionError(f"Missing expected example marker: {marker!r}")


def run_differential_probe() -> None:
    # 1. Construct Archive A: canonical multi-record WARC/1.1 archive with SHA-1/SHA-256,
    #    chunked HTTP with extension + NUL + trailer, binary payload containing \r\n\r\n,
    #    and two revisit records (ByRecordId + ByUriAndDigest).
    wi_body = b"software: python-oracle/1.0\r\nformat: WARC File Format 1.1\r\n"
    wi_wire = py_build_warc_record(
        [
            ("WARC-Type", "warcinfo"),
            ("WARC-Record-ID", "<urn:uuid:ora-0001>"),
            ("WARC-Date", "2026-11-25T09:00:00Z"),
            ("Content-Type", "application/warc-fields"),
            ("WARC-Filename", "oracle-a.warc"),
            ("Content-Length", str(len(wi_body))),
            ("WARC-Block-Digest", py_warc_sha256(wi_body)),
        ],
        wi_body,
    )

    req_body = b"GET /a/c?z=9&a=1 HTTP/1.1\r\nHost: docs.example.org\r\n\r\n"
    req_wire = py_build_warc_record(
        [
            ("WARC-Type", "request"),
            ("WARC-Record-ID", "<urn:uuid:ora-0002>"),
            ("WARC-Date", "2026-11-25T09:00:01Z"),
            ("WARC-Target-URI", "https://docs.example.org:443/a/./b/../c?z=9&a=1#frag"),
            ("Content-Type", "application/http; msgtype=request"),
            ("WARC-Concurrent-To", "<urn:uuid:ora-0003>"),
            ("Content-Length", str(len(req_body))),
            ("WARC-Block-Digest", py_warc_sha1(req_body)),
        ],
        req_body,
    )

    resp_chunked_body = (
        b"5\r\nHello\r\n"
        b"8;ext=42\r\n\x00\xff\r\n\r\n!!\r\n"
        b"0\r\nX-Trailer: oracle\r\n\r\n"
    )
    resp_entity = py_decode_chunked(resp_chunked_body)
    assert resp_entity == b"Hello\x00\xff\r\n\r\n!!"
    resp_http = (
        b"HTTP/1.1 200 OK\r\n"
        b"Content-Type: text/plain; charset=utf-8\r\n"
        b"Transfer-Encoding: chunked\r\n\r\n" + resp_chunked_body
    )
    resp_wire = py_build_warc_record(
        [
            ("WARC-Type", "response"),
            ("WARC-Record-ID", "<urn:uuid:ora-0003>"),
            ("WARC-Date", "2026-11-25T09:00:01Z"),
            ("WARC-Target-URI", "https://docs.example.org:443/a/./b/../c?z=9&a=1#frag"),
            ("Content-Type", "application/http; msgtype=response"),
            ("Content-Length", str(len(resp_http))),
            ("WARC-Block-Digest", py_warc_sha256(resp_http)),
            ("WARC-Payload-Digest", py_warc_sha256(resp_entity)),
        ],
        resp_http,
    )

    bin_body = b"\x00\r\n\r\n\xff\xfeWARC/1.1\r\n\r\n\x01\x02\x03"
    bin_wire = py_build_warc_record(
        [
            ("WARC-Type", "resource"),
            ("WARC-Record-ID", "<urn:uuid:ora-0004>"),
            ("WARC-Date", "2026-11-25T09:00:02Z"),
            ("WARC-Target-URI", "http://192.0.2.10:80/blob?b=2&a=1"),
            ("Content-Type", "application/octet-stream"),
            ("Content-Length", str(len(bin_body))),
            ("WARC-Block-Digest", py_warc_sha256(bin_body)),
            ("WARC-Payload-Digest", py_warc_sha256(bin_body)),
        ],
        bin_body,
    )

    rev1_wire = py_build_warc_record(
        [
            ("WARC-Type", "revisit"),
            ("WARC-Record-ID", "<urn:uuid:ora-0005>"),
            ("WARC-Date", "2026-11-25T09:05:00Z"),
            ("WARC-Target-URI", "https://docs.example.org/a/c?a=1&z=9"),
            ("WARC-Profile", "http://netpreserve.org/warc/1.1/revisit/identical-payload-digest"),
            ("WARC-Payload-Digest", py_warc_sha256(resp_entity)),
            ("WARC-Refers-To", "<urn:uuid:ora-0003>"),
            ("Content-Type", "application/http; msgtype=response"),
            ("Content-Length", "0"),
            ("WARC-Block-Digest", py_warc_sha256(b"")),
        ],
        b"",
    )

    rev2_wire = py_build_warc_record(
        [
            ("WARC-Type", "revisit"),
            ("WARC-Record-ID", "<urn:uuid:ora-0006>"),
            ("WARC-Date", "2026-11-25T09:10:00Z"),
            ("WARC-Target-URI", "https://docs.example.org:443/a/./b/../c?z=9&a=1#frag"),
            ("WARC-Profile", "http://netpreserve.org/warc/1.1/revisit/identical-payload-digest"),
            ("WARC-Payload-Digest", py_warc_sha256(resp_entity)),
            ("Content-Type", "application/http; msgtype=response"),
            ("Content-Length", "0"),
            ("WARC-Block-Digest", py_warc_sha256(b"")),
        ],
        b"",
    )

    parts_a = [wi_wire, req_wire, resp_wire, bin_wire, rev1_wire, rev2_wire]
    archive_a = b"".join(parts_a)
    archive_a_sha256 = hashlib.sha256(archive_a).hexdigest()
    expected_offsets_a: List[int] = []
    cur = 0
    for p in parts_a:
        expected_offsets_a.append(cur)
        cur += len(p)

    # Multi-member .warc.gz encoded by Python gzip (compresslevel=9 + FNAME)
    py_gz_members: List[Tuple[int, int, bytes]] = []
    py_gz_stream = bytearray()
    for idx_m, part in enumerate(parts_a):
        raw_buf = io.BytesIO()
        with gzip.GzipFile(
            filename=f"rec-{idx_m}.warc",
            mode="wb",
            fileobj=raw_buf,
            compresslevel=9,
            mtime=1700000000 + idx_m,
        ) as gzf:
            gzf.write(part)
        m_bytes = raw_buf.getvalue()
        py_gz_members.append((len(py_gz_stream), len(m_bytes), m_bytes))
        py_gz_stream.extend(m_bytes)
    py_gz_archive_a = bytes(py_gz_stream)

    # 2. Construct Archive B: folded multi-line headers + binary payload + SHA-1 chunked HTTP
    folded_payload = b"\x00\r\n\r\n\xfffolded-bin"
    archive_b_rec0 = (
        b"WARC/1.1\r\n"
        b"WARC-Type: resource\r\n"
        b"WARC-Record-ID: <urn:uuid:fold-0001>\r\n"
        b"WARC-Date: 2026-11-25T10:00:00Z\r\n"
        b"WARC-Target-URI: https://example.org/fold\r\n"
        b"X-Folded: one\r\n"
        b"  two\r\n"
        b"\tthree\r\n"
        b"Content-Type: application/octet-stream\r\n"
        + f"Content-Length: {len(folded_payload)}\r\n".encode("ascii")
        + f"WARC-Block-Digest: {py_warc_sha1(folded_payload)}\r\n\r\n".encode("ascii")
        + folded_payload
        + b"\r\n\r\n"
    )
    b_entity = b"SHA1-Chunked-Entity"
    b_http = (
        b"HTTP/1.1 200 OK\r\n"
        b"Content-Type: text/plain\r\n"
        b"Transfer-Encoding: chunked\r\n\r\n"
        b"5\r\nSHA1-\r\n"
        b"e\r\nChunked-Entity\r\n"
        b"0\r\n\r\n"
    )
    assert py_decode_chunked(b_http.split(b"\r\n\r\n", 1)[1]) == b_entity
    archive_b_rec1 = (
        b"WARC/1.1\r\n"
        b"WARC-Type: response\r\n"
        b"WARC-Record-ID: <urn:uuid:fold-0002>\r\n"
        b"WARC-Date: 2026-11-25T10:00:01Z\r\n"
        b"WARC-Target-URI: https://example.org/fold-http\r\n"
        b"X-Trace: alpha\r\n"
        b"\tbeta\r\n"
        b"Content-Type: application/http; msgtype=response\r\n"
        + f"Content-Length: {len(b_http)}\r\n".encode("ascii")
        + f"WARC-Block-Digest: {py_warc_sha1(b_http)}\r\n".encode("ascii")
        + f"WARC-Payload-Digest: {py_warc_sha1(b_entity)}\r\n\r\n".encode("ascii")
        + b_http
        + b"\r\n\r\n"
    )
    archive_b = archive_b_rec0 + archive_b_rec1

    # 3. Construct negative tampered archives
    # N1: 1-byte tamper inside chunked HTTP body while digests kept from valid archive
    tampered_http = resp_http.replace(b"Hello", b"Hxllo", 1)
    neg_tampered_both = py_build_warc_record(
        [
            ("WARC-Type", "response"),
            ("WARC-Record-ID", "<urn:uuid:neg-1>"),
            ("WARC-Date", "2026-11-25T09:00:01Z"),
            ("WARC-Target-URI", "https://example.org/neg1"),
            ("Content-Type", "application/http; msgtype=response"),
            ("Content-Length", str(len(tampered_http))),
            ("WARC-Block-Digest", py_warc_sha256(resp_http)),
            ("WARC-Payload-Digest", py_warc_sha256(resp_entity)),
        ],
        tampered_http,
    )
    # N2: Block digest recomputed for tampered HTTP, payload digest stale -> PAYLOAD_DIGEST_MISMATCH only
    neg_tampered_payload_only = py_build_warc_record(
        [
            ("WARC-Type", "response"),
            ("WARC-Record-ID", "<urn:uuid:neg-2>"),
            ("WARC-Date", "2026-11-25T09:00:01Z"),
            ("WARC-Target-URI", "https://example.org/neg2"),
            ("Content-Type", "application/http; msgtype=response"),
            ("Content-Length", str(len(tampered_http))),
            ("WARC-Block-Digest", py_warc_sha256(tampered_http)),
            ("WARC-Payload-Digest", py_warc_sha256(resp_entity)),
        ],
        tampered_http,
    )
    # N3: Tampered SHA-1 block digest
    neg_bad_sha1 = py_build_warc_record(
        [
            ("WARC-Type", "resource"),
            ("WARC-Record-ID", "<urn:uuid:neg-3>"),
            ("WARC-Date", "2026-11-25T09:00:01Z"),
            ("WARC-Target-URI", "https://example.org/neg3"),
            ("Content-Type", "text/plain"),
            ("Content-Length", "4"),
            ("WARC-Block-Digest", py_warc_sha1(b"zzzz")),
        ],
        b"aaaa",
    )
    # N4: Truncated payload
    neg_truncated = bin_wire[:-6]
    # N5: Bad trailing separator
    neg_bad_sep = bin_wire[:-4] + b"\r\nXX"
    # N6: Invalid leap-day + duplicate ID + missing WARC-Profile on revisit
    neg_semantic = py_build_warc_record(
        [
            ("WARC-Type", "resource"),
            ("WARC-Record-ID", "<urn:uuid:dup-ora>"),
            ("WARC-Date", "2025-02-29T00:00:00Z"),
            ("WARC-Target-URI", "https://example.org/dup1"),
            ("Content-Length", "2"),
        ],
        b"ok",
    ) + py_build_warc_record(
        [
            ("WARC-Type", "revisit"),
            ("WARC-Record-ID", "<urn:uuid:dup-ora>"),
            ("WARC-Date", "2026-11-25T09:00:00Z"),
            ("WARC-Target-URI", "https://example.org/dup2"),
            ("Content-Length", "0"),
        ],
        b"",
    )

    # 4. SURT test URLs
    surt_urls = [
        "https://docs.example.com:443/a/./b/../c?z=1&a=2#top",
        "http://api.example.com:8080/v1/items/",
        "http://192.0.2.10:80/status?b=2&a=1&b=1",
        "http://[::1]:8080/metrics?flag&&k=v",
        "https://example.org/search?z=1&alpha=2&a=3",
        "ftp://files.example.org:21/pub/./warc/../archive.warc",
        "https://example.org./foo",
        "https://example.org/a/b/../../..",
    ]
    expected_surts = [py_to_surt(u) for u in surt_urls]

    digest_probes = [
        b"",
        b"abc",
        b"\x00\r\n\r\n\xff\xfeWARC\x00",
        resp_entity,
    ]

    probe_dir = REPO_ROOT / PROBE_DIR_NAME
    if probe_dir.exists():
        shutil.rmtree(probe_dir)

    def cleanup_probe() -> None:
        shutil.rmtree(probe_dir, ignore_errors=True)

    atexit.register(cleanup_probe)

    try:
        probe_dir.mkdir(parents=True, exist_ok=True)
        (probe_dir / "moon.pkg").write_text(
            'import {\n'
            '  "XinOrigin/moon_warc" @warc,\n'
            '  "XinOrigin/moon_warc/codec",\n'
            '  "XinOrigin/moon_warc/cdxj",\n'
            '  "XinOrigin/moon_warc/validate",\n'
            '  "XinOrigin/moon_warc/digest",\n'
            '  "XinOrigin/moon_warc/header",\n'
            '  "XinOrigin/moon_warc/surt",\n'
            '  "XinOrigin/moon_warc/http_payload",\n'
            '  "XinOrigin/moon_warc/gzip",\n'
            '  "XinOrigin/moon_warc/pipeline",\n'
            '  "moonbitlang/core/encoding/utf8",\n'
            '}\n'
            'pkgtype(kind: "executable")\n',
            encoding="utf-8",
        )

        surt_calls = "\n".join(
            f'  match @surt.to_surt({json.dumps(u)}) {{\n'
            f'    Ok(s) => println("SURT|{i}|" + s)\n'
            f'    Err(_) => println("SURT|{i}|ERR")\n'
            f'  }}'
            for i, u in enumerate(surt_urls)
        )
        digest_calls = "\n".join(
            f'  let dp{i} = {mbt_bytes_expr(d)}\n'
            f'  println("DIG|{i}|" + @digest.format_warc_digest_sha1(dp{i}) + "|" + @digest.format_warc_digest_sha256(dp{i}))'
            for i, d in enumerate(digest_probes)
        )

        main_mbt = f'''///|
fn diag_codes(report : @validate.ValidationReport) -> String {{
  let codes : Array[String] = []
  for d in report.diagnostics {{
    codes.push(d.code)
  }}
  codes.join(",")
}}

///|
fn main {{
{digest_calls}
{surt_calls}

  let archive_a = {mbt_bytes_expr(archive_a)}
  let recs_a = match @warc.parse_archive(archive_a) {{
    Ok(r) => r
    Err(_) => {{
      println("ARCHIVE_A_PARSE_ERR")
      return
    }}
  }}
  println("ARCHIVE_A_COUNT|" + recs_a.length().to_string())
  for i in 0..<recs_a.length() {{
    let rec = recs_a[i]
    let p_hex = @digest.hex_encode(@digest.sha256(rec.payload))
    println("REC_A|" + i.to_string() + "|" + rec.offset.to_string() + "|" + rec.record_length.to_string() + "|" + p_hex)
  }}

  let reader = @codec.WarcReader::new()
  let streamed : Array[@codec.WarcRecord] = []
  let mut pos = 0
  while pos < archive_a.length() {{
    let end = if pos + 7 > archive_a.length() {{ archive_a.length() }} else {{ pos + 7 }}
    reader.feed(archive_a[pos:end])
    while true {{
      match reader.next_record() {{
        Ok(Some(r)) => streamed.push(r)
        Ok(None) => break
        Err(_) => {{
          println("STREAM7_ERR")
          return
        }}
      }}
    }}
    pos = end
  }}
  let fin_ok = reader.finish() is Ok(_)
  println("STREAM7_MATCH|" + (fin_ok && streamed == recs_a).to_string())

  let reenc_a = @warc.encode_archive(recs_a, auto_digest=false)
  println("ARCHIVE_A_REENC_SHA256|" + @digest.hex_encode(@digest.sha256(reenc_a)))

  let resp_http_parsed = match @http_payload.parse_http_response(recs_a[2].payload) {{
    Ok(r) => r
    Err(_) => {{
      println("HTTP_A_ERR")
      return
    }}
  }}
  let resp_entity_a = match @http_payload.extract_entity_body(resp_http_parsed) {{
    Ok(b) => b
    Err(_) => {{
      println("CHUNK_A_ERR")
      return
    }}
  }}
  println("ENTITY_A_SHA256|" + @digest.hex_encode(@digest.sha256(resp_entity_a)))

  let rep_a = @warc.validate_archive(recs_a)
  println("VAL_A|" + rep_a.is_valid().to_string() + "|" + rep_a.error_count.to_string() + "|" + rep_a.warning_count.to_string())

  let cdx_a = @warc.build_cdxj_index(recs_a, filename="oracle-a.warc")
  println("CDXJ_A_COUNT|" + cdx_a.length().to_string())
  for line in cdx_a.format_all().split("\\n") {{
    let line_str = line.to_owned()
    match @cdxj.parse_line(line_str) {{
      Ok(_) => println("CDXJ_A_LINE|" + line_str)
      Err(_) => println("CDXJ_A_LINE_ERR")
    }}
  }}

  let revs_a = @warc.resolve_revisits(recs_a)
  for rv in revs_a {{
    let tid = rv.target_record_id.unwrap_or("")
    println("REV_A|" + rv.revisit_index.to_string() + "|" + Debug::to_repr(rv.match_kind).to_string() + "|" + tid)
  }}

  let archive_b = {mbt_bytes_expr(archive_b)}
  let recs_b = match @warc.parse_archive(archive_b) {{
    Ok(r) => r
    Err(_) => {{
      println("ARCHIVE_B_PARSE_ERR")
      return
    }}
  }}
  let rep_b = @warc.validate_archive(recs_b)
  let x_fold0 = recs_b[0].header.get("X-Folded").unwrap_or("")
  let x_trace1 = recs_b[1].header.get("X-Trace").unwrap_or("")
  let b0_hex = @digest.hex_encode(@digest.sha256(recs_b[0].payload))
  let ver1 = @header.WarcVersion::to_wire_string(recs_b[1].header.version)
  println("ARCHIVE_B|" + rep_b.is_valid().to_string() + "|" + ver1 + "|" + x_fold0 + "|" + x_trace1 + "|" + b0_hex)

  let n1 = {mbt_bytes_expr(neg_tampered_both)}
  match @warc.parse_archive(n1) {{
    Ok(r) => {{
      let rep = @warc.validate_archive(r)
      println("NEG_1|" + rep.is_valid().to_string() + "|" + diag_codes(rep))
    }}
    Err(_) => println("NEG_1_PARSE_ERR")
  }}

  let n2 = {mbt_bytes_expr(neg_tampered_payload_only)}
  match @warc.parse_archive(n2) {{
    Ok(r) => {{
      let rep = @warc.validate_archive(r)
      println("NEG_2|" + rep.is_valid().to_string() + "|" + diag_codes(rep))
    }}
    Err(_) => println("NEG_2_PARSE_ERR")
  }}

  let n3 = {mbt_bytes_expr(neg_bad_sha1)}
  match @warc.parse_archive(n3) {{
    Ok(r) => {{
      let rep = @warc.validate_archive(r)
      println("NEG_3|" + rep.is_valid().to_string() + "|" + diag_codes(rep))
    }}
    Err(_) => println("NEG_3_PARSE_ERR")
  }}

  let n4 = {mbt_bytes_expr(neg_truncated)}
  println("NEG_4|" + (@warc.parse_archive(n4) is Err(@codec.UnexpectedEof(_))).to_string())

  let n5 = {mbt_bytes_expr(neg_bad_sep)}
  println("NEG_5|" + (@warc.parse_archive(n5) is Err(@codec.InvalidTrailingSeparator(_))).to_string())

  let n6 = {mbt_bytes_expr(neg_semantic)}
  match @warc.parse_archive(n6) {{
    Ok(r) => {{
      let rep = @warc.validate_archive(r)
      println("NEG_6|" + rep.is_valid().to_string() + "|" + diag_codes(rep))
    }}
    Err(_) => println("NEG_6_PARSE_ERR")
  }}

  match @warc.segment_record(recs_a[2], max_segment_bytes=32) {{
    Ok(segs) => {{
      let seg_wire = @warc.encode_archive(segs)
      match @warc.parse_archive(seg_wire) {{
        Ok(reparsed_segs) => {{
          let seg_rep = @warc.validate_archive(reparsed_segs)
          match @warc.reassemble_segments(reparsed_segs) {{
            Ok(rebuilt) => {{
              let re_hex = if rebuilt.length() == 1 {{
                @digest.hex_encode(@digest.sha256(rebuilt[0].payload))
              }} else {{
                "BAD_LEN"
              }}
              println("PIPE_SEG|true|" + reparsed_segs.length().to_string() + "|" + (seg_rep.is_valid() && seg_rep.error_count == 0 && seg_rep.warning_count == 0).to_string() + "|" + re_hex)
            }}
            Err(_) => println("PIPE_SEG|REASSEMBLE_ERR")
          }}
        }}
        Err(_) => println("PIPE_SEG|PARSE_ERR")
      }}
    }}
    Err(_) => println("PIPE_SEG|SEG_ERR")
  }}

  let sub_wire = @warc.extract_subset(
    recs_a,
    @pipeline.ArchiveFilter::new(status_min=200, status_max=299),
    include_warcinfo=true,
  )
  match @warc.parse_archive(sub_wire) {{
    Ok(sub_recs) => {{
      let sub_rep = @warc.validate_archive(sub_recs)
      let t0 = if sub_recs.length() > 0 {{
        match sub_recs[0].header.warc_type() {{ Some(t) => t.to_wire_string(); None => "none" }}
      }} else {{ "none" }}
      let t1 = if sub_recs.length() > 1 {{
        match sub_recs[1].header.warc_type() {{ Some(t) => t.to_wire_string(); None => "none" }}
      }} else {{ "none" }}
      println("PIPE_SUB|" + sub_recs.length().to_string() + "|" + sub_rep.is_valid().to_string() + "|" + t0 + "|" + t1)
    }}
    Err(_) => println("PIPE_SUB|PARSE_ERR")
  }}

  let cdx11 = @warc.export_cdx11(recs_a, filename="oracle-a.warc")
  for line in cdx11.split("\\n") {{
    println("PIPE_CDX11|" + line.to_owned())
  }}

  let jsonl_a = @warc.export_jsonl(recs_a)
  for line in jsonl_a.split("\\n") {{
    println("PIPE_JSONL|" + line.to_owned())
  }}

  let sample_recs = match @warc.parse_archive(@warc.sample_archive_bytes()) {{
    Ok(r) => r
    Err(_) => {{
      println("SAMPLE_ERR")
      return
    }}
  }}
  for line in @warc.export_jsonl([sample_recs[2]]).split("\\n") {{
    println("PIPE_SAMPLE_JSONL|" + line.to_owned())
  }}

  let py_gz_a = {mbt_bytes_expr(py_gz_archive_a)}
  match @warc.parse_archive_gz(py_gz_a) {{
    Ok(gz_recs) => {{
      let gz_rep = @warc.validate_archive(gz_recs)
      let mut parts = gz_recs.length().to_string() + "|" + gz_rep.is_valid().to_string()
      for r in gz_recs {{
        parts = parts + "|" + r.offset.to_string() + ":" + r.record_length.to_string() + ":" + @digest.hex_encode(@digest.sha256(r.payload))
      }}
      println("GZ_PY2MBT|" + parts)
    }}
    Err(_) => println("GZ_PY2MBT_ERR")
  }}
  let mbt_gz_wire = @warc.encode_archive_gz(recs_a, auto_digest=false)
  println("GZ_CRC|" + @gzip.crc32(py_gz_a).to_string())
  println("GZ_MBT2PY|" + @digest.hex_encode(mbt_gz_wire))

  let scan_parts : Array[String] = []
  match @warc.scan_archive_gz(py_gz_a, fn(r) {{
    scan_parts.push(r.offset.to_string() + ":" + r.record_length.to_string() + ":" + @digest.hex_encode(@digest.sha256(r.payload)))
  }}) {{
    Ok(n) => println("GZ_SCAN|" + n.to_string() + "|" + scan_parts.join("|"))
    Err(_) => println("GZ_SCAN_ERR")
  }}

  let gzr = @warc.new_gz_reader()
  let stream_parts : Array[String] = []
  let mut gpos = 0
  while gpos < py_gz_a.length() {{
    let gend = if gpos + 7 > py_gz_a.length() {{ py_gz_a.length() }} else {{ gpos + 7 }}
    gzr.feed(py_gz_a[gpos:gend])
    while true {{
      match gzr.next_record() {{
        Ok(Some(r)) => stream_parts.push(r.offset.to_string() + ":" + r.record_length.to_string() + ":" + @digest.hex_encode(@digest.sha256(r.payload)))
        Ok(None) => break
        Err(_) => {{
          println("GZ_READER_ERR")
          return
        }}
      }}
    }}
    gpos = gend
  }}
  let fin_ok = gzr.finish() is Ok(_)
  println("GZ_READER|" + fin_ok.to_string() + "|" + gzr.bytes_consumed().to_string() + "|" + stream_parts.join("|"))

  let ex_gz = @warc.record_http_exchange_gz(
    request_id="<urn:uuid:orac-ex-req>",
    response_id="<urn:uuid:orac-ex-resp>",
    metadata_id="<urn:uuid:orac-ex-meta>",
    date="2026-11-27T12:00:00Z",
    target_uri="https://crawl.example.org/test",
    request_bytes=b"GET /test HTTP/1.1\\r\\nHost: crawl.example.org\\r\\n\\r\\n",
    response_bytes=b"HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\n\\r\\noracle-ex",
    metadata_bytes=b"status: ok\\r\\n",
  )
  match @warc.parse_archive_gz(ex_gz) {{
    Ok(ex_recs) => {{
      let ex_rep = @warc.validate_archive(ex_recs)
      println("EX_GZ|" + ex_recs.length().to_string() + "|" + ex_rep.is_valid().to_string() + "|" + @digest.hex_encode(ex_gz))
    }}
    Err(_) => println("EX_GZ_ERR")
  }}

  let wacz = @warc.build_wacz_manifests(
    recs_a,
    mbt_gz_wire,
    warc_filename="oracle-a.warc.gz",
    title="Oracle WACZ",
    main_page_url="https://example.org/hello",
    main_page_date="2026-11-25T09:00:01Z",
  )
  println("WACZ_DP|" + wacz.datapackage_json)
  println("WACZ_DD|" + wacz.datapackage_digest_json)
  println("WACZ_CDX_HEX|" + @digest.hex_encode(@utf8.encode(wacz.cdxj_text)))
}}
'''
        (probe_dir / "main.mbt").write_text(main_mbt, encoding="utf-8")
        proc = run_cmd(
            ["moon", "run", PROBE_DIR_NAME, "--deny-warn", "--target", "native"],
            REPO_ROOT,
        )
        proc_js = run_cmd(
            ["moon", "run", PROBE_DIR_NAME, "--deny-warn", "--target", "js"],
            REPO_ROOT,
        )
        if proc_js.stdout != proc.stdout:
            raise AssertionError("Differential probe stdout differs between native and js targets")
    finally:
        cleanup_probe()

    if probe_dir.exists():
        raise AssertionError(f"Failed to remove temporary probe directory: {probe_dir}")

    lines = proc.stdout.splitlines()
    by_prefix: Dict[str, List[str]] = {}
    for line in lines:
        key = line.split("|", 1)[0]
        by_prefix.setdefault(key, []).append(line)

    # Verify digests
    dig_lines = by_prefix.get("DIG", [])
    if len(dig_lines) != len(digest_probes):
        raise AssertionError(f"Expected {len(digest_probes)} DIG lines, got {dig_lines}")
    for i, d in enumerate(digest_probes):
        expected_line = f"DIG|{i}|{py_warc_sha1(d)}|{py_warc_sha256(d)}"
        if dig_lines[i] != expected_line:
            raise AssertionError(f"Digest mismatch: {dig_lines[i]} != {expected_line}")

    # Verify SURTs
    surt_lines = by_prefix.get("SURT", [])
    if len(surt_lines) != len(expected_surts):
        raise AssertionError(f"Expected {len(expected_surts)} SURT lines, got {surt_lines}")
    for i, exp_surt in enumerate(expected_surts):
        expected_line = f"SURT|{i}|{exp_surt}"
        if surt_lines[i] != expected_line:
            raise AssertionError(f"SURT mismatch: {surt_lines[i]} != {expected_line}")

    # Verify Archive A
    assert by_prefix["ARCHIVE_A_COUNT"] == ["ARCHIVE_A_COUNT|6"]
    expected_payloads = [wi_body, req_body, resp_http, bin_body, b"", b""]
    rec_lines = by_prefix["REC_A"]
    assert len(rec_lines) == 6
    for i in range(6):
        exp = (
            f"REC_A|{i}|{expected_offsets_a[i]}|{len(parts_a[i])}|"
            f"{hashlib.sha256(expected_payloads[i]).hexdigest()}"
        )
        if rec_lines[i] != exp:
            raise AssertionError(f"Record A[{i}] mismatch: {rec_lines[i]} != {exp}")

    assert by_prefix["STREAM7_MATCH"] == ["STREAM7_MATCH|true"]
    assert by_prefix["ARCHIVE_A_REENC_SHA256"] == [
        f"ARCHIVE_A_REENC_SHA256|{archive_a_sha256}"
    ]
    assert by_prefix["ENTITY_A_SHA256"] == [
        f"ENTITY_A_SHA256|{hashlib.sha256(resp_entity).hexdigest()}"
    ]
    assert by_prefix["VAL_A"] == ["VAL_A|true|0|0"]

    # Verify Archive A CDXJ lines & lexical sorting
    assert by_prefix["CDXJ_A_COUNT"] == ["CDXJ_A_COUNT|4"]
    cdx_a_lines = [line.split("|", 1)[1] for line in by_prefix["CDXJ_A_LINE"]]
    assert len(cdx_a_lines) == 4
    expected_cdx_tuples = [
        (py_to_surt("http://192.0.2.10:80/blob?b=2&a=1"), "20261125090002", expected_offsets_a[3], len(parts_a[3]), "resource", py_warc_sha256(bin_body)),
        (py_to_surt("https://docs.example.org:443/a/./b/../c?z=9&a=1#frag"), "20261125090001", expected_offsets_a[2], len(parts_a[2]), "response", py_warc_sha256(resp_entity)),
        (py_to_surt("https://docs.example.org/a/c?a=1&z=9"), "20261125090500", expected_offsets_a[4], len(parts_a[4]), "revisit", py_warc_sha256(resp_entity)),
        (py_to_surt("https://docs.example.org:443/a/./b/../c?z=9&a=1#frag"), "20261125091000", expected_offsets_a[5], len(parts_a[5]), "revisit", py_warc_sha256(resp_entity)),
    ]
    expected_cdx_tuples.sort(key=lambda t: (t[0], t[1], t[2]))
    for idx, line in enumerate(cdx_a_lines):
        surt_k, ts, json_part = line.split(" ", 2)
        obj = json.loads(json_part)
        exp_surt, exp_ts, exp_off, exp_len, exp_wt, exp_dig = expected_cdx_tuples[idx]
        assert surt_k == exp_surt, f"{surt_k} != {exp_surt}"
        assert ts == exp_ts, f"{ts} != {exp_ts}"
        assert int(obj["offset"]) == exp_off
        assert int(obj["length"]) == exp_len
        assert obj["warc-type"] == exp_wt
        assert obj["digest"] == exp_dig
        assert obj["filename"] == "oracle-a.warc"

    # Verify Revisit resolutions in Archive A
    assert by_prefix["REV_A"] == [
        "REV_A|4|ByRecordId|<urn:uuid:ora-0003>",
        "REV_A|5|ByUriAndDigest|<urn:uuid:ora-0003>",
    ]

    # Verify Archive B (folded headers + binary payload + SHA-1 chunked HTTP)
    assert by_prefix["ARCHIVE_B"] == [
        f"ARCHIVE_B|true|WARC/1.1|one two three|alpha beta|{hashlib.sha256(folded_payload).hexdigest()}"
    ]

    # Verify Negative tampered archives rejected
    neg1 = by_prefix["NEG_1"][0].split("|")
    assert neg1[1] == "false"
    assert "BLOCK_DIGEST_MISMATCH" in neg1[2].split(",")
    assert "PAYLOAD_DIGEST_MISMATCH" in neg1[2].split(",")

    neg2 = by_prefix["NEG_2"][0].split("|")
    assert neg2[1] == "false"
    assert "BLOCK_DIGEST_MISMATCH" not in neg2[2].split(",")
    assert "PAYLOAD_DIGEST_MISMATCH" in neg2[2].split(",")

    neg3 = by_prefix["NEG_3"][0].split("|")
    assert neg3[1] == "false"
    assert "BLOCK_DIGEST_MISMATCH" in neg3[2].split(",")

    assert by_prefix["NEG_4"] == ["NEG_4|true"]
    assert by_prefix["NEG_5"] == ["NEG_5|true"]

    neg6 = by_prefix["NEG_6"][0].split("|")
    assert neg6[1] == "false"
    neg6_codes = neg6[2].split(",")
    assert "INVALID_WARC_DATE" in neg6_codes
    assert "DUPLICATE_RECORD_ID" in neg6_codes
    assert "MISSING_WARC_PROFILE" in neg6_codes

    # Verify v0.2.0 pipeline segmentation, reassembly, subsetting, CDX-11 & JSONL
    pipe_seg = by_prefix["PIPE_SEG"][0].split("|")
    assert pipe_seg[1] == "true", f"Segmentation failed: {pipe_seg}"
    assert int(pipe_seg[2]) >= 3
    assert pipe_seg[3] == "true"
    assert pipe_seg[4] == hashlib.sha256(resp_http).hexdigest()

    assert by_prefix["PIPE_SUB"] == ["PIPE_SUB|2|true|warcinfo|response"]

    cdx11_lines = [line.split("|", 1)[1] for line in by_prefix["PIPE_CDX11"]]
    assert cdx11_lines[0] == " CDX N b a m s k r M S V g"
    assert len(cdx11_lines) == 5
    for idx, row in enumerate(cdx11_lines[1:]):
        cols = row.split(" ")
        assert len(cols) == 11, f"Expected 11 CDX columns, got {cols}"
        exp_surt, exp_ts, _, _, _, exp_dig = expected_cdx_tuples[idx]
        assert cols[0] == exp_surt
        assert cols[1] == exp_ts
        assert cols[5] == exp_dig
        assert cols[10] == "oracle-a.warc"

    jsonl_lines = [line.split("|", 1)[1] for line in by_prefix["PIPE_JSONL"]]
    assert len(jsonl_lines) == 6
    parsed_jsonl = [json.loads(line) for line in jsonl_lines]
    assert parsed_jsonl[0]["warc_type"] == "warcinfo"
    assert parsed_jsonl[0]["text"] == wi_body.decode("utf-8")
    # Archive A's chunked response contains non-UTF-8 \xff -> gracefully omits "text"
    assert "text" not in parsed_jsonl[2]
    # Binary application/octet-stream resource omits "text"
    assert parsed_jsonl[3]["mime"] == "application/octet-stream"
    assert "text" not in parsed_jsonl[3]

    sample_jsonl = json.loads(by_prefix["PIPE_SAMPLE_JSONL"][0].split("|", 1)[1])
    assert sample_jsonl["warc_type"] == "response"
    assert sample_jsonl["status"] == 200
    assert (
        sample_jsonl["text"]
        == "<!doctype html><html><body><h1>Hello WARC</h1></body></html>\n"
    )

    # Bidirectional Python gzip <-> MoonBit .warc.gz verification
    gz_py2mbt = by_prefix["GZ_PY2MBT"][0].split("|")
    assert gz_py2mbt[1] == "6"
    assert gz_py2mbt[2] == "true"
    for idx_m, (exp_off, exp_len, _) in enumerate(py_gz_members):
        got_off, got_len, got_hex = gz_py2mbt[3 + idx_m].split(":")
        assert int(got_off) == exp_off, f"gz offset mismatch: {got_off} != {exp_off}"
        assert int(got_len) == exp_len, f"gz length mismatch: {got_len} != {exp_len}"
        assert got_hex == hashlib.sha256(parts_a[idx_m].split(b"\r\n\r\n", 1)[1][:-4]).hexdigest()

    mbt_gz_hex = by_prefix["GZ_MBT2PY"][0].split("|", 1)[1]
    mbt_gz_bytes = bytes.fromhex(mbt_gz_hex)
    assert gzip.decompress(mbt_gz_bytes) == archive_a
    assert int(by_prefix["GZ_CRC"][0].split("|", 1)[1]) == (zlib.crc32(py_gz_archive_a) & 0xFFFFFFFF)

    # Verify v0.4.0 constant-memory scan_archive_gz and 7B-chunked WarcGzReader against Python gzip -9 members
    gz_scan = by_prefix["GZ_SCAN"][0].split("|")
    assert gz_scan[1] == "6"
    assert gz_scan[2:] == gz_py2mbt[3:]

    gz_reader = by_prefix["GZ_READER"][0].split("|")
    assert gz_reader[1] == "true"
    assert int(gz_reader[2]) == len(py_gz_archive_a)
    assert gz_reader[3:] == gz_py2mbt[3:]

    ex_gz = by_prefix["EX_GZ"][0].split("|")
    assert ex_gz[1] == "3"
    assert ex_gz[2] == "true"
    ex_plain = gzip.decompress(bytes.fromhex(ex_gz[3]))
    assert b"oracle-ex" in ex_plain and b"WARC-Concurrent-To: <urn:uuid:orac-ex-resp>" in ex_plain

    # Verify v0.5.0 WACZ 1.1.1 manifests and SHA-256 digests against Python json + hashlib
    wacz_dp_raw = by_prefix["WACZ_DP"][0].split("|", 1)[1]
    wacz_dd_raw = by_prefix["WACZ_DD"][0].split("|", 1)[1]
    wacz_cdx_bytes = bytes.fromhex(by_prefix["WACZ_CDX_HEX"][0].split("|", 1)[1])
    dp = json.loads(wacz_dp_raw)
    dd = json.loads(wacz_dd_raw)
    assert dp["profile"] == "data-package" and dp["wacz_version"] == "1.1.1"
    assert dp["resources"][0]["path"] == "archive/oracle-a.warc.gz"
    assert dp["resources"][0]["bytes"] == len(mbt_gz_bytes)
    assert dp["resources"][0]["hash"] == "sha256:" + hashlib.sha256(mbt_gz_bytes).hexdigest()
    assert dp["resources"][1]["path"] == "indexes/index.cdxj"
    assert dp["resources"][1]["bytes"] == len(wacz_cdx_bytes)
    assert dp["resources"][1]["hash"] == "sha256:" + hashlib.sha256(wacz_cdx_bytes).hexdigest()
    assert dd["path"] == "datapackage.json"
    assert dd["hash"] == "sha256:" + hashlib.sha256(wacz_dp_raw.encode("utf-8")).hexdigest()


def main() -> int:
    verify_cli_outputs()
    run_differential_probe()
    print(
        "PYTHON ORACLE PASSED: CLI + examples (native+js), SHA-1/SHA-256 Base32 digests, "
        "chunked HTTP, SURT/CDXJ, revisit resolution, folded headers, binary payloads, "
        "byte-for-byte roundtrip, 6 negative archives, bidirectional Python gzip/.warc.gz (Dynamic Huffman), "
        "streaming scan_archive_gz & 7B-chunked WarcGzReader, HTTP exchange capture, "
        "WACZ 1.1.1 manifests, and v0.5.0 segmentation/subset/CDX-11/JSONL verified."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
