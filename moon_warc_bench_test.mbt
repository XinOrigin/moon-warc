///|
test "bench: parse_archive plain WARC/1.1" (b : @bench.T) {
  let wire = @moon_warc.sample_archive_bytes()
  b.bench(fn() { b.keep(@moon_warc.parse_archive(wire)) })
}

///|
test "bench: encode_archive_gz + parse_archive_gz (Dynamic Huffman)" (
  b : @bench.T,
) {
  let recs = @moon_warc.parse_archive(@moon_warc.sample_archive_bytes()).unwrap()
  b.bench(fn() {
    let gz = @moon_warc.encode_archive_gz(recs)
    b.keep(@moon_warc.parse_archive_gz(gz))
  })
}

///|
test "bench: scan_archive_gz streaming" (b : @bench.T) {
  let recs = @moon_warc.parse_archive(@moon_warc.sample_archive_bytes()).unwrap()
  let gz = @moon_warc.encode_archive_gz(recs)
  b.bench(fn() {
    let mut n = 0L
    ignore(@moon_warc.scan_archive_gz(gz, fn(_r) { n = n + 1L }))
    b.keep(n)
  })
}

///|
test "bench: sha256 FIPS 180-4 digest" (b : @bench.T) {
  let wire = @moon_warc.sample_archive_bytes()
  b.bench(fn() { b.keep(@digest.sha256(wire)) })
}

///|
test "bench: build_cdxj_index + lookup_closest" (b : @bench.T) {
  let recs = @moon_warc.parse_archive(@moon_warc.sample_archive_bytes()).unwrap()
  b.bench(fn() {
    let idx = @moon_warc.build_cdxj_index(recs, filename="bench.warc")
    b.keep(
      idx.lookup_closest("https://example.org/index.html", "20261125121000"),
    )
  })
}
