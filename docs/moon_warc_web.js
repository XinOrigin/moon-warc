(function(globalScope){
var $reinterpret_view = new DataView(new ArrayBuffer(8));
function $i64_reinterpret_f64(a) {
  $reinterpret_view.setBigUint64(0, BigInt.asUintN(64, a), false);
  return $reinterpret_view.getFloat64(0, false);
}
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError13InvalidHeader(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError13InvalidHeader.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof.prototype.$tag = 2;
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError16ChecksumMismatch(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError16ChecksumMismatch.prototype.$tag = 3;
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError12SizeMismatch(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError12SizeMismatch.prototype.$tag = 4;
function _M0DTP39XinOrigin10moon__warc4gzip9GzipError13LimitExceeded(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4gzip9GzipError13LimitExceeded.prototype.$tag = 5;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0TP39XinOrigin10moon__warc5codec12ReaderLimits(param0, param1) {
  this.max_header_bytes = param0;
  this.max_payload_bytes = param1;
}
function _M0TP39XinOrigin10moon__warc8pipeline12JsonlOptions(param0, param1) {
  this.include_body_text = param0;
  this.max_body_chars = param1;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTP39XinOrigin10moon__warc6header11HeaderError14InvalidVersion(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header11HeaderError14InvalidVersion.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc6header11HeaderError21MissingRequiredHeader(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header11HeaderError21MissingRequiredHeader.prototype.$tag = 2;
function _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate.prototype.$tag = 3;
function _M0DTP39XinOrigin10moon__warc6header11HeaderError20InvalidContentLength(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header11HeaderError20InvalidContentLength.prototype.$tag = 4;
function _M0DTP39XinOrigin10moon__warc6header11HeaderError17MissingTerminator() {}
_M0DTP39XinOrigin10moon__warc6header11HeaderError17MissingTerminator.prototype.$tag = 5;
function _M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError11HeaderError(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError11HeaderError.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError13UnexpectedEof(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError13UnexpectedEof.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError24InvalidTrailingSeparator(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError24InvalidTrailingSeparator.prototype.$tag = 2;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError20InvalidContentLength(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError20InvalidContentLength.prototype.$tag = 3;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded.prototype.$tag = 4;
function _M0DTP39XinOrigin10moon__warc5codec10CodecError9GzipError(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc5codec10CodecError9GzipError.prototype.$tag = 5;
function _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok.prototype.$tag = 1;
function _M0TPC15bytes9BytesView(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
var $bytes_literal$0 = new Uint8Array([13,10]);
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError23MissingHeaderTerminator() {}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError23MissingHeaderTerminator.prototype.$tag = 0;
var _M0DTP39XinOrigin10moon__warc13http__payload9HttpError23MissingHeaderTerminator__ = new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError23MissingHeaderTerminator();
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine.prototype.$tag = 2;
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidChunkSize(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidChunkSize.prototype.$tag = 3;
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody() {}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody.prototype.$tag = 4;
var _M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody__ = new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody();
function _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf() {}
_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf.prototype.$tag = 5;
var _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf__ = new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf();
function _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok.prototype.$tag = 1;
var $bytes_literal$1 = new Uint8Array([13,10,13,10]);
var $bytes_literal$2 = new Uint8Array([10,10]);
function _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok.prototype.$tag = 1;
var $bytes_literal$3 = new Uint8Array([60,33,100,111,99,116,121,112,101,32,104,116,109,108,62,60,104,116,109,108,62,60,98,111,100,121,62,60,104,49,62,72,101,108,108,111,32,87,65,82,67,60,47,104,49,62,60,47,98,111,100,121,62,60,47,104,116,109,108,62,10]);
var $bytes_literal$4 = new Uint8Array([72,84,84,80,47,49,46,49,32,50,48,48,32,79,75,13,10,67,111,110,116,101,110,116,45,84,121,112,101,58,32,116,101,120,116,47,104,116,109,108,59,32,99,104,97,114,115,101,116,61,117,116,102,45,56,13,10,84,114,97,110,115,102,101,114,45,69,110,99,111,100,105,110,103,58,32,99,104,117,110,107,101,100,13,10,13,10,102,13,10,60,33,100,111,99,116,121,112,101,32,104,116,109,108,62,13,10,50,101,13,10,60,104,116,109,108,62,60,98,111,100,121,62,60,104,49,62,72,101,108,108,111,32,87,65,82,67,60,47,104,49,62,60,47,98,111,100,121,62,60,47,104,116,109,108,62,10,13,10,48,13,10,13,10]);
var $bytes_literal$5 = new Uint8Array([123,34,115,116,97,116,117,115,34,58,34,111,107,34,44,34,118,101,114,115,105,111,110,34,58,49,125,10]);
function _M0DTP39XinOrigin10moon__warc6digest11DigestError16InvalidAlgorithm(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest11DigestError16InvalidAlgorithm.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidFormat(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidFormat.prototype.$tag = 2;
function _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength.prototype.$tag = 3;
function _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc4surt9SurtError8EmptyUri() {}
_M0DTP39XinOrigin10moon__warc4surt9SurtError8EmptyUri.prototype.$tag = 0;
var _M0DTP39XinOrigin10moon__warc4surt9SurtError8EmptyUri__ = new _M0DTP39XinOrigin10moon__warc4surt9SurtError8EmptyUri();
function _M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme() {}
_M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme.prototype.$tag = 1;
var _M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme__ = new _M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme();
function _M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost() {}
_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost.prototype.$tag = 2;
var _M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__ = new _M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost();
function _M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort.prototype.$tag = 3;
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok.prototype.$tag = 1;
var $bytes_literal$6 = new Uint8Array();
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok.prototype.$tag = 1;
function $oob() {
  throw new Error("Index out of bounds");
}
class $PanicError extends Error {}
function $panic(message) {
  throw new $PanicError(message);
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
var _M0FPB12random__seed = () => {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj != null && typeof cryptoObj.getRandomValues === "function") {
    try {
      const array = new Uint32Array(1);
      cryptoObj.getRandomValues(array);
      return array[0] | 0; // Convert to signed 32
    } catch (_) {
      // The host refuses Web Crypto here, e.g. Workers at module load
    }
  }
  return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
};
var _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
var _M0FPB20uint__to__string__js = (x, radix) => {
  return (x >>> 0).toString(radix);
};
var _M0FPB21int64__to__string__js = (num, radix) => BigInt.asIntN(64, num).toString(radix);
function _M0TPB4IterGUsRPC14json4JsonEE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGcE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
function $compare_int(a, b) {
  return (a >= b) - (a <= b);
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
var _M0FPB13js__index__of = (s, start, end, p) => {
  if (end - start < p.length) return -1;
  if (end === s.length) return s.indexOf(p, start);
  const i = s.substring(start, end).indexOf(p);
  return i < 0 ? i : start + i;
};
var _M0FPB13js__substring = (s, start, end) => start === 0 && end === s.length ? s : s.substring(start, end);
var _M0FPB22js__code__unit__string = (c) => String.fromCharCode(c);
var _M0FPB19js__last__index__of = (s, start, end, p) => {
  if (end - start < p.length) return -1;
  if (start === 0) return s.lastIndexOf(p, end - p.length);
  const i = s.substring(start, end).lastIndexOf(p);
  return i < 0 ? i : start + i;
};
function _M0TPB5ArrayGRPC16string10StringViewE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TPB4IterGRPC16string10StringViewE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB8MutLocalGORPC16string10StringViewE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGsE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB5ArrayGRPC15debug13ContentParensE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TPB5ArrayGsE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TPB3MapGssE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGsiE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB5EntryGssE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsiE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRPC14json4JsonE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP39XinOrigin10moon__warc5codec10WarcRecordE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB8MutLocalGORPB5EntryGsRPC14json4JsonEE(param0) {
  this.val = param0;
}
function _M0TPB12MutArrayViewGUsssEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TPB9ArrayViewGRPC16string10StringViewE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPC15float17FloatingDecimal32(param0, param1) {
  this.mantissa = param0;
  this.exponent = param1;
}
function $i32_reinterpret_f32(a) {
  $reinterpret_view.setFloat32(0, a, true);
  return $reinterpret_view.getInt32(0, true);
}
function _M0TPC16buffer6Buffer(param0, param1) {
  this.data = param0;
  this.len = param1;
}
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC14json4Json4Null() {}
_M0DTPC14json4Json4Null.prototype.$tag = 0;
function _M0DTPC14json4Json4True() {}
_M0DTPC14json4Json4True.prototype.$tag = 1;
var _M0DTPC14json4Json4True__ = new _M0DTPC14json4Json4True();
function _M0DTPC14json4Json5False() {}
_M0DTPC14json4Json5False.prototype.$tag = 2;
var _M0DTPC14json4Json5False__ = new _M0DTPC14json4Json5False();
function _M0DTPC14json4Json6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json4Json6Number.prototype.$tag = 3;
function _M0DTPC14json4Json6String(param0) {
  this._0 = param0;
}
_M0DTPC14json4Json6String.prototype.$tag = 4;
function _M0DTPC14json4Json5Array(param0) {
  this._0 = param0;
}
_M0DTPC14json4Json5Array.prototype.$tag = 5;
function _M0DTPC14json4Json6Object(param0) {
  this._0 = param0;
}
_M0DTPC14json4Json6Object.prototype.$tag = 6;
function _M0TPB5ArrayGRPC14json10WriteFrameE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0DTPC14json10WriteFrame5Array(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame5Array.prototype.$tag = 0;
function _M0DTPC14json10WriteFrame6Object(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame6Object.prototype.$tag = 1;
function _M0TPB5ArrayGRPC15debug4ReprE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0DTPC15debug4Repr7UnitLit() {}
_M0DTPC15debug4Repr7UnitLit.prototype.$tag = 0;
function _M0DTPC15debug4Repr7Integer(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Integer.prototype.$tag = 1;
function _M0DTPC15debug4Repr9DoubleLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9DoubleLit.prototype.$tag = 2;
function _M0DTPC15debug4Repr8FloatLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr8FloatLit.prototype.$tag = 3;
function _M0DTPC15debug4Repr7BoolLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7BoolLit.prototype.$tag = 4;
function _M0DTPC15debug4Repr7CharLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7CharLit.prototype.$tag = 5;
function _M0DTPC15debug4Repr9StringLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9StringLit.prototype.$tag = 6;
function _M0DTPC15debug4Repr5Tuple(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Tuple.prototype.$tag = 7;
function _M0DTPC15debug4Repr5Array(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Array.prototype.$tag = 8;
function _M0DTPC15debug4Repr6Record(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr6Record.prototype.$tag = 9;
function _M0DTPC15debug4Repr4Enum(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr4Enum.prototype.$tag = 10;
function _M0DTPC15debug4Repr3Map(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr3Map.prototype.$tag = 11;
function _M0DTPC15debug4Repr11RecordField(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr11RecordField.prototype.$tag = 12;
function _M0DTPC15debug4Repr14EnumLabeledArg(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr14EnumLabeledArg.prototype.$tag = 13;
function _M0DTPC15debug4Repr6Opaque(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr6Opaque.prototype.$tag = 14;
function _M0DTPC15debug4Repr7Literal(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Literal.prototype.$tag = 15;
function _M0DTPC15debug4Repr8MapEntry(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr8MapEntry.prototype.$tag = 16;
function _M0DTPC15debug4Repr7Omitted() {}
_M0DTPC15debug4Repr7Omitted.prototype.$tag = 17;
var _M0DTPC15debug4Repr7Omitted__ = new _M0DTPC15debug4Repr7Omitted();
function _M0TPC15debug13ContentParens(param0, param1) {
  this.size = param0;
  this.lines = param1;
}
function _M0TPC15debug7Content(param0, param1, param2) {
  this.size = param0;
  this.lines = param1;
  this.needs_parens = param2;
}
function _M0TPB5ArrayGUOsRPC15debug4ReprEE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TP39XinOrigin10moon__warc6digest10Sha1Hasher(param0, param1, param2, param3, param4, param5, param6, param7, param8) {
  this.h0 = param0;
  this.h1 = param1;
  this.h2 = param2;
  this.h3 = param3;
  this.h4 = param4;
  this.block = param5;
  this.w = param6;
  this.block_len = param7;
  this.total_bytes = param8;
}
function _M0TP39XinOrigin10moon__warc6digest12Sha256Hasher(param0, param1, param2, param3, param4) {
  this.h = param0;
  this.block = param1;
  this.w = param2;
  this.block_len = param3;
  this.total_bytes = param4;
}
function _M0DTP39XinOrigin10moon__warc6digest10WarcDigest4Sha1(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest10WarcDigest4Sha1.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc6digest10WarcDigest6Sha256(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6digest10WarcDigest6Sha256.prototype.$tag = 1;
function _M0DTP39XinOrigin10moon__warc6digest10WarcDigest5Other(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP39XinOrigin10moon__warc6digest10WarcDigest5Other.prototype.$tag = 2;
function _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok.prototype.$tag = 1;
function $bytes_equal(a, b) {
    if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function _M0TP39XinOrigin10moon__warc4gzip9BitReader(param0, param1, param2, param3) {
  this.data = param0;
  this.byte_pos = param1;
  this.bit_buf = param2;
  this.bit_cnt = param3;
}
function _M0TP39XinOrigin10moon__warc4gzip8ByteSink(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TP39XinOrigin10moon__warc4gzip12HuffmanTable(param0, param1, param2) {
  this.counts = param0;
  this.symbols = param1;
  this.fast = param2;
}
function _M0TP39XinOrigin10moon__warc4gzip11Crc32Hasher(param0) {
  this.state = param0;
}
function _M0TP39XinOrigin10moon__warc4gzip9BitWriter(param0, param1, param2) {
  this.buf = param0;
  this.bit_buf = param1;
  this.bit_cnt = param2;
}
function _M0TPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TP39XinOrigin10moon__warc4gzip10GzipMember(param0, param1, param2, param3) {
  this.compressed_offset = param0;
  this.compressed_length = param1;
  this.uncompressed = param2;
  this.crc32 = param3;
}
var _M0FPC28encoding4utf816decode__utf8__js = ((preserveBOMDecoder, dropBOMDecoder) => function(bytes, start, len, preserveBOM) {
   try {
     const end = start + len;
     const slice = bytes.subarray(start, end);
     const decoder = preserveBOM ? preserveBOMDecoder : dropBOMDecoder;
     return [decoder.decode(slice)];
   } catch (_) {
     return [];
   }
 })(
   new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }),
   new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }),
 );
var _M0FPC28encoding4utf823decode__utf8__lossy__js = ((preserveBOMDecoder, dropBOMDecoder) => function(bytes, start, len, preserveBOM) {
   const end = start + len;
   const slice = bytes.subarray(start, end);
   const decoder = preserveBOM ? preserveBOMDecoder : dropBOMDecoder;
   return decoder.decode(slice);
 })(
   new TextDecoder("utf-8", { ignoreBOM: true }),
   new TextDecoder("utf-8", { ignoreBOM: false }),
 );
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed.prototype.$tag = 0;
function _M0DTP39XinOrigin10moon__warc6header8WarcType8WarcInfo() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType8WarcInfo.prototype.$tag = 0;
var _M0DTP39XinOrigin10moon__warc6header8WarcType8WarcInfo__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType8WarcInfo();
function _M0DTP39XinOrigin10moon__warc6header8WarcType8Response() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType8Response.prototype.$tag = 1;
var _M0DTP39XinOrigin10moon__warc6header8WarcType8Response__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType8Response();
function _M0DTP39XinOrigin10moon__warc6header8WarcType8Resource() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType8Resource.prototype.$tag = 2;
var _M0DTP39XinOrigin10moon__warc6header8WarcType8Resource__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType8Resource();
function _M0DTP39XinOrigin10moon__warc6header8WarcType7Request() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType7Request.prototype.$tag = 3;
var _M0DTP39XinOrigin10moon__warc6header8WarcType7Request__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType7Request();
function _M0DTP39XinOrigin10moon__warc6header8WarcType8Metadata() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType8Metadata.prototype.$tag = 4;
var _M0DTP39XinOrigin10moon__warc6header8WarcType8Metadata__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType8Metadata();
function _M0DTP39XinOrigin10moon__warc6header8WarcType7Revisit() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType7Revisit.prototype.$tag = 5;
var _M0DTP39XinOrigin10moon__warc6header8WarcType7Revisit__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType7Revisit();
function _M0DTP39XinOrigin10moon__warc6header8WarcType10Conversion() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType10Conversion.prototype.$tag = 6;
var _M0DTP39XinOrigin10moon__warc6header8WarcType10Conversion__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType10Conversion();
function _M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation() {}
_M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation.prototype.$tag = 7;
var _M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation__ = new _M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation();
function _M0DTP39XinOrigin10moon__warc6header8WarcType9Extension(param0) {
  this._0 = param0;
}
_M0DTP39XinOrigin10moon__warc6header8WarcType9Extension.prototype.$tag = 8;
function _M0TP39XinOrigin10moon__warc6header10WarcHeader(param0, param1) {
  this.version = param0;
  this.fields = param1;
}
function _M0TPB5ArrayGUssEE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok.prototype.$tag = 1;
function _M0TP39XinOrigin10moon__warc6header8WarcDate(param0, param1, param2, param3, param4, param5, param6, param7) {
  this.year = param0;
  this.month = param1;
  this.day = param2;
  this.hour = param3;
  this.minute = param4;
  this.second = param5;
  this.fraction = param6;
  this.raw = param7;
}
function _M0TP39XinOrigin10moon__warc13http__payload12HttpResponse(param0, param1, param2, param3, param4) {
  this.version = param0;
  this.status_code = param1;
  this.reason = param2;
  this.headers = param3;
  this.body = param4;
}
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok.prototype.$tag = 1;
function _M0TP39XinOrigin10moon__warc5codec10WarcRecord(param0, param1, param2, param3) {
  this.header = param0;
  this.payload = param1;
  this.offset = param2;
  this.record_length = param3;
}
function _M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok.prototype.$tag = 1;
function _M0TPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE2Ok.prototype.$tag = 1;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok.prototype.$tag = 1;
function _M0TP39XinOrigin10moon__warc4surt9ParsedUri(param0, param1, param2, param3, param4, param5, param6) {
  this.scheme = param0;
  this.userinfo = param1;
  this.host = param2;
  this.port = param3;
  this.path = param4;
  this.query = param5;
  this.fragment = param6;
}
function _M0TPB5ArrayGUsssEE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE3Err.prototype.$tag = 0;
function _M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok.prototype.$tag = 1;
function _M0TP39XinOrigin10moon__warc4cdxj9CdxjEntry(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9) {
  this.surt = param0;
  this.timestamp = param1;
  this.url = param2;
  this.mime = param3;
  this.status = param4;
  this.digest = param5;
  this.length = param6;
  this.offset = param7;
  this.filename = param8;
  this.warc_type = param9;
}
function _M0TPB9ArrayViewGUsRPC14json4JsonEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function $compare_int64(a, b) {
  const c = BigInt.asIntN(64, a);
  const d = BigInt.asIntN(64, b);
  if (c < d) return -1;
  if (c > d) return 1;
  return 0;
}
function _M0TP39XinOrigin10moon__warc4cdxj9CdxjIndex(param0) {
  this.entries = param0;
}
function _M0TPB9ArrayViewGUssEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP39XinOrigin10moon__warc8validate10Diagnostic(param0, param1, param2, param3, param4) {
  this.severity = param0;
  this.code = param1;
  this.record_index = param2;
  this.offset = param3;
  this.message = param4;
}
function _M0TPB5ArrayGRP39XinOrigin10moon__warc8validate10DiagnosticE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TPB9ArrayViewGUsiEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUsRP39XinOrigin10moon__warc5codec10WarcRecordEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP39XinOrigin10moon__warc8validate16ValidationReport(param0, param1, param2, param3) {
  this.record_count = param0;
  this.error_count = param1;
  this.warning_count = param2;
  this.diagnostics = param3;
}
function _M0TPB5ArrayGRP39XinOrigin10moon__warc8validate15ResolvedRevisitE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
function _M0TP39XinOrigin10moon__warc8validate15ResolvedRevisit(param0, param1, param2, param3, param4, param5, param6) {
  this.revisit_index = param0;
  this.revisit_id = param1;
  this.target_uri = param2;
  this.revisit_date = param3;
  this.match_kind = param4;
  this.target_index = param5;
  this.target_record_id = param6;
}
var $bytes_literal$7 = new Uint8Array([115,111,102,116,119,97,114,101,58,32,109,111,111,110,45,119,97,114,99,47,48,46,51,46,48,13,10,102,111,114,109,97,116,58,32,87,65,82,67,32,70,105,108,101,32,70,111,114,109,97,116,32,49,46,49,13,10,99,111,110,102,111,114,109,115,84,111,58,32,104,116,116,112,115,58,47,47,105,105,112,99,46,103,105,116,104,117,98,46,105,111,47,119,97,114,99,45,115,112,101,99,105,102,105,99,97,116,105,111,110,115,47,115,112,101,99,105,102,105,99,97,116,105,111,110,115,47,119,97,114,99,45,102,111,114,109,97,116,47,119,97,114,99,45,49,46,49,47,13,10]);
var $bytes_literal$8 = new Uint8Array([71,69,84,32,47,105,110,100,101,120,46,104,116,109,108,32,72,84,84,80,47,49,46,49,13,10,72,111,115,116,58,32,101,120,97,109,112,108,101,46,111,114,103,13,10,85,115,101,114,45,65,103,101,110,116,58,32,109,111,111,110,45,119,97,114,99,47,48,46,51,46,48,13,10,65,99,99,101,112,116,58,32,116,101,120,116,47,104,116,109,108,13,10,13,10]);
var $bytes_literal$9 = new Uint8Array([102,101,116,99,104,84,105,109,101,77,115,58,32,52,50,13,10,118,105,97,58,32,104,116,116,112,115,58,47,47,101,120,97,109,112,108,101,46,111,114,103,47,13,10,104,111,112,115,70,114,111,109,83,101,101,100,58,32,76,13,10]);
function _M0TPB5ArrayGRPC14json4JsonE(param0, param1) {
  this.buf = param0;
  this.len = param1;
}
var _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow = { method_0: _M0IP016_24default__implPB4Show6outputGsE, method_1: _M0IPC16string6StringPB4Show10to__string };
var _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
var _M0FPB18double__max__value = $i64_reinterpret_f64(9218868437227405311n);
var _M0FPB18double__min__value = $i64_reinterpret_f64(18442240474082181119n);
var _M0MPB4Iter4nextN6constrS482GUsRPC14json4JsonEE = 0;
var _M0MPB4Iter4nextN6constrS483GUsRPC14json4JsonEE = 0;
var _M0MPB4Iter4nextN6constrS498GcE = 0;
var _M0MPB4Iter4nextN6constrS499GcE = 0;
var _M0MPB4Iter4IterN6constrS520GUsRPC14json4JsonEE = 0;
var _M0MPB4Iter4IterN6constrS532GcE = 0;
var _M0FPC15float25f2s__pow5__inv__split__hi = [2305843009213693952n, 1844674407370955161n, 1475739525896764129n, 1180591620717411303n, 1888946593147858085n, 1511157274518286468n, 1208925819614629174n, 1934281311383406679n, 1547425049106725343n, 1237940039285380274n, 1980704062856608439n, 1584563250285286751n, 1267650600228229401n, 2028240960365167042n, 1622592768292133633n, 1298074214633706907n, 2076918743413931051n, 1661534994731144841n, 1329227995784915872n, 2126764793255865396n, 1701411834604692317n, 1361129467683753853n, 2177807148294006166n, 1742245718635204932n, 1393796574908163946n, 2230074519853062314n, 1784059615882449851n, 1427247692705959881n, 2283596308329535809n, 1826877046663628647n, 1461501637330902918n];
var _M0FPC15float20f2s__pow5__split__hi = [1152921504606846976n, 1441151880758558720n, 1801439850948198400n, 2251799813685248000n, 1407374883553280000n, 1759218604441600000n, 2199023255552000000n, 1374389534720000000n, 1717986918400000000n, 2147483648000000000n, 1342177280000000000n, 1677721600000000000n, 2097152000000000000n, 1310720000000000000n, 1638400000000000000n, 2048000000000000000n, 1280000000000000000n, 1600000000000000000n, 2000000000000000000n, 1250000000000000000n, 1562500000000000000n, 1953125000000000000n, 1220703125000000000n, 1525878906250000000n, 1907348632812500000n, 1192092895507812500n, 1490116119384765625n, 1862645149230957031n, 1164153218269348144n, 1455191522836685180n, 1818989403545856475n, 2273736754432320594n, 1421085471520200371n, 1776356839400250464n, 2220446049250313080n, 1387778780781445675n, 1734723475976807094n, 2168404344971008868n, 1355252715606880542n, 1694065894508600678n, 2117582368135750847n, 1323488980084844279n, 1654361225106055349n, 2067951531382569187n, 1292469707114105741n, 1615587133892632177n, 2019483917365790221n, 1262177448353618888n];
var _M0FP39XinOrigin10moon__warc6digest16base32__alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
var _M0FP39XinOrigin10moon__warc6digest9sha256__k = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
var _M0FP39XinOrigin10moon__warc6digest13hex__alphabet = "0123456789abcdef";
var _M0FP39XinOrigin10moon__warc4gzip9len__base = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
var _M0FP39XinOrigin10moon__warc4gzip10len__extra = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
var _M0FP39XinOrigin10moon__warc4gzip10dist__base = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
var _M0FP39XinOrigin10moon__warc4gzip11dist__extra = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
var _M0FP39XinOrigin10moon__warc4gzip14codelen__order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2984 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("invalid Huffman code length");
var _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2985 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2984);
var _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2986 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("oversubscribed Huffman code tree");
var _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2987 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2986);
var _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__atN6constrS3230 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("unexpected EOF reading RFC 1952 u16 header field");
var _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__atN6constrS3231 = new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip17read__u16__le__atN6constrS3230);
var _M0MP39XinOrigin10moon__warc5codec12ReaderLimits7defaultN6recordS4124 = new _M0TP39XinOrigin10moon__warc5codec12ReaderLimits(65536, 67108864);
var _M0MP39XinOrigin10moon__warc8pipeline12JsonlOptions7defaultN6recordS4664 = new _M0TP39XinOrigin10moon__warc8pipeline12JsonlOptions(true, 4096);
var _M0MPC16string6String4trimN6recordS1123 = new _M0TPC16string10StringView("\t\n\r ", 0, 4);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6recordS3684 = new _M0TPC16string10StringView("Content-Length", 0, 14);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6constrS3685 = new _M0DTP39XinOrigin10moon__warc6header11HeaderError21MissingRequiredHeader("Content-Length");
var _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6constrS3686 = new _M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(_M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6constrS3685);
var _M0MPC16string10StringView4trimN6recordS1101 = new _M0TPC16string10StringView("\t\n\r ", 0, 4);
var _M0MP39XinOrigin10moon__warc6header11WarcVersion5parseN6constrS3560 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(0);
var _M0MP39XinOrigin10moon__warc6header11WarcVersion5parseN6constrS3561 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(1);
var _M0MPC16string10StringView4findN6constrS712 = 0;
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3584 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3585 = new _M0TPC16string10StringView("\r", 0, 1);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3586 = new _M0DTP39XinOrigin10moon__warc6header11HeaderError14InvalidVersion("empty WARC header");
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3587 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(_M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3586);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3588 = new _M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine("empty line inside WARC header block");
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3589 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(_M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3588);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3590 = new _M0TPC16string10StringView(":", 0, 1);
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4139 = new _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded("WARC payload exceeds single-record buffer capacity (2 GiB)");
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4140 = new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4139);
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4141 = new _M0DTP39XinOrigin10moon__warc5codec10CodecError13UnexpectedEof("missing trailing \\r\\n\\r\\n record separator at EOF");
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4142 = new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4141);
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4143 = new _M0DTP39XinOrigin10moon__warc5codec10CodecError20InvalidContentLength("WARC record length exceeds Int64 range");
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4144 = new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4143);
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4145 = new _M0DTP39XinOrigin10moon__warc5codec10CodecError20InvalidContentLength("WARC stream byte offset exceeds Int64 range");
var _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4146 = new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4145);
var _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse11is__chunkedN6recordS3916 = new _M0TPC16string10StringView(",", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload16parse__hex__sizeN6recordS3930 = new _M0TPC16string10StringView(";", 0, 1);
var _M0FPB11find__indexN6constrS1792 = 0;
var _M0FPB11find__indexN6constrS1793 = 0;
var _M0FP39XinOrigin10moon__warc13http__payload15decode__chunkedN6recordS3943 = new _M0TPC15bytes9BytesView($bytes_literal$0, 0, 2);
var _M0FP39XinOrigin10moon__warc13http__payload15decode__chunkedN6recordS3944 = new _M0TPC15bytes9BytesView($bytes_literal$0, 0, 2);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3572 = new _M0TPC16string10StringView("warcinfo", 0, 8);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3573 = new _M0TPC16string10StringView("response", 0, 8);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3574 = new _M0TPC16string10StringView("resource", 0, 8);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3575 = new _M0TPC16string10StringView("request", 0, 7);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3576 = new _M0TPC16string10StringView("metadata", 0, 8);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3577 = new _M0TPC16string10StringView("revisit", 0, 7);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3578 = new _M0TPC16string10StringView("conversion", 0, 10);
var _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3579 = new _M0TPC16string10StringView("continuation", 0, 12);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__typeN6recordS3675 = new _M0TPC16string10StringView("WARC-Type", 0, 9);
var _M0MPC16string10StringView11trim__startN6recordS1116 = new _M0TPC16string10StringView("\t\n\r ", 0, 4);
var _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6constrS3812 = new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine("empty line inside HTTP header block");
var _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6constrS3813 = new _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6constrS3812);
var _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3814 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3815 = new _M0TPC16string10StringView("\t", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3816 = new _M0TPC16string10StringView(":", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload20split__header__linesN6recordS3836 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload20split__header__linesN6recordS3837 = new _M0TPC16string10StringView("\r", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload19find__header__splitN6recordS3795 = new _M0TPC15bytes9BytesView($bytes_literal$1, 0, 4);
var _M0FP39XinOrigin10moon__warc13http__payload19find__header__splitN6recordS3796 = new _M0TPC15bytes9BytesView($bytes_literal$2, 0, 2);
var _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6constrS3858 = new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine("empty response start line");
var _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6constrS3859 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6constrS3858);
var _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3860 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3861 = new _M0TPC16string10StringView("HTTP/", 0, 5);
var _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3862 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4075 = new _M0TPC16string10StringView("WARC-Segment-Number", 0, 19);
var _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4076 = new _M0TPC16string10StringView("WARC-Segment-Number", 0, 19);
var _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4077 = new _M0TPC16string10StringView("WARC-Payload-Digest", 0, 19);
var _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4078 = new _M0TPC15bytes9BytesView($bytes_literal$1, 0, 4);
var _M0FP39XinOrigin10moon__warc5codec22build__request_2einnerN5tupleS4015 = { _0: "WARC-Type", _1: "request" };
var _M0FP39XinOrigin10moon__warc5codec22build__request_2einnerN5tupleS4016 = { _0: "Content-Type", _1: "application/http; msgtype=request" };
var _M0FP39XinOrigin10moon__warc5codec23build__metadata_2einnerN5tupleS4045 = { _0: "WARC-Type", _1: "metadata" };
var _M0FP39XinOrigin10moon__warc5codec23build__metadata_2einnerN5tupleS4046 = { _0: "Content-Type", _1: "application/warc-fields" };
var _M0FP39XinOrigin10moon__warc5codec22build__revisit_2einnerN5tupleS4056 = { _0: "WARC-Type", _1: "revisit" };
var _M0FP39XinOrigin10moon__warc5codec22build__revisit_2einnerN5tupleS4057 = { _0: "Content-Type", _1: "application/http; msgtype=response" };
var _M0FP39XinOrigin10moon__warc5codec23build__response_2einnerN5tupleS4026 = { _0: "WARC-Type", _1: "response" };
var _M0FP39XinOrigin10moon__warc5codec23build__response_2einnerN5tupleS4027 = { _0: "Content-Type", _1: "application/http; msgtype=response" };
var _M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einnerN5tupleS4005 = { _0: "WARC-Type", _1: "warcinfo" };
var _M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einnerN5tupleS4006 = { _0: "Content-Type", _1: "application/warc-fields" };
var _M0FP39XinOrigin10moon__warc5codec23build__resource_2einnerN5tupleS4037 = { _0: "WARC-Type", _1: "resource" };
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5036 = "sample-crawl-2026.warc";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5037 = "<urn:uuid:00000000-0000-4000-8000-000000000003>";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5038 = "<urn:uuid:00000000-0000-4000-8000-000000000002>";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5039 = "<urn:uuid:00000000-0000-4000-8000-000000000003>";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5040 = "<urn:uuid:00000000-0000-4000-8000-000000000003>";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5041 = "https://example.org/index.html";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5042 = "2026-11-25T12:00:01Z";
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN12html__entityS5043 = $bytes_literal$3;
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN13resp__payloadS5044 = $bytes_literal$4;
var _M0FP29XinOrigin10moon__warc22sample__archive__bytesN17resource__payloadS5045 = $bytes_literal$5;
var _M0FP39XinOrigin10moon__warc4gzip20encode__length__codeN5tupleS3297 = { _0: 285, _1: 0, _2: 0 };
var _M0FP39XinOrigin10moon__warc4gzip12crc32__table = _M0FP39XinOrigin10moon__warc4gzip18make__crc32__table();
var _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uriN6recordS3694 = new _M0TPC16string10StringView("WARC-Target-URI", 0, 15);
var _M0FPB4seed = _M0FPB12random__seed();
var _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digestN6recordS3700 = new _M0TPC16string10StringView("WARC-Payload-Digest", 0, 19);
var _M0FP39XinOrigin10moon__warc6digest11hex__decodeN6constrS2822 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("hex string must have even length");
var _M0FP39XinOrigin10moon__warc6digest11hex__decodeN6constrS2823 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest11hex__decodeN6constrS2822);
var _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__atN6constrS3235 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("unexpected EOF reading RFC 1952 u32 trailer");
var _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__atN6constrS3236 = new _M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip17read__u32__le__atN6constrS3235);
var _M0FP39XinOrigin10moon__warc4gzip13fixed__tables = _M0FP39XinOrigin10moon__warc4gzip20build__fixed__tables();
var _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2971 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("truncated DEFLATE stored block");
var _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2972 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2971);
var _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2973 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13LimitExceeded("decompressed stream exceeds max_output_bytes limit");
var _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2974 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2973);
var _M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bitsN6constrS2911 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("unexpected EOF inside DEFLATE bitstream");
var _M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bitsN6constrS2912 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bitsN6constrS2911);
var _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bitsN6constrS2920 = new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(0);
var _M0FP39XinOrigin10moon__warc4gzip15decode__huffmanN6constrS3017 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("invalid Huffman code in DEFLATE stream");
var _M0FP39XinOrigin10moon__warc4gzip15decode__huffmanN6constrS3018 = new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip15decode__huffmanN6constrS3017);
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3057 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("invalid dynamic Huffman symbol counts");
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3058 = new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3057);
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3059 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("code length repeat 16 at index 0");
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3060 = new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3059);
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3061 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("dynamic Huffman code lengths overflow table");
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3062 = new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3061);
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3063 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("missing end-of-block symbol 256");
var _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3064 = new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3063);
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3141 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13LimitExceeded("decompressed stream exceeds max_output_bytes limit");
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3142 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3141);
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3143 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("DEFLATE match distance exceeds output history");
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3144 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3143);
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3145 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13LimitExceeded("decompressed stream exceeds max_output_bytes limit");
var _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3146 = new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3145);
var _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3178 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("stored block LEN/NLEN mismatch");
var _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3179 = new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3178);
var _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3180 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream("reserved DEFLATE block type 3");
var _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3181 = new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3180);
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3362 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("truncated RFC 1952 Gzip header");
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3363 = new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3362);
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3364 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13InvalidHeader("reserved gzip header flags set");
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3365 = new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3364);
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3366 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("truncated gzip FEXTRA header field");
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3367 = new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3366);
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3368 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError16ChecksumMismatch("gzip header FHCRC16 mismatch");
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3369 = new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3368);
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3370 = new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof("unexpected EOF reading RFC 1952 trailer");
var _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3371 = new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3370);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digestN6recordS3698 = new _M0TPC16string10StringView("WARC-Block-Digest", 0, 17);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__idN6recordS3680 = new _M0TPC16string10StringView("WARC-Record-ID", 0, 14);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__dateN6recordS3682 = new _M0TPC16string10StringView("WARC-Date", 0, 9);
var _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mimeN6recordS3903 = new _M0TPC16string10StringView("content-type", 0, 12);
var _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mimeN6recordS3904 = new _M0TPC16string10StringView(";", 0, 1);
var _M0FP39XinOrigin10moon__warc4cdxj19strip__mime__paramsN6recordS4447 = new _M0TPC16string10StringView(";", 0, 1);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__typeN6recordS3696 = new _M0TPC16string10StringView("Content-Type", 0, 12);
var _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4379 = new _M0TPC16string10StringView("&", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4380 = new _M0TPC16string10StringView("=", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4381 = new _M0TPC16string10StringView("&", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt11parse__portN6constrS4246 = new _M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort("empty port");
var _M0FP39XinOrigin10moon__warc4surt11parse__portN6constrS4247 = new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0FP39XinOrigin10moon__warc4surt11parse__portN6constrS4246);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4263 = new _M0TPC16string10StringView("://", 0, 3);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4264 = new _M0TPC16string10StringView("?", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4265 = new _M0TPC16string10StringView("#", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4266 = new _M0TPC16string10StringView("]", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4267 = new _M0TPC16string10StringView(":", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4268 = new _M0TPC16string10StringView("@", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt8is__ipv4N6recordS4331 = new _M0TPC16string10StringView(".", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4366 = new _M0TPC16string10StringView(".", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4367 = new _M0TPC16string10StringView("[", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4368 = new _M0TPC16string10StringView(".", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4369 = new _M0TPC16string10StringView(",", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4347 = new _M0TPC16string10StringView("/", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4348 = new _M0TPC16string10StringView("/", 0, 1);
var _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4349 = new _M0TPC16string10StringView("/.", 0, 2);
var _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4350 = new _M0TPC16string10StringView("/..", 0, 3);
var _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einnerN6constrS4491 = "warc/revisit";
var _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einnerN6constrS4492 = "warc/revisit";
var _M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrappedN6recordS4824 = new _M0TPC16string10StringView("<", 0, 1);
var _M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrappedN6recordS4825 = new _M0TPC16string10StringView(">", 0, 1);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader19segment__origin__idN6recordS3713 = new _M0TPC16string10StringView("WARC-Segment-Origin-ID", 0, 22);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__numberN6recordS3708 = new _M0TPC16string10StringView("WARC-Segment-Number", 0, 19);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader7profileN6recordS3706 = new _M0TPC16string10StringView("WARC-Profile", 0, 12);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader14concurrent__toN6recordS3704 = new _M0TPC16string10StringView("WARC-Concurrent-To", 0, 18);
var _M0MP39XinOrigin10moon__warc6header10WarcHeader10refers__toN6recordS3702 = new _M0TPC16string10StringView("WARC-Refers-To", 0, 14);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2792 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("padded Base32 length must be a multiple of 8");
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2793 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2792);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2794 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("too many Base32 padding characters");
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2795 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2794);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2796 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("Base32 input cannot consist only of padding");
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2797 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2796);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2798 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok($bytes_literal$6);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2799 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("invalid Base32 non-padding character count");
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2800 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2799);
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2801 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding("non-zero Base32 trailing padding bits");
var _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2802 = new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2801);
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6recordS2838 = new _M0TPC16string10StringView(":", 0, 1);
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2839 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidFormat("digest algorithm and value must be non-empty");
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2840 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2839);
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2841 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength("decoded sha1 digest must be 20 bytes");
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2842 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2841);
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2843 = new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength("decoded sha256 digest must be 32 bytes");
var _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2844 = new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2843);
var _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6recordS4834 = new _M0TPC16string10StringView("WARC-Segment-Number", 0, 19);
var _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4835 = 1;
var _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4836 = 1;
var _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4837 = 1;
var _M0FP39XinOrigin10moon__warc8pipeline19strip__mime__paramsN6recordS4632 = new _M0TPC16string10StringView(";", 0, 1);
var _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4744 = new _M0TPC16string10StringView("text/", 0, 5);
var _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4745 = new _M0TPC16string10StringView("+json", 0, 5);
var _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4746 = new _M0TPC16string10StringView("+xml", 0, 4);
var _M0FP39XinOrigin10moon__warc8pipeline21export__jsonl_2einnerN6recordS4783 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex15lookup__closestN9max__diffS4611 = 9223372036854775807n;
var _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse8locationN6recordS3914 = new _M0TPC16string10StringView("location", 0, 8);
var _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einnerN6recordS4675 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einnerN6recordS4676 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex11format__allN6recordS4574 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0FPC15debug14print__contentN6recordS2557 = new _M0TPC16string10StringView("\n", 0, 1);
var _M0FPC15debug15compact__middleN6recordS2439 = new _M0TPC16string10StringView("", 0, 0);
var _M0FPC15debug15compact__middleN6recordS2440 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FPC15debug15compact__middleN6recordS2441 = new _M0TPC16string10StringView(",", 0, 1);
var _M0FPC15debug14compact__linesN6recordS2450 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FPC15debug14compact__linesN6recordS2451 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0FPC15debug14compact__linesN6recordS2452 = new _M0TPC16string10StringView("", 0, 0);
var _M0FPC15debug14compact__linesN6recordS2453 = new _M0TPC16string10StringView("(", 0, 1);
var _M0FPC15debug14compact__linesN6recordS2454 = new _M0TPC16string10StringView(" ", 0, 1);
var _M0IPC15float5FloatPB4Show10to__stringN6constrS2215 = 1;
var _M0FPC15debug19bracket__seq__linesN6recordS2502 = new _M0TPC16string10StringView("", 0, 0);
var _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5094 = new _M0TPC16string10StringView("http://", 0, 7);
var _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5095 = new _M0TPC16string10StringView("https://", 0, 8);
var _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5096 = new _M0TPC16string10StringView("ftp://", 0, 6);
function _M0MPC16string10StringView12unsafe__view(self, start, end) {
  return new _M0TPC16string10StringView(self.str, self.start + start | 0, self.start + end | 0);
}
function _M0FPB13consume4__acc(acc, input) {
  const _p = (acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
  return Math.imul(_p << 17 | (_p >>> 15 | 0), 668265263) | 0;
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGRPC16string10StringViewEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    let _tmp$2 = len > 0;
    while (true) {
      const i = _tmp;
      const _more = _tmp$2;
      if (_more) {
        const _tmp$3 = dst_offset + i | 0;
        const _tmp$4 = src_offset + i | 0;
        if (_tmp$3 >>> 0 < dst.length) {
          dst[_tmp$3] = _tmp$4 >>> 0 < src.length ? src[_tmp$4] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        _tmp$2 = i > 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    let _tmp$2 = len > 0;
    while (true) {
      const i = _tmp;
      const _more = _tmp$2;
      if (_more) {
        const _tmp$3 = dst_offset + i | 0;
        const _tmp$4 = src_offset + i | 0;
        if (_tmp$3 >>> 0 < dst.length) {
          dst[_tmp$3] = _tmp$4 >>> 0 < src.length ? src[_tmp$4] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        _tmp$2 = i > 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGjE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    let _tmp$2 = len > 0;
    while (true) {
      const i = _tmp;
      const _more = _tmp$2;
      if (_more) {
        const _tmp$3 = dst_offset + i | 0;
        const _tmp$4 = src_offset + i | 0;
        if (_tmp$3 >>> 0 < dst.length) {
          dst[_tmp$3] = _tmp$4 >>> 0 < src.length ? src[_tmp$4] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        _tmp$2 = i > 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    let _tmp$2 = len > 0;
    while (true) {
      const i = _tmp;
      const _more = _tmp$2;
      if (_more) {
        const _tmp$3 = dst_offset + i | 0;
        const _tmp$4 = src_offset + i | 0;
        if (_tmp$3 >>> 0 < dst.length) {
          dst[_tmp$3] = _tmp$4 >>> 0 < src.length ? src[_tmp$4] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        _tmp$2 = i > 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPB18UninitializedArray12unsafe__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGRPC16string10StringViewEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray23unsafe__make__and__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(src, allocate_len, src_offset, dst_offset, blit_len) {
  const dst = new Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(src, allocate_len, src_offset, dst_offset, blit_len) {
  const dst = new Uint8Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(self, obj) {
  const _p = { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger };
  _p.method_table.method_2(_p.self, obj);
}
function _M0MPB13StringBuilder13write__objectGcE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGcE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGdE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGdE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB18UninitializedArray23make__and__blit_2einnerGRP39XinOrigin10moon__warc8validate10DiagnosticE(src, allocate_len, len, src_offset, dst_offset) {
  let _tmp;
  if (allocate_len >= 0) {
    let _tmp$2;
    if (len >= 0) {
      let _tmp$3;
      const _p = src.length;
      if (src_offset >= 0 && src_offset <= (_p - len | 0)) {
        _tmp$3 = dst_offset >= 0 && dst_offset <= (allocate_len - len | 0);
      } else {
        _tmp$3 = false;
      }
      _tmp$2 = _tmp$3;
    } else {
      _tmp$2 = false;
    }
    _tmp = _tmp$2;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    return _M0MPB18UninitializedArray23unsafe__make__and__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(src, allocate_len, src_offset, dst_offset, len);
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
    const _p = "bounds check failed: allocate_len = ";
    _string_builder.val = `${_string_builder.val}${_p}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, allocate_len);
    const _p$2 = ", src_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$2}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src_offset);
    const _p$3 = ", dst_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$3}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, dst_offset);
    const _p$4 = ", len = ";
    _string_builder.val = `${_string_builder.val}${_p$4}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, len);
    const _p$5 = ", src.length = ";
    _string_builder.val = `${_string_builder.val}${_p$5}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src.length);
    return $panic(_string_builder.val);
  }
}
function _M0MPB13StringBuilder21StringBuilder_2einner(capacity) {
  return capacity >= 0 ? new _M0TPB13StringBuilder("") : $panic("capacity must be non-negative");
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (c1 >= 55296 && c1 <= 56319) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return c1;
  }
}
function _M0MPC14byte4Byte7to__hexN14to__hex__digitS408(i) {
  if (i < 10) {
    const _p = (i + 48 | 0) & 255;
    return _p;
  } else {
    const _p = (i + 97 | 0) & 255;
    const _p$2 = (_p - 10 | 0) & 255;
    return _p$2;
  }
}
function _M0MPC14byte4Byte7to__hex(b) {
  const _self = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS408((b / 16 | 0) & 255));
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS408((b % 16 | 0) & 255));
  const _p = _self;
  return _p.val;
}
function _M0MPC16string10StringView21clamped__view_2einner(self, start, end) {
  const len = self.end - self.start | 0;
  const str = self.str;
  const base = self.start;
  let lo;
  if (start <= 0) {
    lo = 0;
  } else {
    if (start >= len) {
      lo = len;
    } else {
      let _tmp;
      const _p = str.charCodeAt(base + start | 0);
      if (_p >= 56320 && _p <= 57343) {
        const _p$2 = str.charCodeAt((base + start | 0) - 1 | 0);
        _tmp = _p$2 >= 55296 && _p$2 <= 56319;
      } else {
        _tmp = false;
      }
      if (_tmp) {
        lo = start + 1 | 0;
      } else {
        lo = start;
      }
    }
  }
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _e = _Some;
    if (_e <= 0) {
      hi = 0;
    } else {
      if (_e >= len) {
        hi = len;
      } else {
        let _tmp;
        const _p = str.charCodeAt(base + _e | 0);
        if (_p >= 56320 && _p <= 57343) {
          const _p$2 = str.charCodeAt((base + _e | 0) - 1 | 0);
          _tmp = _p$2 >= 55296 && _p$2 <= 56319;
        } else {
          _tmp = false;
        }
        if (_tmp) {
          hi = _e - 1 | 0;
        } else {
          hi = _e;
        }
      }
    }
  }
  return lo >= hi ? new _M0TPC16string10StringView(str, base + lo | 0, base + lo | 0) : new _M0TPC16string10StringView(str, base + lo | 0, base + hi | 0);
}
function _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i) {
  const self = _env._1;
  const logger = _env._0;
  if (i > seg) {
    logger.method_table.method_2(logger.self, _M0MPC16string10StringView21clamped__view_2einner(self, seg, i));
    return;
  } else {
    return;
  }
}
function _M0MPC16string10StringView18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
  }
  const len = self.end - self.start | 0;
  const _env = { _0: logger, _1: self };
  let _tmp = 0;
  let _tmp$2 = 0;
  _L: while (true) {
    const i = _tmp;
    const seg = _tmp$2;
    if (i >= len) {
      _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
      break;
    }
    const code = self.str.charCodeAt(self.start + i | 0);
    let c;
    _L$2: {
      switch (code) {
        case 34: {
          c = code;
          break _L$2;
        }
        case 92: {
          c = code;
          break _L$2;
        }
        case 10: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\n");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 13: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\r");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 8: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\b");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 9: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\t");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        default: {
          if (code < 32) {
            _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
            logger.method_table.method_0(logger.self, "\\u{");
            logger.method_table.method_4(logger.self, { self: _M0MPC14byte4Byte7to__hex(code & 255), method_table: _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
            logger.method_table.method_0(logger.self, "}");
            _tmp = i + 1 | 0;
            _tmp$2 = i + 1 | 0;
            continue _L;
          } else {
            _tmp = i + 1 | 0;
            continue _L;
          }
        }
      }
    }
    _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS422(_env, seg, i);
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, c);
    _tmp = i + 1 | 0;
    _tmp$2 = i + 1 | 0;
    continue;
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
    return;
  } else {
    return;
  }
}
function _M0MPC16string6String14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  _M0MPC16string10StringView18escape__to_2einner(new _M0TPC16string10StringView(self, 0, self.length), { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return buf.val;
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGOiE(x, y) {
  return !_M0IPC16option6OptionPB2Eq5equalGiE(x, y);
}
function _M0FPB14avalanche__acc(acc) {
  let acc$2 = acc;
  acc$2 = acc$2 ^ (acc$2 >>> 15 | 0);
  acc$2 = Math.imul(acc$2, -2048144777) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 13 | 0);
  acc$2 = Math.imul(acc$2, -1028477379) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 16 | 0);
  return acc$2;
}
function _M0FPB13finalize__acc(acc) {
  return _M0FPB14avalanche__acc(acc);
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String21clamped__view_2einner(self, start, end) {
  const len = self.length;
  let lo;
  if (start <= 0) {
    lo = 0;
  } else {
    if (start >= len) {
      lo = len;
    } else {
      let _tmp;
      const _p = self.charCodeAt(start);
      if (_p >= 56320 && _p <= 57343) {
        const _p$2 = self.charCodeAt(start - 1 | 0);
        _tmp = _p$2 >= 55296 && _p$2 <= 56319;
      } else {
        _tmp = false;
      }
      if (_tmp) {
        lo = start + 1 | 0;
      } else {
        lo = start;
      }
    }
  }
  let hi;
  if (end === undefined) {
    hi = len;
  } else {
    const _Some = end;
    const _e = _Some;
    if (_e <= 0) {
      hi = 0;
    } else {
      if (_e >= len) {
        hi = len;
      } else {
        let _tmp;
        const _p = self.charCodeAt(_e);
        if (_p >= 56320 && _p <= 57343) {
          const _p$2 = self.charCodeAt(_e - 1 | 0);
          _tmp = _p$2 >= 55296 && _p$2 <= 56319;
        } else {
          _tmp = false;
        }
        if (_tmp) {
          hi = _e - 1 | 0;
        } else {
          hi = _e;
        }
      }
    }
  }
  return lo >= hi ? new _M0TPC16string10StringView(self, lo, lo) : new _M0TPC16string10StringView(self, lo, hi);
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String21clamped__view_2einner(value, start, start + len | 0));
}
function _M0IP016_24default__implPB4Show6outputGcE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC14char4CharPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGiE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC13int3IntPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, self);
}
function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  _M0IPC15debug4ReprPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return logger.val;
}
function _M0MPB4Iter4nextGUsRPC14json4JsonEE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS483GUsRPC14json4JsonEE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS482GUsRPC14json4JsonEE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS499GcE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS498GcE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC14uint4UInt18to__string_2einner(self, radix) {
  return _M0FPB20uint__to__string__js(self, radix);
}
function _M0MPC15int645Int6418to__string_2einner(self, radix) {
  return _M0FPB21int64__to__string__js(self, radix);
}
function _M0MPB4Iter4IterGUsRPC14json4JsonEE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter4IterN6constrS520GUsRPC14json4JsonEE;
  }
  return new _M0TPB4IterGUsRPC14json4JsonEE(f, size_hint$2);
}
function _M0MPB4Iter4IterGcE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter4IterN6constrS532GcE;
  }
  return new _M0TPB4IterGcE(f, size_hint$2);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0MPC16string10StringView4iter(self) {
  const start = self.start;
  const end = self.end;
  const index = new _M0TPB8MutLocalGiE(start);
  return _M0MPB4Iter4IterGcE(() => {
    if (index.val < end) {
      const c1 = self.str.charCodeAt(index.val);
      if (c1 >= 55296 && c1 <= 56319 && (index.val + 1 | 0) < self.end) {
        const c2 = self.str.charCodeAt(index.val + 1 | 0);
        if (c2 >= 56320 && c2 <= 57343) {
          index.val = index.val + 2 | 0;
          return _M0FPB32code__point__of__surrogate__pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return c1;
    } else {
      return -1;
    }
  }, undefined);
}
function _M0MPC16string6String20unsafe__range__equal(self, start, other, other_start, len) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if (self.charCodeAt(start + i | 0) === other.charCodeAt(other_start + i | 0)) {
      } else {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    return _M0MPC16string6String20unsafe__range__equal(self.str, self.start, other.str, other.start, len);
  } else {
    return false;
  }
}
function _M0MPC16string10StringView16lexical__compare(self, other) {
  const self_len = self.end - self.start | 0;
  const other_len = other.end - other.start | 0;
  const min_len = self_len < other_len ? self_len : other_len;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < min_len) {
      const x = self.str.charCodeAt(self.start + i | 0);
      const y = other.str.charCodeAt(other.start + i | 0);
      if (x !== y) {
        return x < y ? -1 : 1;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return $compare_int(self_len, other_len);
}
function _M0MPC16string6String19exact__view_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      const _p = self.charCodeAt(start);
      if (!(_p >= 56320 && _p <= 57343)) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      const _p = self.charCodeAt(end$2);
      if (!(_p >= 56320 && _p <= 57343)) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (c >= 56320 && c <= 57343) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (c >= 55296 && c <= 56319) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return $panic("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start, end) {
  let end$2;
  if (end === undefined) {
    end$2 = self.length;
  } else {
    const _Some = end;
    end$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start, end$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start, end$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0FPB19kmp__failure__table(pattern) {
  const m = pattern.end - pattern.start | 0;
  const table = $make_array_len_and_init(m, 0);
  let k = 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < m) {
      const c = pattern.str.charCodeAt(pattern.start + i | 0);
      while (true) {
        if (k > 0 && c !== pattern.str.charCodeAt(pattern.start + k | 0)) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (c === pattern.str.charCodeAt(pattern.start + k | 0)) {
        k = k + 1 | 0;
      }
      if (i >>> 0 < table.length) {
        table[i] = k;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return table;
}
function _M0FPB24find__pattern__kmp__from(target, pattern, start) {
  const n = target.end - target.start | 0;
  const m = pattern.end - pattern.start | 0;
  const table = _M0FPB19kmp__failure__table(pattern);
  let k = 0;
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const c = target.str.charCodeAt(target.start + i | 0);
      while (true) {
        if (k > 0 && c !== pattern.str.charCodeAt(pattern.start + k | 0)) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (c === pattern.str.charCodeAt(pattern.start + k | 0)) {
        k = k + 1 | 0;
      }
      if (k === m) {
        return (i - m | 0) + 1 | 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < candidate_end) {
      if (data.charCodeAt(pos) === first && data.charCodeAt(pos + last_offset | 0) === last) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB42find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
  return _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
}
function _M0FPB21string__ranges__equal(left, left_start, right, right_start, length) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < length) {
      if (left.charCodeAt(left_start + i | 0) !== right.charCodeAt(right_start + i | 0)) {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FPB22find__by__two__anchors(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = target.start;
  const pattern_start = pattern.start;
  const last_offset = pattern_len - 1 | 0;
  const candidate_end = ((target_start + target_len | 0) - pattern_len | 0) + 1 | 0;
  const first = pattern.str.charCodeAt(pattern.start);
  const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
  const middle_len = last_offset - 1 | 0;
  let _tmp = target_start;
  let _tmp$2 = 0;
  while (true) {
    const pos = _tmp;
    const failures = _tmp$2;
    if (pos < candidate_end) {
      const found = _M0FPB42find__two__anchor__candidate__from__string(target.str, pos, candidate_end, first, last_offset, last);
      if (found < 0) {
        return undefined;
      }
      if (_M0FPB21string__ranges__equal(target.str, found + 1 | 0, pattern.str, pattern_start + 1 | 0, middle_len)) {
        return found - target_start | 0;
      }
      const failures$2 = failures + 1 | 0;
      const scanned = found - target_start | 0;
      if (failures$2 > 64 || failures$2 > (4 + (scanned / 8 | 0) | 0)) {
        return _M0FPB24find__pattern__kmp__from(target, pattern, scanned + 1 | 0);
      }
      _tmp = found + 1 | 0;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB13find__pattern(target, pattern) {
  if ((pattern.end - pattern.start | 0) <= 250) {
    const target_start = target.start;
    const pattern_start = pattern.start;
    const found = _M0FPB13js__index__of(target.str, target_start, target_start + (target.end - target.start | 0) | 0, _M0FPB13js__substring(pattern.str, pattern_start, pattern_start + (pattern.end - pattern.start | 0) | 0));
    return found < 0 ? undefined : found - target_start | 0;
  } else {
    return _M0FPB22find__by__two__anchors(target, pattern);
  }
}
function _M0FPB24find__code__unit__scalar(data, start, end, code) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end) {
      if (data.charCodeAt(pos) === code) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB30find__code__unit__from__string(data, start, end, code) {
  return (end - start | 0) <= 8 ? _M0FPB24find__code__unit__scalar(data, start, end, code) : _M0FPB13js__index__of(data, start, end, _M0FPB22js__code__unit__string(code));
}
function _M0FPB28find__code__unit__from__view(target, start, end, code) {
  const target_start = target.start;
  const found = _M0FPB30find__code__unit__from__string(target.str, target_start + start | 0, target_start + end | 0, code);
  return found < 0 ? -1 : found - target_start | 0;
}
function _M0MPC16string10StringView16find__code__unit(self, code) {
  const found = _M0FPB28find__code__unit__from__view(self, 0, self.end - self.start | 0, code);
  return found < 0 ? undefined : found;
}
function _M0MPC16string10StringView4find(self, str) {
  const pattern_len = str.end - str.start | 0;
  switch (pattern_len) {
    case 0: {
      return _M0MPC16string10StringView4findN6constrS712;
    }
    case 1: {
      return _M0MPC16string10StringView16find__code__unit(self, str.str.charCodeAt(str.start));
    }
    default: {
      return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB13find__pattern(self, str);
    }
  }
}
function _M0MPC16string6String4find(self, str) {
  return _M0MPC16string10StringView4find(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0IPC16string6StringPB4Show10to__string(self) {
  return self;
}
function _M0MPC16string6String6repeat(self, n) {
  if (n < 0) {
    return $panic("negative repeat count");
  } else {
    if (n === 0) {
      return "";
    } else {
      if (n === 1) {
        return self;
      } else {
        const len = self.length;
        const total = Math.imul(len, n) | 0;
        if (len === 0 || (total / n | 0) === len) {
          const buf = _M0MPB13StringBuilder21StringBuilder_2einner(total);
          const str = self;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < n) {
              buf.val = `${buf.val}${str}`;
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return buf.val;
        } else {
          return $panic("repeat result too large");
        }
      }
    }
  }
}
function _M0MPC16string6String8find__by(self, pred) {
  const _p = new _M0TPC16string10StringView(self, 0, self.length);
  const _p$2 = _p.str;
  const _p$3 = _p.start;
  const _p$4 = _p.end;
  let _tmp = _p$3;
  let _tmp$2 = 0;
  while (true) {
    const _p$5 = _tmp;
    const _p$6 = _tmp$2;
    if (_p$5 < _p$4) {
      let _p$7;
      let _p$8;
      _L: {
        const _p$9 = _p$2.charCodeAt(_p$5);
        if (_p$9 >= 55296 && _p$9 <= 56319 && (_p$5 + 1 | 0) < _p$4) {
          const _p$10 = _p$2.charCodeAt(_p$5 + 1 | 0);
          if (_p$10 >= 56320 && _p$10 <= 57343) {
            const _tmp$3 = _p$5 + 2 | 0;
            const _p$11 = (((Math.imul(_p$9 - 55296 | 0, 1024) | 0) + _p$10 | 0) - 56320 | 0) + 65536 | 0;
            _p$7 = _tmp$3;
            _p$8 = _p$11;
            break _L;
          } else {
            const _tmp$3 = _p$5 + 1 | 0;
            const _p$11 = _p$9;
            _p$7 = _tmp$3;
            _p$8 = _p$11;
            break _L;
          }
        } else {
          const _tmp$3 = _p$5 + 1 | 0;
          const _p$10 = _p$9;
          _p$7 = _tmp$3;
          _p$8 = _p$10;
          break _L;
        }
      }
      if (pred(_p$8)) {
        return _p$6;
      }
      _tmp = _p$7;
      const _p$9 = _p$8;
      _tmp$2 = _p$6 + (_p$9 <= 65535 ? 1 : 2) | 0;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB31rev__find__pattern__kmp__before(target, pattern, candidate_end) {
  if (candidate_end > 0) {
    const m = pattern.end - pattern.start | 0;
    const table = _M0FPB19kmp__failure__table(pattern);
    const scan_end = (candidate_end + m | 0) - 1 | 0;
    let k = 0;
    let best = -1;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < scan_end) {
        const c = target.str.charCodeAt(target.start + i | 0);
        while (true) {
          if (k > 0 && c !== pattern.str.charCodeAt(pattern.start + k | 0)) {
            const _tmp$2 = k - 1 | 0;
            k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
            continue;
          } else {
            break;
          }
        }
        if (c === pattern.str.charCodeAt(pattern.start + k | 0)) {
          k = k + 1 | 0;
        }
        if (k === m) {
          best = (i - m | 0) + 1 | 0;
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return best >= 0 ? best : undefined;
  } else {
    return undefined;
  }
}
function _M0FPB41rev__find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
  let _tmp = candidate_end - 1 | 0;
  let _tmp$2 = candidate_end > start;
  while (true) {
    const pos = _tmp;
    const _more = _tmp$2;
    if (_more) {
      if (data.charCodeAt(pos) === first && data.charCodeAt(pos + last_offset | 0) === last) {
        return pos;
      }
      _tmp = pos - 1 | 0;
      _tmp$2 = pos > start;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB47rev__find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
  return _M0FPB41rev__find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
}
function _M0FPB27rev__find__by__two__anchors(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = target.start;
  const pattern_start = pattern.start;
  const last_offset = pattern_len - 1 | 0;
  const first = pattern.str.charCodeAt(pattern.start);
  const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
  const middle_len = last_offset - 1 | 0;
  const last_candidate = target_len - pattern_len | 0;
  let _tmp = (target_start + last_candidate | 0) + 1 | 0;
  let _tmp$2 = 0;
  while (true) {
    const candidate_end = _tmp;
    const failures = _tmp$2;
    if (candidate_end > target_start) {
      const found = _M0FPB47rev__find__two__anchor__candidate__from__string(target.str, target_start, candidate_end, first, last_offset, last);
      if (found < 0) {
        return undefined;
      }
      if (_M0FPB21string__ranges__equal(target.str, found + 1 | 0, pattern.str, pattern_start + 1 | 0, middle_len)) {
        return found - target_start | 0;
      }
      const candidate = found - target_start | 0;
      const failures$2 = failures + 1 | 0;
      const scanned = last_candidate - candidate | 0;
      if (failures$2 > 64 || failures$2 > (4 + (scanned / 8 | 0) | 0)) {
        return _M0FPB31rev__find__pattern__kmp__before(target, pattern, candidate);
      }
      _tmp = found;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB29rev__find__code__unit__scalar(data, start, end, code) {
  let _tmp = end - 1 | 0;
  let _tmp$2 = end > start;
  while (true) {
    const pos = _tmp;
    const _more = _tmp$2;
    if (_more) {
      if (data.charCodeAt(pos) === code) {
        return pos;
      }
      _tmp = pos - 1 | 0;
      _tmp$2 = pos > start;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB35rev__find__code__unit__from__string(data, start, end, code) {
  return (end - start | 0) <= 8 ? _M0FPB29rev__find__code__unit__scalar(data, start, end, code) : _M0FPB19js__last__index__of(data, start, end, _M0FPB22js__code__unit__string(code));
}
function _M0FPB33rev__find__code__unit__from__view(target, start, end, code) {
  const target_start = target.start;
  const found = _M0FPB35rev__find__code__unit__from__string(target.str, target_start + start | 0, target_start + end | 0, code);
  return found < 0 ? -1 : found - target_start | 0;
}
function _M0MPC16string10StringView21rev__find__code__unit(self, code) {
  const found = _M0FPB33rev__find__code__unit__from__view(self, 0, self.end - self.start | 0, code);
  return found < 0 ? undefined : found;
}
function _M0MPC16string10StringView9rev__find(self, str) {
  const pattern_len = str.end - str.start | 0;
  switch (pattern_len) {
    case 0: {
      return self.end - self.start | 0;
    }
    case 1: {
      return _M0MPC16string10StringView21rev__find__code__unit(self, str.str.charCodeAt(str.start));
    }
    default: {
      return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB27rev__find__by__two__anchors(self, str);
    }
  }
}
function _M0MPC16string10StringView11has__suffix(self, str) {
  const self_len = self.end - self.start | 0;
  const str_len = str.end - str.start | 0;
  if (str_len <= self_len) {
    const start = self_len - str_len | 0;
    return str_len === 0 || self.str.charCodeAt(self.start + start | 0) === str.str.charCodeAt(str.start) ? _M0MPC16string6String20unsafe__range__equal(self.str, self.start + start | 0, str.str, str.start, str_len) : false;
  } else {
    return false;
  }
}
function _M0MPC16string6String11has__suffix(self, str) {
  return _M0MPC16string10StringView11has__suffix(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView11has__prefix(self, str) {
  const str_len = str.end - str.start | 0;
  return str_len <= (self.end - self.start | 0) ? (str_len === 0 || self.str.charCodeAt(self.start) === str.str.charCodeAt(str.start) ? _M0MPC16string6String20unsafe__range__equal(self.str, self.start, str.str, str.start, str_len) : false) : false;
}
function _M0MPC16string6String11has__prefix(self, str) {
  return _M0MPC16string10StringView11has__prefix(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView13strip__suffix(self, suffix) {
  const self_len = self.end - self.start | 0;
  const suffix_len = suffix.end - suffix.start | 0;
  return self_len >= suffix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12unsafe__view(self, self_len - suffix_len | 0, self.end - self.start | 0), suffix) ? _M0MPC16string10StringView12unsafe__view(self, 0, self_len - suffix_len | 0) : undefined;
}
function _M0MPC16string6String13strip__suffix(self, suffix) {
  return _M0MPC16string10StringView13strip__suffix(new _M0TPC16string10StringView(self, 0, self.length), suffix);
}
function _M0MPC16string10StringView13strip__prefix(self, prefix) {
  const prefix_len = prefix.end - prefix.start | 0;
  return (self.end - self.start | 0) >= prefix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12unsafe__view(self, 0, prefix_len), prefix) ? _M0MPC16string10StringView12unsafe__view(self, prefix_len, self.end - self.start | 0) : undefined;
}
function _M0MPC15array5Array13Array_2einnerGRPC16string10StringViewE(capacity) {
  return capacity >= 0 ? (capacity === 0 ? new _M0TPB5ArrayGRPC16string10StringViewE([], 0) : new _M0TPB5ArrayGRPC16string10StringViewE(new Array(capacity), 0)) : $panic("capacity must be non-negative");
}
function _M0FPB23array__growth__capacity(current, len, required) {
  if (required < len) {
    $panic("Array capacity overflow");
  }
  const start = current === 0 ? 8 : current;
  let _tmp = start;
  while (true) {
    const space = _tmp;
    if (space < required) {
      const next = Math.imul(space, 2) | 0;
      if (next <= space) {
        return required;
      }
      _tmp = next;
      continue;
    } else {
      return space;
    }
  }
}
function _M0MPC15array5Array8capacityGRP39XinOrigin10moon__warc8validate10DiagnosticE(self) {
  return self.buf.length;
}
function _M0MPC15array5Array14resize__bufferGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, new_capacity) {
  const old_buf = self.buf;
  self.buf = [];
  const len = self.len;
  const copy_len = len < new_capacity ? len : new_capacity;
  const new_buf = _M0MPB18UninitializedArray23make__and__blit_2einnerGRP39XinOrigin10moon__warc8validate10DiagnosticE(old_buf, new_capacity, copy_len, 0, 0);
  self.buf = new_buf;
}
function _M0MPC15array5Array7reallocGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, required) {
  const old_cap = _M0MPC15array5Array8capacityGRP39XinOrigin10moon__warc8validate10DiagnosticE(self);
  const new_cap = _M0FPB23array__growth__capacity(old_cap, self.len, required);
  _M0MPC15array5Array14resize__bufferGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, new_cap);
}
function _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, value) {
  if (self.len === self.buf.length) {
    _M0MPC15array5Array7reallocGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, self.len + 1 | 0);
  }
  const length = self.len;
  self.buf[length] = value;
  self.len = length + 1 | 0;
}
function _M0FPB36string__contains__code__unit__scalar(str, start, end, code) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      if (str.charCodeAt(i) === code) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPB28string__contains__code__unit(str, start, end, code) {
  return _M0FPB36string__contains__code__unit__scalar(str, start, end, code);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  return _M0FPB28string__contains__code__unit(self.str, self.start, self.end, code);
}
function _M0FPB23build__ascii__char__set(chars) {
  let bits0 = 0;
  let bits1 = 0;
  let bits2 = 0;
  let bits3 = 0;
  const _bind = chars.str;
  const _bind$2 = chars.start;
  const _bind$3 = chars.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$4;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      const code = _decoded_char;
      if (code >>> 0 < 128 >>> 0) {
        const bit = 1 << (code & 31);
        const _bind$4 = code >>> 5 | 0;
        switch (_bind$4) {
          case 0: {
            bits0 = bits0 | bit;
            break;
          }
          case 1: {
            bits1 = bits1 | bit;
            break;
          }
          case 2: {
            bits2 = bits2 | bit;
            break;
          }
          default: {
            bits3 = bits3 | bit;
          }
        }
      } else {
        return undefined;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return { _0: bits0, _1: bits1, _2: bits2, _3: bits3 };
}
function _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, code) {
  if (code >>> 0 < 128 >>> 0) {
    const bit = 1 << (code & 31);
    const _bind = code >>> 5 | 0;
    switch (_bind) {
      case 0: {
        return (bits0 & bit) !== 0;
      }
      case 1: {
        return (bits1 & bit) !== 0;
      }
      case 2: {
        return (bits2 & bit) !== 0;
      }
      default: {
        return (bits3 & bit) !== 0;
      }
    }
  } else {
    return false;
  }
}
function _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    let _tmp$2;
    if (pos < end) {
      const _p = str.charCodeAt(pos);
      _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = end;
  while (true) {
    const pos = _tmp;
    let _tmp$2;
    if (pos > start) {
      const _p = str.charCodeAt(pos - 1 | 0);
      _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB26string__trim__start__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0FPB24string__trim__end__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0MPC16string10StringView14contains__char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 >= 0 && c$2 <= 65535) {
      return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
    } else {
      if (c$2 < 0) {
        return false;
      } else {
        if (len >= 2) {
          const adj = c$2 - 65536 | 0;
          const high = 55296 + (adj >> 10) | 0;
          if (high <= 65535) {
            const high$2 = high & 65535;
            const low = (56320 + (adj & 1023) | 0) & 65535;
            let _tmp = 0;
            while (true) {
              const i = _tmp;
              if (i < (len - 1 | 0)) {
                if (self.str.charCodeAt(self.start + i | 0) === high$2) {
                  if (self.str.charCodeAt(self.start + (i + 1 | 0) | 0) === low) {
                    return true;
                  }
                  _tmp = i + 2 | 0;
                  continue;
                }
                _tmp = i + 1 | 0;
                continue;
              } else {
                break;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
function _M0MPC16string10StringView24trim__start__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
      const _tmp$2 = x.str;
      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind;
        _tmp$3 = _Some;
      }
      const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView22trim__end__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  const _bind = _M0FPB23build__ascii__char__set(chars);
  if (_bind === undefined) {
    return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _bits0 = _x._0;
    const _bits1 = _x._1;
    const _bits2 = _x._2;
    const _bits3 = _x._3;
    const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    const end = _M0FPB24string__trim__end__ascii(self.str, start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    return new _M0TPC16string10StringView(self.str, start, end);
  }
}
function _M0MPC16string10StringView4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = _M0MPC16string10StringView4trimN6recordS1101;
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string10StringView12trim_2einner(self, chars);
}
function _M0MPC16string10StringView19trim__start_2einner(self, chars) {
  const _bind = _M0FPB23build__ascii__char__set(chars);
  if (_bind === undefined) {
    return _M0MPC16string10StringView24trim__start__with__chars(self, chars);
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _bits0 = _x._0;
    const _bits1 = _x._1;
    const _bits2 = _x._2;
    const _bits3 = _x._3;
    const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    return new _M0TPC16string10StringView(self.str, start, self.end);
  }
}
function _M0MPC16string10StringView11trim__start(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = _M0MPC16string10StringView11trim__startN6recordS1116;
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string10StringView19trim__start_2einner(self, chars);
}
function _M0MPC16string6String12trim_2einner(self, chars) {
  return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string6String4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = _M0MPC16string6String4trimN6recordS1123;
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string6String12trim_2einner(self, chars);
}
function _M0MPB4Iter3mapGcRPC16string10StringViewE(self, f) {
  return new _M0TPB4IterGRPC16string10StringViewE(() => {
    const _bind = _M0MPB4Iter4nextGcE(self);
    if (_bind === -1) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0IPC14char4CharPB4Show10to__string(self) {
  return String.fromCodePoint(self);
}
function _M0MPC16string10StringView5split(self, sep) {
  const sep_len = sep.end - sep.start | 0;
  if (sep_len === 0) {
    return _M0MPB4Iter3mapGcRPC16string10StringViewE(_M0MPC16string10StringView4iter(self), (c) => {
      const _bind = _M0IPC14char4CharPB4Show10to__string(c);
      return new _M0TPC16string10StringView(_bind, 0, _bind.length);
    });
  }
  const remaining = new _M0TPB8MutLocalGORPC16string10StringViewE(self);
  return _M0MPB4Iter4IterGUsRPC14json4JsonEE(() => {
    const _bind = remaining.val;
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _view = _Some;
      const _bind$2 = _M0MPC16string10StringView4find(_view, sep);
      if (_bind$2 === undefined) {
        remaining.val = undefined;
        return _view;
      } else {
        const _Some$2 = _bind$2;
        const _end = _Some$2;
        remaining.val = _M0MPC16string10StringView12unsafe__view(_view, _end + sep_len | 0, _view.end - _view.start | 0);
        return _M0MPC16string10StringView12unsafe__view(_view, 0, _end);
      }
    }
  }, undefined);
}
function _M0MPC16string6String5split(self, sep) {
  return _M0MPC16string10StringView5split(new _M0TPC16string10StringView(self, 0, self.length), sep);
}
function _M0MPC16string10StringView11split__once(self, needle) {
  const _bind = _M0MPC16string10StringView4find(self, needle);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _index = _Some;
    return { _0: _M0MPC16string10StringView12unsafe__view(self, 0, _index), _1: _M0MPC16string10StringView12unsafe__view(self, _index + (needle.end - needle.start | 0) | 0, self.end - self.start | 0) };
  }
}
function _M0MPC16string6String11split__once(self, needle) {
  return _M0MPC16string10StringView11split__once(new _M0TPC16string10StringView(self, 0, self.length), needle);
}
function _M0MPC16string10StringView16rev__split__once(self, needle) {
  const _bind = _M0MPC16string10StringView9rev__find(self, needle);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _index = _Some;
    return { _0: _M0MPC16string10StringView12unsafe__view(self, 0, _index), _1: _M0MPC16string10StringView12unsafe__view(self, _index + (needle.end - needle.start | 0) | 0, self.end - self.start | 0) };
  }
}
function _M0MPC16string6String16rev__split__once(self, needle) {
  return _M0MPC16string10StringView16rev__split__once(new _M0TPC16string10StringView(self, 0, self.length), needle);
}
function _M0MPB4Iter9to__arrayGRPC16string10StringViewE(self) {
  const _bind = self.size_hint;
  let result;
  if (_bind === undefined) {
    result = new _M0TPB5ArrayGRPC16string10StringViewE([], 0);
  } else {
    const _Some = _bind;
    const _n = _Some;
    result = _M0MPC15array5Array13Array_2einnerGRPC16string10StringViewE(_n);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGUsRPC14json4JsonEE(self);
    if (_bind$2 === undefined) {
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(result, _x);
      continue;
    }
  }
  return result;
}
function _M0MPC14char4Char20is__ascii__uppercase(self) {
  return self >= 65 && self <= 90;
}
function _M0MPC16string6String9to__lower(self) {
  const _bind = _M0MPC16string6String8find__by(self, (c) => _M0MPC14char4Char20is__ascii__uppercase(c));
  if (_bind === undefined) {
    return self;
  } else {
    const _Some = _bind;
    const _idx = _Some;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(self.length);
    const head = new _M0TPC16string10StringView(self, 0, _idx);
    _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(buf, head.str, head.start, _idx);
    const _bind_end = self.length;
    let _tmp = _idx;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind_end) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$2 = self.charCodeAt(_string_index);
          if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind_end) {
            const _bind$3 = self.charCodeAt(_string_index + 1 | 0);
            if (_bind$3 >= 56320 && _bind$3 <= 57343) {
              const _tmp$2 = _string_index + 2 | 0;
              const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$2;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        }
        if (_M0MPC14char4Char20is__ascii__uppercase(_decoded_char)) {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char + 32 | 0);
        } else {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    return buf.val;
  }
}
function _M0IPC16string6StringPB12ToStringView16to__string__view(self) {
  return new _M0TPC16string10StringView(self, 0, self.length);
}
function _M0FPB19join__string__viewsGRPC16string10StringViewE(parts, separator) {
  if ((parts.end - parts.start | 0) === 0) {
    return "";
  } else {
    if ((parts.end - parts.start | 0) === 1) {
      const _one = parts.buf[parts.start];
      return _M0MPC16string10StringView9to__owned(_one);
    } else {
      const _first = parts.buf[parts.start];
      const _x_buf = parts.buf;
      const _x_start = 1 + parts.start | 0;
      const _x_end = parts.end;
      const separator$2 = _M0MPC16string10StringView9to__owned(separator);
      let result = _M0MPC16string10StringView9to__owned(_first);
      const _bind = _x_end - _x_start | 0;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const part = _x_buf[_x_start + _ | 0];
          result = `${result}${separator$2}`;
          result = `${result}${_M0MPC16string10StringView9to__owned(part)}`;
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return result;
    }
  }
}
function _M0FPB19join__string__viewsGsE(parts, separator) {
  if ((parts.end - parts.start | 0) === 0) {
    return "";
  } else {
    if ((parts.end - parts.start | 0) === 1) {
      const _one = parts.buf[parts.start];
      return _M0MPC16string10StringView9to__owned(_M0IPC16string6StringPB12ToStringView16to__string__view(_one));
    } else {
      const _first = parts.buf[parts.start];
      const _x_buf = parts.buf;
      const _x_start = 1 + parts.start | 0;
      const _x_end = parts.end;
      const separator$2 = _M0MPC16string10StringView9to__owned(separator);
      let result = _M0MPC16string10StringView9to__owned(_M0IPC16string6StringPB12ToStringView16to__string__view(_first));
      const _bind = _x_end - _x_start | 0;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const part = _x_buf[_x_start + _ | 0];
          result = `${result}${separator$2}`;
          result = `${result}${_M0MPC16string10StringView9to__owned(_M0IPC16string6StringPB12ToStringView16to__string__view(part))}`;
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return result;
    }
  }
}
function _M0MPC16string6String16lexical__compare(self, other) {
  return _M0MPC16string10StringView16lexical__compare(new _M0TPC16string10StringView(self, 0, self.length), new _M0TPC16string10StringView(other, 0, other.length));
}
function _M0IPC13int3IntPB4Show10to__string(self) {
  return _M0MPC13int3Int18to__string_2einner(self, 10);
}
function _M0MPC15array9ArrayView4iterGsE(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  const len = self.end - self.start | 0;
  return _M0MPB4Iter4IterGUsRPC14json4JsonEE(() => {
    if (i.val < len) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  }, len);
}
function _M0MPC15array5Array4iterGsE(self) {
  return _M0MPC15array9ArrayView4iterGsE(new _M0TPB9ArrayViewGsE(self.buf, 0, self.len));
}
function _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(len) {
  return new _M0TPB5ArrayGRPC15debug13ContentParensE(new Array(len), len);
}
function _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(self, separator) {
  return _M0FPB19join__string__viewsGRPC16string10StringViewE(self, separator);
}
function _M0MPC15array9ArrayView4joinGsE(self, separator) {
  return _M0FPB19join__string__viewsGsE(self, separator);
}
function _M0IPC16option6OptionPB2Eq5equalGiE(self, other) {
  if (self === undefined) {
    return other === undefined;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === undefined) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
function _M0IPC16option6OptionPB2Eq5equalGRP39XinOrigin10moon__warc6header8WarcTypeE(self, other) {
  if (self === undefined) {
    return other === undefined;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === undefined) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _M0IP39XinOrigin10moon__warc6header8WarcTypePB2Eq5equal(_x, _y);
    }
  }
}
function _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(self, default$$) {
  if (self === undefined) {
    return default$$;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC16option6Option10unwrap__orGiE(self, default$$) {
  if (self === undefined) {
    return default$$;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(src, allocate_len, len, src_offset, dst_offset) {
  return new _M0TPB5ArrayGsE(_M0MPB18UninitializedArray23make__and__blit_2einnerGRP39XinOrigin10moon__warc8validate10DiagnosticE(src, allocate_len, len, src_offset, dst_offset), allocate_len);
}
function _M0FPB21calc__grow__threshold(capacity) {
  return (Math.imul(capacity / 16 | 0, 13) | 0) + ((Math.imul(capacity % 16 | 0, 13) | 0) / 16 | 0) | 0;
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0FPB8new__mapGssE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGssE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB8new__mapGsiE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGsiE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB21capacity__for__length(length) {
  if (length <= _M0FPB21calc__grow__threshold(1073741824)) {
    let capacity = _M0MPC13int3Int20next__power__of__two(length);
    if (length > _M0FPB21calc__grow__threshold(capacity)) {
      capacity = Math.imul(capacity, 2) | 0;
    }
    return capacity;
  } else {
    return $panic("Map capacity overflow");
  }
}
function _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    const _p = _bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob();
    let _tmp$2;
    if (_p === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$2 = _p;
      _tmp$2 = _p$2;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGsiE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    const _p = _bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob();
    let _tmp$2;
    if (_p === undefined) {
      _tmp$2 = $panic();
    } else {
      const _p$2 = _p;
      _tmp$2 = _p$2;
    }
    _tmp$2.next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map10set__entryGssE(self, entry, new_idx) {
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGsiE(self, entry, new_idx) {
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10push__awayGssE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind = self.entries[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGssE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGssE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGsiE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = idx + 1 & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind = self.entries[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsiE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsiE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx$2 + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGssE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGssE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGssE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGssE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGsiE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGsiE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGsiE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsiE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map4growGssE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGssE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGsiE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGsiE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGssE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGssE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGssE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGssE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGssE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGssE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsiE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsiE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsiE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsiE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsiE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsiE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsiE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsiE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPC14json4JsonE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGssE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRPC14json4JsonE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGssE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGssE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRPC14json4JsonE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP39XinOrigin10moon__warc5codec10WarcRecordE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGssE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRP39XinOrigin10moon__warc5codec10WarcRecordE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGssE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGssE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRP39XinOrigin10moon__warc5codec10WarcRecordE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGssE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3setGssE(self, key, value) {
  _M0MPB3Map15set__with__hashGssE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsiE(self, key, value) {
  _M0MPB3Map15set__with__hashGsiE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRPC14json4JsonE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPC14json4JsonE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRP39XinOrigin10moon__warc5codec10WarcRecordE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP39XinOrigin10moon__warc5codec10WarcRecordE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3MapGssE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _capacity >= 0 ? _M0FPB21capacity__for__length(_capacity > length ? _capacity : length) : $panic("capacity must be non-negative");
  }
  const m = _M0FPB8new__mapGssE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGssE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsiE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _capacity >= 0 ? _M0FPB21capacity__for__length(_capacity > length ? _capacity : length) : $panic("capacity must be non-negative");
  }
  const m = _M0FPB8new__mapGsiE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsiE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRPC14json4JsonE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _capacity >= 0 ? _M0FPB21capacity__for__length(_capacity > length ? _capacity : length) : $panic("capacity must be non-negative");
  }
  const m = _M0FPB8new__mapGssE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPC14json4JsonE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP39XinOrigin10moon__warc5codec10WarcRecordE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _capacity >= 0 ? _M0FPB21capacity__for__length(_capacity > length ? _capacity : length) : $panic("capacity must be non-negative");
  }
  const m = _M0FPB8new__mapGssE(capacity$2);
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP39XinOrigin10moon__warc5codec10WarcRecordE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3getGssE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsiE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP39XinOrigin10moon__warc5codec10WarcRecordE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsiE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRP39XinOrigin10moon__warc5codec10WarcRecordE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = idx + 1 & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map4iterGsRPC14json4JsonE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRPC14json4JsonEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter4IterGUsRPC14json4JsonEE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPC15bytes5Bytes20unsafe__range__equal(self, start, other, other_start, len) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if (self[start + i | 0] === other[other_start + i | 0]) {
      } else {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MPC13int3Int8to__char(self) {
  _L: {
    if (self >= 0 && self <= 55295) {
      break _L;
    } else {
      if (self >= 57344 && self <= 1114111) {
        break _L;
      } else {
        return -1;
      }
    }
  }
  return self;
}
function _M0IPC16string6StringPB4Hash4hash(self) {
  let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      acc = (acc >>> 0) + (4 >>> 0) | 0;
      const v = self.charCodeAt(i);
      acc = _M0FPB13consume4__acc(acc, v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FPB13finalize__acc(acc);
}
function _M0MPC15array10FixedArray23unsafe__make__and__blitGyE(src, allocate_len, init, src_offset, dst_offset, blit_len) {
  const dst = $makebytes(allocate_len, init);
  _M0MPC15array10FixedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPC15array10FixedArray23unsafe__make__and__blitGjE(src, allocate_len, init, src_offset, dst_offset, blit_len) {
  const dst = $make_array_len_and_init(allocate_len, init);
  _M0MPC15array10FixedArray12unsafe__blitGjE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPC15array10FixedArray23make__and__blit_2einnerGyE(src, allocate_len, init, len, src_offset, dst_offset) {
  let _tmp;
  if (allocate_len >= 0) {
    let _tmp$2;
    if (len >= 0) {
      let _tmp$3;
      const _p = src.length;
      if (src_offset >= 0 && src_offset <= (_p - len | 0)) {
        _tmp$3 = dst_offset >= 0 && dst_offset <= (allocate_len - len | 0);
      } else {
        _tmp$3 = false;
      }
      _tmp$2 = _tmp$3;
    } else {
      _tmp$2 = false;
    }
    _tmp = _tmp$2;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    return _M0MPC15array10FixedArray23unsafe__make__and__blitGyE(src, allocate_len, init, src_offset, dst_offset, len);
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
    const _p = "bounds check failed: allocate_len = ";
    _string_builder.val = `${_string_builder.val}${_p}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, allocate_len);
    const _p$2 = ", src_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$2}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src_offset);
    const _p$3 = ", dst_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$3}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, dst_offset);
    const _p$4 = ", len = ";
    _string_builder.val = `${_string_builder.val}${_p$4}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, len);
    const _p$5 = ", src.length = ";
    _string_builder.val = `${_string_builder.val}${_p$5}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src.length);
    return $panic(_string_builder.val);
  }
}
function _M0MPC15array10FixedArray23make__and__blit_2einnerGjE(src, allocate_len, init, len, src_offset, dst_offset) {
  let _tmp;
  if (allocate_len >= 0) {
    let _tmp$2;
    if (len >= 0) {
      let _tmp$3;
      const _p = src.length;
      if (src_offset >= 0 && src_offset <= (_p - len | 0)) {
        _tmp$3 = dst_offset >= 0 && dst_offset <= (allocate_len - len | 0);
      } else {
        _tmp$3 = false;
      }
      _tmp$2 = _tmp$3;
    } else {
      _tmp$2 = false;
    }
    _tmp = _tmp$2;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    return _M0MPC15array10FixedArray23unsafe__make__and__blitGjE(src, allocate_len, init, src_offset, dst_offset, len);
  } else {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
    const _p = "bounds check failed: allocate_len = ";
    _string_builder.val = `${_string_builder.val}${_p}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, allocate_len);
    const _p$2 = ", src_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$2}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src_offset);
    const _p$3 = ", dst_offset = ";
    _string_builder.val = `${_string_builder.val}${_p$3}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, dst_offset);
    const _p$4 = ", len = ";
    _string_builder.val = `${_string_builder.val}${_p$4}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, len);
    const _p$5 = ", src.length = ";
    _string_builder.val = `${_string_builder.val}${_p$5}`;
    _M0MPB13StringBuilder13write__objectGiE(_string_builder, src.length);
    return $panic(_string_builder.val);
  }
}
function _M0MPC15array10FixedArray4copyGyE(self) {
  const len = self.length;
  return len === 0 ? new Uint8Array([]) : _M0MPC15array10FixedArray23make__and__blit_2einnerGyE(self, len, 0 >>> 0 < self.length ? self[0] : $oob(), len, 0, 0);
}
function _M0MPC15array10FixedArray4copyGjE(self) {
  const len = self.length;
  return len === 0 ? [] : _M0MPC15array10FixedArray23make__and__blit_2einnerGjE(self, len, 0 >>> 0 < self.length ? self[0] : $oob(), len, 0, 0);
}
function _M0IPC16double6DoublePB4Show10to__string(self) {
  return String(self);
}
function _M0MPC14char4Char7to__hex(char) {
  const code = char;
  return code >= 0 && code <= 255 ? _M0MPC14byte4Byte7to__hex(code & 255) : code <= 65535 ? `${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}` : `${_M0MPC14byte4Byte7to__hex(code >> 16 & 255)}${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}`;
}
function _M0MPC14char4Char11is__control(self) {
  return self >= 0 && self <= 31 ? true : self >= 127 && self <= 159;
}
function _M0MPC14char4Char13is__printable(self) {
  if (_M0MPC14char4Char11is__control(self)) {
    return false;
  }
  const self$2 = self;
  _L: {
    _L$2: {
      if (self$2 >= 57344 && self$2 <= 63743) {
        break _L$2;
      } else {
        if (self$2 >= 983040 && self$2 <= 1048573) {
          break _L$2;
        } else {
          if (self$2 >= 1048576 && self$2 <= 1114109) {
            break _L$2;
          }
        }
      }
      break _L;
    }
    return false;
  }
  _L$2: {
    _L$3: {
      if (self$2 === 173) {
        break _L$3;
      } else {
        if (self$2 >= 1536 && self$2 <= 1541) {
          break _L$3;
        } else {
          if (self$2 === 1564) {
            break _L$3;
          } else {
            if (self$2 === 1757) {
              break _L$3;
            } else {
              if (self$2 === 1807) {
                break _L$3;
              } else {
                if (self$2 >= 2192 && self$2 <= 2193) {
                  break _L$3;
                } else {
                  if (self$2 === 2274) {
                    break _L$3;
                  } else {
                    if (self$2 === 6158) {
                      break _L$3;
                    } else {
                      if (self$2 >= 8203 && self$2 <= 8207) {
                        break _L$3;
                      } else {
                        if (self$2 >= 8234 && self$2 <= 8238) {
                          break _L$3;
                        } else {
                          if (self$2 >= 8288 && self$2 <= 8292) {
                            break _L$3;
                          } else {
                            if (self$2 >= 8294 && self$2 <= 8303) {
                              break _L$3;
                            } else {
                              if (self$2 === 65279) {
                                break _L$3;
                              } else {
                                if (self$2 >= 65529 && self$2 <= 65531) {
                                  break _L$3;
                                } else {
                                  if (self$2 === 69821) {
                                    break _L$3;
                                  } else {
                                    if (self$2 === 69837) {
                                      break _L$3;
                                    } else {
                                      if (self$2 >= 78896 && self$2 <= 78911) {
                                        break _L$3;
                                      } else {
                                        if (self$2 >= 113824 && self$2 <= 113827) {
                                          break _L$3;
                                        } else {
                                          if (self$2 >= 119155 && self$2 <= 119162) {
                                            break _L$3;
                                          } else {
                                            if (self$2 === 917505) {
                                              break _L$3;
                                            } else {
                                              if (self$2 >= 917536 && self$2 <= 917631) {
                                                break _L$3;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$2;
    }
    return false;
  }
  if (55296 <= self$2 && self$2 <= 57343) {
    return false;
  }
  if (self$2 === 8232 || self$2 === 8233) {
    return false;
  }
  _L$3: {
    _L$4: {
      if (self$2 >= 64976 && self$2 <= 65007) {
        break _L$4;
      } else {
        if (self$2 >= 65534 && self$2 <= 65535) {
          break _L$4;
        } else {
          if (self$2 >= 131070 && self$2 <= 131071) {
            break _L$4;
          } else {
            if (self$2 >= 196606 && self$2 <= 196607) {
              break _L$4;
            } else {
              if (self$2 >= 262142 && self$2 <= 262143) {
                break _L$4;
              } else {
                if (self$2 >= 327678 && self$2 <= 327679) {
                  break _L$4;
                } else {
                  if (self$2 >= 393214 && self$2 <= 393215) {
                    break _L$4;
                  } else {
                    if (self$2 >= 458750 && self$2 <= 458751) {
                      break _L$4;
                    } else {
                      if (self$2 >= 524286 && self$2 <= 524287) {
                        break _L$4;
                      } else {
                        if (self$2 >= 589822 && self$2 <= 589823) {
                          break _L$4;
                        } else {
                          if (self$2 >= 655358 && self$2 <= 655359) {
                            break _L$4;
                          } else {
                            if (self$2 >= 720894 && self$2 <= 720895) {
                              break _L$4;
                            } else {
                              if (self$2 >= 786430 && self$2 <= 786431) {
                                break _L$4;
                              } else {
                                if (self$2 >= 851966 && self$2 <= 851967) {
                                  break _L$4;
                                } else {
                                  if (self$2 >= 917502 && self$2 <= 917503) {
                                    break _L$4;
                                  } else {
                                    if (self$2 >= 983038 && self$2 <= 983039) {
                                      break _L$4;
                                    } else {
                                      if (self$2 >= 1048574 && self$2 <= 1048575) {
                                        break _L$4;
                                      } else {
                                        if (self$2 >= 1114110 && self$2 <= 1114111) {
                                          break _L$4;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$3;
    }
    return false;
  }
  return true;
}
function _M0MPC14char4Char18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
  }
  _L: {
    _L$2: {
      if (self === 39) {
        break _L$2;
      } else {
        if (self === 92) {
          break _L$2;
        } else {
          if (self === 10) {
            logger.method_table.method_0(logger.self, "\\n");
          } else {
            if (self === 13) {
              logger.method_table.method_0(logger.self, "\\r");
            } else {
              if (self === 8) {
                logger.method_table.method_0(logger.self, "\\b");
              } else {
                if (self === 9) {
                  logger.method_table.method_0(logger.self, "\\t");
                } else {
                  if (self >= 32 && self <= 126) {
                    logger.method_table.method_3(logger.self, self);
                  } else {
                    if (!_M0MPC14char4Char13is__printable(self)) {
                      logger.method_table.method_0(logger.self, "\\u{");
                      logger.method_table.method_4(logger.self, { self: _M0MPC14char4Char7to__hex(self), method_table: _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
                      logger.method_table.method_0(logger.self, "}");
                    } else {
                      logger.method_table.method_3(logger.self, self);
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L;
    }
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, self);
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
    return;
  } else {
    return;
  }
}
function _M0MPC14char4Char14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  _M0MPC14char4Char18escape__to_2einner(self, { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return buf.val;
}
function _M0IPC15bytes9BytesViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  return len === (other.end - other.start | 0) ? _M0MPC15bytes5Bytes20unsafe__range__equal(self.buf, self.start, other.buf, other.start, len) : false;
}
function _M0MPC15array10FixedArray17blit__from__bytes(self, bytes_offset, src, src_offset, length) {
  const len1 = self.length;
  const len2 = src.length;
  if (length >= 0 && (bytes_offset >= 0 && (bytes_offset <= len1 && (length <= (len1 - bytes_offset | 0) && (src_offset >= 0 && (src_offset <= len2 && length <= (len2 - src_offset | 0))))))) {
    _M0MPC15array10FixedArray12unsafe__blitGyE(self, bytes_offset, src, src_offset, length);
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15bytes9BytesView9to__owned(self) {
  if ((self.end - self.start | 0) === self.buf.length) {
    return self.buf;
  }
  const bytes = $makebytes(self.end - self.start | 0, 0);
  _M0MPC15array10FixedArray17blit__from__bytes(bytes, 0, self.buf, self.start, self.end - self.start | 0);
  return bytes;
}
function _M0FPB22find__byte__from__view(target, start, end, byte) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end) {
      if (target.buf[target.start + pos | 0] === byte) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB23find__rabin__karp__fromN4hashS1739(bytes, start, length) {
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp;
    const hash = _tmp$2;
    if (i < length) {
      _tmp = i + 1 | 0;
      const _tmp$3 = Math.imul(hash, 16777619) | 0;
      const _p = bytes.buf[bytes.start + (start + i | 0) | 0];
      _tmp$2 = (_tmp$3 >>> 0) + (_p >>> 0) | 0;
      continue;
    } else {
      return hash;
    }
  }
}
function _M0FPB23find__rabin__karp__from(target, pattern, start) {
  const pattern_len = pattern.end - pattern.start | 0;
  const target_len = target.end - target.start | 0;
  if ((start + pattern_len | 0) > target_len) {
    return undefined;
  }
  const target_start = target.start;
  const pattern_start = pattern.start;
  const pattern_hash = _M0FPB23find__rabin__karp__fromN4hashS1739(pattern, 0, pattern_len);
  let pow;
  let _tmp = 1;
  let _tmp$2 = 16777619;
  let _tmp$3 = pattern_len;
  while (true) {
    const pow$2 = _tmp;
    const square = _tmp$2;
    const exp = _tmp$3;
    if (exp > 0) {
      const next_pow = (exp % 2 | 0) === 1 ? Math.imul(pow$2, square) | 0 : pow$2;
      _tmp = next_pow;
      _tmp$2 = Math.imul(square, square) | 0;
      _tmp$3 = exp / 2 | 0;
      continue;
    } else {
      pow = pow$2;
      break;
    }
  }
  const hash = _M0FPB23find__rabin__karp__fromN4hashS1739(target, start, pattern_len);
  if (hash === pattern_hash && _M0MPC15bytes5Bytes20unsafe__range__equal(target.buf, target_start + start | 0, pattern.buf, pattern_start, pattern_len)) {
    return start;
  }
  let _tmp$4 = start + pattern_len | 0;
  let _tmp$5 = hash;
  while (true) {
    const index = _tmp$4;
    const hash$2 = _tmp$5;
    if (index < target_len) {
      const _tmp$6 = Math.imul(hash$2, 16777619) | 0;
      const _p = target.buf[target.start + index | 0];
      const hash$3 = (_tmp$6 >>> 0) + (_p >>> 0) | 0;
      const _p$2 = target.buf[target.start + (index - pattern_len | 0) | 0];
      const hash$4 = (hash$3 >>> 0) - ((Math.imul(pow, _p$2) | 0) >>> 0) | 0;
      const candidate = (index - pattern_len | 0) + 1 | 0;
      if (hash$4 === pattern_hash && _M0MPC15bytes5Bytes20unsafe__range__equal(target.buf, target_start + candidate | 0, pattern.buf, pattern_start, pattern_len)) {
        return candidate;
      }
      _tmp$4 = index + 1 | 0;
      _tmp$5 = hash$4;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB29find__long__by__byte__scanner(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const last = target_len - pattern_len | 0;
  const target_start = target.start;
  const pattern_start = pattern.start;
  const first_byte = pattern.buf[pattern.start];
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const pos = _tmp;
    const failures = _tmp$2;
    if (pos <= last) {
      const found = _M0FPB22find__byte__from__view(target, pos, target_len, first_byte);
      if (found < 0 || found > last) {
        return undefined;
      }
      if (_M0MPC15bytes5Bytes20unsafe__range__equal(target.buf, (target_start + found | 0) + 1 | 0, pattern.buf, pattern_start + 1 | 0, pattern_len - 1 | 0)) {
        return found;
      }
      const failures$2 = failures + 1 | 0;
      if (failures$2 > 64 || failures$2 > (4 + (found / 16 | 0) | 0)) {
        return _M0FPB23find__rabin__karp__from(target, pattern, found + 1 | 0);
      }
      _tmp = found + 1 | 0;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB11find__short(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = target.start;
  const pattern_start = pattern.start;
  const last_offset = pattern_len - 1 | 0;
  const last_byte = pattern.buf[pattern.start + last_offset | 0];
  let _tmp = last_offset;
  while (true) {
    const anchor_pos = _tmp;
    if (anchor_pos < target_len) {
      const found = _M0FPB22find__byte__from__view(target, anchor_pos, target_len, last_byte);
      if (found < 0) {
        return undefined;
      }
      const candidate = found - last_offset | 0;
      if (_M0MPC15bytes5Bytes20unsafe__range__equal(target.buf, target_start + candidate | 0, pattern.buf, pattern_start, last_offset)) {
        return candidate;
      }
      _tmp = found + 1 | 0;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB11find__index(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  if (pattern_len === 0) {
    return _M0FPB11find__indexN6constrS1792;
  }
  if (pattern_len > target_len) {
    return undefined;
  }
  if (pattern_len === 1) {
    const found = _M0FPB22find__byte__from__view(target, 0, target_len, pattern.buf[pattern.start]);
    return found < 0 ? undefined : found;
  } else {
    return pattern_len === target_len ? (_M0IPC15bytes9BytesViewPB2Eq5equal(target, pattern) ? _M0FPB11find__indexN6constrS1793 : undefined) : pattern_len <= 32 ? _M0FPB11find__short(target, pattern) : _M0FPB29find__long__by__byte__scanner(target, pattern);
  }
}
function _M0MPC15bytes9BytesView4find(target, pattern) {
  return _M0FPB11find__index(target, pattern);
}
function _M0MPC15bytes5Bytes11from__array(arr) {
  const len = arr.end - arr.start | 0;
  if (len === 0) {
    return $bytes_literal$6;
  }
  const result = _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(arr.buf, len, arr.start, 0, len);
  return result;
}
function _M0MPC15array12MutArrayView4swapGUsssEE(arr, i, j) {
  const temp = arr.buf[arr.start + i | 0];
  arr.buf[arr.start + i | 0] = arr.buf[arr.start + j | 0];
  arr.buf[arr.start + j | 0] = temp;
}
function _M0MPC15array12MutArrayView5sliceGUsssEE(arr, start, end) {
  const _bind = arr.end - arr.start | 0;
  if (start < 0 || (start > end || end > _bind)) {
    $panic();
  }
  return new _M0TPB12MutArrayViewGUsssEE(arr.buf, start + arr.start | 0, end + arr.start | 0);
}
function _M0MPC15array12MutArrayView14rev__in__placeGUsssEE(arr) {
  const len = arr.end - arr.start | 0;
  const mid_len = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < mid_len) {
      const j = (len - i | 0) - 1 | 0;
      const temp = arr.buf[arr.start + i | 0];
      arr.buf[arr.start + i | 0] = arr.buf[arr.start + j | 0];
      arr.buf[arr.start + j | 0] = temp;
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPB17fixed__get__limit(len) {
  let _tmp = len;
  let _tmp$2 = 0;
  while (true) {
    const len$2 = _tmp;
    const limit = _tmp$2;
    if (len$2 > 0) {
      _tmp = len$2 / 2 | 0;
      _tmp$2 = limit + 1 | 0;
      continue;
    } else {
      return limit;
    }
  }
}
function _M0FPB23fixed__bubble__sort__byGUsssEE(arr, cmp) {
  const _bind = arr.end - arr.start | 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      let _tmp$2 = i;
      while (true) {
        const j = _tmp$2;
        if (j > 0 && cmp(arr.buf[arr.start + (j - 1 | 0) | 0], arr.buf[arr.start + j | 0]) > 0) {
          _M0MPC15array12MutArrayView4swapGUsssEE(arr, j, j - 1 | 0);
          _tmp$2 = j - 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPB24fixed__choose__pivot__byN7sort__2S1862GUsssEE(_env, a, b) {
  const swaps = _env._2;
  const cmp = _env._1;
  const arr = _env._0;
  if (cmp(arr.buf[arr.start + a | 0], arr.buf[arr.start + b | 0]) > 0) {
    _M0MPC15array12MutArrayView4swapGUsssEE(arr, a, b);
    swaps.val = swaps.val + 1 | 0;
    return;
  } else {
    return;
  }
}
function _M0FPB24fixed__choose__pivot__byN7sort__3S1863GUsssEE(_env, a, b, c) {
  _M0FPB24fixed__choose__pivot__byN7sort__2S1862GUsssEE(_env, a, b);
  _M0FPB24fixed__choose__pivot__byN7sort__2S1862GUsssEE(_env, b, c);
  _M0FPB24fixed__choose__pivot__byN7sort__2S1862GUsssEE(_env, a, b);
}
function _M0FPB24fixed__choose__pivot__byGUsssEE(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const swaps = new _M0TPB8MutLocalGiE(0);
  const b = Math.imul(len / 4 | 0, 2) | 0;
  if (len >= 8) {
    const a = Math.imul(len / 4 | 0, 1) | 0;
    const c = Math.imul(len / 4 | 0, 3) | 0;
    const _env = { _0: arr, _1: cmp, _2: swaps };
    if (len > 50) {
      _M0FPB24fixed__choose__pivot__byN7sort__3S1863GUsssEE(_env, a - 1 | 0, a, a + 1 | 0);
      _M0FPB24fixed__choose__pivot__byN7sort__3S1863GUsssEE(_env, b - 1 | 0, b, b + 1 | 0);
      _M0FPB24fixed__choose__pivot__byN7sort__3S1863GUsssEE(_env, c - 1 | 0, c, c + 1 | 0);
    }
    _M0FPB24fixed__choose__pivot__byN7sort__3S1863GUsssEE(_env, a, b, c);
  }
  if (swaps.val === 12) {
    _M0MPC15array12MutArrayView14rev__in__placeGUsssEE(arr);
    return { _0: (len - b | 0) - 1 | 0, _1: true };
  } else {
    return { _0: b, _1: swaps.val === 0 };
  }
}
function _M0FPB21fixed__sift__down__byGUsssEE(arr, index, cmp) {
  const len = arr.end - arr.start | 0;
  let _tmp = index;
  let _tmp$2 = (Math.imul(index, 2) | 0) + 1 | 0;
  while (true) {
    const index$2 = _tmp;
    const child = _tmp$2;
    if (child < len) {
      const child$2 = (child + 1 | 0) < len && cmp(arr.buf[arr.start + child | 0], arr.buf[arr.start + (child + 1 | 0) | 0]) < 0 ? child + 1 | 0 : child;
      if (cmp(arr.buf[arr.start + index$2 | 0], arr.buf[arr.start + child$2 | 0]) >= 0) {
        return undefined;
      }
      _M0MPC15array12MutArrayView4swapGUsssEE(arr, index$2, child$2);
      _tmp = child$2;
      _tmp$2 = (Math.imul(child$2, 2) | 0) + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPB21fixed__heap__sort__byGUsssEE(arr, cmp) {
  const len = arr.end - arr.start | 0;
  const _bind = len / 2 | 0;
  let _tmp = _bind - 1 | 0;
  let _tmp$2 = _bind > 0;
  while (true) {
    const i = _tmp;
    const _more = _tmp$2;
    if (_more) {
      _M0FPB21fixed__sift__down__byGUsssEE(arr, i, cmp);
      _tmp = i - 1 | 0;
      _tmp$2 = i > 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$3 = len - 1 | 0;
  let _tmp$4 = len > 1;
  while (true) {
    const i = _tmp$3;
    const _more = _tmp$4;
    if (_more) {
      _M0MPC15array12MutArrayView4swapGUsssEE(arr, 0, i);
      _M0FPB21fixed__sift__down__byGUsssEE(_M0MPC15array12MutArrayView5sliceGUsssEE(arr, 0, i), 0, cmp);
      _tmp$3 = i - 1 | 0;
      _tmp$4 = i > 1;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPB20fixed__partition__byGUsssEE(arr, cmp, pivot_index) {
  _M0MPC15array12MutArrayView4swapGUsssEE(arr, pivot_index, (arr.end - arr.start | 0) - 1 | 0);
  const pivot = arr.buf[arr.start + ((arr.end - arr.start | 0) - 1 | 0) | 0];
  const _bind = (arr.end - arr.start | 0) - 1 | 0;
  let _tmp = 0;
  let _tmp$2 = 0;
  let _tmp$3 = true;
  while (true) {
    const j = _tmp;
    const i = _tmp$2;
    const partitioned = _tmp$3;
    if (j < _bind) {
      if (cmp(arr.buf[arr.start + j | 0], pivot) < 0) {
        if (i !== j) {
          _M0MPC15array12MutArrayView4swapGUsssEE(arr, i, j);
          _tmp = j + 1 | 0;
          _tmp$2 = i + 1 | 0;
          _tmp$3 = false;
          continue;
        } else {
          _tmp = j + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue;
        }
      } else {
        _tmp = j + 1 | 0;
        continue;
      }
    } else {
      _M0MPC15array12MutArrayView4swapGUsssEE(arr, i, (arr.end - arr.start | 0) - 1 | 0);
      return { _0: i, _1: partitioned };
    }
  }
}
function _M0FPB28fixed__try__bubble__sort__byGUsssEE(arr, cmp) {
  const _bind = arr.end - arr.start | 0;
  let _tmp = 1;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp;
    const tries = _tmp$2;
    if (i < _bind) {
      let sorted;
      let _tmp$3 = i;
      let _tmp$4 = true;
      while (true) {
        const j = _tmp$3;
        const sorted$2 = _tmp$4;
        if (j > 0 && cmp(arr.buf[arr.start + (j - 1 | 0) | 0], arr.buf[arr.start + j | 0]) > 0) {
          _M0MPC15array12MutArrayView4swapGUsssEE(arr, j, j - 1 | 0);
          _tmp$3 = j - 1 | 0;
          _tmp$4 = false;
          continue;
        } else {
          sorted = sorted$2;
          break;
        }
      }
      if (!sorted) {
        const tries$2 = tries + 1 | 0;
        if (tries$2 > 8) {
          return false;
        }
        _tmp = i + 1 | 0;
        _tmp$2 = tries$2;
        continue;
      } else {
        _tmp = i + 1 | 0;
        continue;
      }
    } else {
      return true;
    }
  }
}
function _M0FPB22fixed__quick__sort__byGUsssEE(arr, cmp, pred, limit) {
  let _tmp = limit;
  let _tmp$2 = arr;
  let _tmp$3 = pred;
  let _tmp$4 = true;
  let _tmp$5 = true;
  while (true) {
    const limit$2 = _tmp;
    const arr$2 = _tmp$2;
    const pred$2 = _tmp$3;
    const was_partitioned = _tmp$4;
    const balanced = _tmp$5;
    const len = arr$2.end - arr$2.start | 0;
    if (len <= 16) {
      if (len >= 2) {
        _M0FPB23fixed__bubble__sort__byGUsssEE(arr$2, cmp);
      }
      return undefined;
    }
    if (limit$2 === 0) {
      _M0FPB21fixed__heap__sort__byGUsssEE(arr$2, cmp);
      return undefined;
    }
    const _bind = _M0FPB24fixed__choose__pivot__byGUsssEE(arr$2, cmp);
    const _pivot_index = _bind._0;
    const _likely_sorted = _bind._1;
    if (was_partitioned && (balanced && _likely_sorted)) {
      if (_M0FPB28fixed__try__bubble__sort__byGUsssEE(arr$2, cmp)) {
        return undefined;
      }
    }
    const _bind$2 = _M0FPB20fixed__partition__byGUsssEE(arr$2, cmp, _pivot_index);
    const _pivot = _bind$2._0;
    const _partitioned = _bind$2._1;
    const _p = len - _pivot | 0;
    const balanced$2 = (_pivot > _p ? _p : _pivot) >= (len / 8 | 0);
    const limit$3 = !balanced$2 ? limit$2 - 1 | 0 : limit$2;
    if (pred$2 === undefined) {
    } else {
      const _Some = pred$2;
      const _p$2 = _Some;
      if (cmp(_p$2, arr$2.buf[arr$2.start + _pivot | 0]) === 0) {
        let i;
        let _tmp$6 = _pivot;
        while (true) {
          const i$2 = _tmp$6;
          if (i$2 < len && cmp(_p$2, arr$2.buf[arr$2.start + i$2 | 0]) === 0) {
            _tmp$6 = i$2 + 1 | 0;
            continue;
          } else {
            i = i$2;
            break;
          }
        }
        _tmp = limit$3;
        _tmp$2 = _M0MPC15array12MutArrayView5sliceGUsssEE(arr$2, i, len);
        _tmp$4 = _partitioned;
        _tmp$5 = balanced$2;
        continue;
      }
    }
    const left = _M0MPC15array12MutArrayView5sliceGUsssEE(arr$2, 0, _pivot);
    const right = _M0MPC15array12MutArrayView5sliceGUsssEE(arr$2, _pivot + 1 | 0, len);
    if ((left.end - left.start | 0) < (right.end - right.start | 0)) {
      _M0FPB22fixed__quick__sort__byGUsssEE(left, cmp, pred$2, limit$3);
      _tmp = limit$3;
      _tmp$2 = right;
      _tmp$3 = arr$2.buf[arr$2.start + _pivot | 0];
      _tmp$4 = _partitioned;
      _tmp$5 = balanced$2;
      continue;
    } else {
      _M0FPB22fixed__quick__sort__byGUsssEE(right, cmp, arr$2.buf[arr$2.start + _pivot | 0], limit$3);
      _tmp = limit$3;
      _tmp$2 = left;
      _tmp$4 = _partitioned;
      _tmp$5 = balanced$2;
      continue;
    }
  }
}
function _M0MPC15array12MutArrayView8sort__byGUsssEE(self, cmp) {
  _M0FPB22fixed__quick__sort__byGUsssEE(self, cmp, undefined, _M0FPB17fixed__get__limit(self.end - self.start | 0));
}
function _M0MPC15array5Array8sort__byGUsssEE(self, cmp) {
  const _bind = self.len;
  _M0MPC15array12MutArrayView8sort__byGUsssEE(new _M0TPB12MutArrayViewGUsssEE(self.buf, 0, _bind), cmp);
}
function _M0MPC15array5Array12unsafe__blitGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGRPC16string10StringViewEE(dst.buf, dst_offset, src.buf, src_offset, len);
}
function _M0MPC15array5Array17reserve__capacityGsE(self, capacity) {
  if (_M0MPC15array5Array8capacityGRP39XinOrigin10moon__warc8validate10DiagnosticE(self) >= capacity) {
    return undefined;
  }
  _M0MPC15array5Array14resize__bufferGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, capacity);
}
function _M0MPC15array5Array6appendGsE(self, other) {
  const src = other.buf;
  const src_offset = other.start;
  const append_len = other.end - other.start | 0;
  const old_len = self.len;
  const new_len = old_len + append_len | 0;
  if (new_len >= old_len) {
    if (new_len > self.buf.length) {
      _M0MPC15array5Array7reallocGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, new_len);
    }
    self.len = new_len;
    _M0MPB18UninitializedArray12unsafe__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(self.buf, old_len, src, src_offset, append_len);
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array3popGsE(self) {
  const len = self.len;
  if (len === 0) {
    return undefined;
  } else {
    const index = len - 1 | 0;
    const v = self.buf[index];
    self.len = index;
    return v;
  }
}
function _M0MPC15array5Array4copyGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE(self) {
  const len = self.len;
  if (len === 0) {
    return new _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE([], 0);
  }
  const arr = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(len);
  _M0MPC15array5Array12unsafe__blitGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE(arr, 0, self, 0, len);
  return arr;
}
function _M0IPC15array5ArrayPB3Add3addGsE(self, other) {
  const len_self = self.len;
  const len_other = other.len;
  if (len_self === 0) {
    return _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(other.buf, len_other, len_other, 0, 0);
  } else {
    const result = _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(self.buf, len_self + len_other | 0, len_self, 0, 0);
    _M0MPB18UninitializedArray12unsafe__blitGRP39XinOrigin10moon__warc8validate10DiagnosticE(result.buf, len_self, other.buf, 0, len_other);
    return result;
  }
}
function _M0MPC15array5Array14rev__in__placeGsE(self) {
  const len = self.len;
  const _bind = len / 2 | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const temp = self.buf[i];
      const _bind$2 = (len - i | 0) - 1 | 0;
      const _bind$3 = self.buf[_bind$2];
      self.buf[i] = _bind$3;
      const _bind$4 = (len - i | 0) - 1 | 0;
      self.buf[_bind$4] = temp;
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC15array5Array10push__iterGsE(self, iter) {
  const _bind = iter.size_hint;
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _n = _Some;
    _M0MPC15array5Array17reserve__capacityGsE(self, self.len + _n | 0);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGUsRPC14json4JsonEE(iter);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(self, _x);
      continue;
    }
  }
}
function _M0MPC15array5Array4joinGRPC16string10StringViewE(self, separator) {
  return _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(new _M0TPB9ArrayViewGRPC16string10StringViewE(self.buf, 0, self.len), separator);
}
function _M0MPC15array5Array4joinGsE(self, separator) {
  return _M0MPC15array9ArrayView4joinGsE(new _M0TPB9ArrayViewGsE(self.buf, 0, self.len), separator);
}
function _M0FPC15float35f2s__multiple__of__power__of__5__32(value, p) {
  let value$2 = value;
  let count = 0;
  while (true) {
    if (((value$2 >>> 0) % (5 >>> 0) | 0) === 0) {
      value$2 = (value$2 >>> 0) / (5 >>> 0) | 0;
      count = count + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return count >= p;
}
function _M0FPC15float19f2s__mul__shift__32(m, factor, shift) {
  const factor_lo = BigInt.asUintN(64, factor & 4294967295n);
  const factor_hi = BigInt.asUintN(64, BigInt.asUintN(64, factor) >> BigInt(32 & 63));
  const m$2 = BigInt.asUintN(64, BigInt(m >>> 0));
  const bits0 = BigInt.asUintN(64, m$2 * factor_lo);
  const bits1 = BigInt.asUintN(64, m$2 * factor_hi);
  const sum = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, bits0) >> BigInt(32 & 63)) + bits1);
  return Number(BigInt.asUintN(32, BigInt.asUintN(64, BigInt.asUintN(64, sum) >> BigInt(shift - 32 & 63)))) | 0;
}
function _M0FPC15float30f2s__mul__pow5__inv__div__pow2(m, q, j) {
  return _M0FPC15float19f2s__mul__shift__32(m, BigInt.asUintN(64, (q >>> 0 < _M0FPC15float25f2s__pow5__inv__split__hi.length ? _M0FPC15float25f2s__pow5__inv__split__hi[q] : $oob()) + 1n), j);
}
function _M0FPC15float25f2s__mul__pow5__div__pow2(m, i, j) {
  return _M0FPC15float19f2s__mul__shift__32(m, i >>> 0 < _M0FPC15float20f2s__pow5__split__hi.length ? _M0FPC15float20f2s__pow5__split__hi[i] : $oob(), j);
}
function _M0FPC15float3f2d(ieee_mantissa, ieee_exponent) {
  const e2 = ieee_exponent === 0 ? -151 : ((ieee_exponent - 127 | 0) - 23 | 0) - 2 | 0;
  const m2 = ieee_exponent === 0 ? ieee_mantissa : 8388608 | ieee_mantissa;
  const even = (m2 & 1) === 0;
  const mv = Math.imul(4, m2) | 0;
  const mp = ((Math.imul(4, m2) | 0) >>> 0) + (2 >>> 0) | 0;
  const mm_shift = ieee_mantissa !== 0 || ieee_exponent >>> 0 <= 1 >>> 0 ? 1 : 0;
  const mm = ((((Math.imul(4, m2) | 0) >>> 0) - (1 >>> 0) | 0) >>> 0) - (mm_shift >>> 0) | 0;
  let vr = 0;
  let vp = 0;
  let vm = 0;
  let e10 = 0;
  let vm_is_trailing_zeros = false;
  let vr_is_trailing_zeros = false;
  let last_removed_digit = 0;
  if (e2 >= 0) {
    const q = Math.imul(e2, 78913) >> 18;
    e10 = q;
    const k = (61 + ((Math.imul(q, 1217359) >> 19) + 1 | 0) | 0) - 1 | 0;
    const i = ((-e2 | 0) + q | 0) + k | 0;
    vr = _M0FPC15float30f2s__mul__pow5__inv__div__pow2(mv, q, i);
    vp = _M0FPC15float30f2s__mul__pow5__inv__div__pow2(mp, q, i);
    vm = _M0FPC15float30f2s__mul__pow5__inv__div__pow2(mm, q, i);
    if (q !== 0 && ((((vp >>> 0) - (1 >>> 0) | 0) >>> 0) / (10 >>> 0) | 0) >>> 0 <= ((vm >>> 0) / (10 >>> 0) | 0) >>> 0) {
      const _p = q - 1 | 0;
      const l = (61 + ((Math.imul(_p, 1217359) >> 19) + 1 | 0) | 0) - 1 | 0;
      last_removed_digit = (_M0FPC15float30f2s__mul__pow5__inv__div__pow2(mv, q - 1 | 0, (((-e2 | 0) + q | 0) - 1 | 0) + l | 0) >>> 0) % (10 >>> 0) | 0;
    }
    if (q <= 9) {
      if (((mv >>> 0) % (5 >>> 0) | 0) === 0) {
        vr_is_trailing_zeros = _M0FPC15float35f2s__multiple__of__power__of__5__32(mv, q);
      } else {
        if (even) {
          vm_is_trailing_zeros = _M0FPC15float35f2s__multiple__of__power__of__5__32(mm, q);
        } else {
          if (_M0FPC15float35f2s__multiple__of__power__of__5__32(mp, q)) {
            vp = (vp >>> 0) - (1 >>> 0) | 0;
          }
        }
      }
    }
  } else {
    const _p = -e2 | 0;
    const q = Math.imul(_p, 732923) >> 20;
    e10 = q + e2 | 0;
    const i = (-e2 | 0) - q | 0;
    const k = ((Math.imul(i, 1217359) >> 19) + 1 | 0) - 61 | 0;
    let j = q - k | 0;
    vr = _M0FPC15float25f2s__mul__pow5__div__pow2(mv, i, j);
    vp = _M0FPC15float25f2s__mul__pow5__div__pow2(mp, i, j);
    vm = _M0FPC15float25f2s__mul__pow5__div__pow2(mm, i, j);
    if (q !== 0 && ((((vp >>> 0) - (1 >>> 0) | 0) >>> 0) / (10 >>> 0) | 0) >>> 0 <= ((vm >>> 0) / (10 >>> 0) | 0) >>> 0) {
      const _tmp = q - 1 | 0;
      const _p$2 = i + 1 | 0;
      j = _tmp - (((Math.imul(_p$2, 1217359) >> 19) + 1 | 0) - 61 | 0) | 0;
      last_removed_digit = (_M0FPC15float25f2s__mul__pow5__div__pow2(mv, i + 1 | 0, j) >>> 0) % (10 >>> 0) | 0;
    }
    if (q <= 1) {
      vr_is_trailing_zeros = true;
      if (even) {
        vm_is_trailing_zeros = mm_shift === 1;
      } else {
        vp = (vp >>> 0) - (1 >>> 0) | 0;
      }
    } else {
      if (q < 31) {
        const _p$2 = q - 1 | 0;
        vr_is_trailing_zeros = (mv & ((1 << _p$2 >>> 0) - (1 >>> 0) | 0)) === 0;
      }
    }
  }
  let removed = 0;
  let output;
  if (vm_is_trailing_zeros || vr_is_trailing_zeros) {
    while (true) {
      if (((vp >>> 0) / (10 >>> 0) | 0) >>> 0 > ((vm >>> 0) / (10 >>> 0) | 0) >>> 0) {
        vm_is_trailing_zeros = vm_is_trailing_zeros && ((vm >>> 0) - ((Math.imul((vm >>> 0) / (10 >>> 0) | 0, 10) | 0) >>> 0) | 0) === 0;
        vr_is_trailing_zeros = vr_is_trailing_zeros && last_removed_digit === 0;
        last_removed_digit = (vr >>> 0) % (10 >>> 0) | 0;
        vr = (vr >>> 0) / (10 >>> 0) | 0;
        vp = (vp >>> 0) / (10 >>> 0) | 0;
        vm = (vm >>> 0) / (10 >>> 0) | 0;
        removed = removed + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    if (vm_is_trailing_zeros) {
      while (true) {
        if (((vm >>> 0) % (10 >>> 0) | 0) === 0) {
          vr_is_trailing_zeros = vr_is_trailing_zeros && last_removed_digit === 0;
          last_removed_digit = (vr >>> 0) % (10 >>> 0) | 0;
          vr = (vr >>> 0) / (10 >>> 0) | 0;
          vm = (vm >>> 0) / (10 >>> 0) | 0;
          removed = removed + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    if (vr_is_trailing_zeros && (last_removed_digit === 5 && ((vr >>> 0) % (2 >>> 0) | 0) === 0)) {
      last_removed_digit = 4;
    }
    output = vr === vm && (!even || !vm_is_trailing_zeros) || last_removed_digit >>> 0 >= 5 >>> 0 ? (vr >>> 0) + (1 >>> 0) | 0 : vr;
  } else {
    while (true) {
      if (((vp >>> 0) / (10 >>> 0) | 0) >>> 0 > ((vm >>> 0) / (10 >>> 0) | 0) >>> 0) {
        last_removed_digit = (vr >>> 0) % (10 >>> 0) | 0;
        vr = (vr >>> 0) / (10 >>> 0) | 0;
        vp = (vp >>> 0) / (10 >>> 0) | 0;
        vm = (vm >>> 0) / (10 >>> 0) | 0;
        removed = removed + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    output = vr === vm || last_removed_digit >>> 0 >= 5 >>> 0 ? (vr >>> 0) + (1 >>> 0) | 0 : vr;
  }
  return new _M0TPC15float17FloatingDecimal32(output, e10 + removed | 0);
}
function _M0IPC15float5FloatPB4Show10to__string(self) {
  const bits = $i32_reinterpret_f32(self);
  const ieee_mantissa = bits & 8388607;
  const ieee_exponent = bits >>> 23 & 255;
  if (ieee_exponent === 255 || ieee_exponent === 0 && ieee_mantissa === 0) {
    return String(self);
  }
  const decimal = _M0FPC15float3f2d(ieee_mantissa, ieee_exponent);
  let mantissa = decimal.mantissa;
  let exponent = decimal.exponent;
  while (true) {
    if (((mantissa >>> 0) % (10 >>> 0) | 0) === 0) {
      mantissa = (mantissa >>> 0) / (10 >>> 0) | 0;
      exponent = exponent + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const digits = _M0MPC14uint4UInt18to__string_2einner(mantissa, 10);
  const length = digits.length;
  const exp = (exponent + length | 0) - 1 | 0;
  const builder = _M0MPB13StringBuilder21StringBuilder_2einner(16);
  if ((bits >>> 31 | 0) !== 0) {
    _M0IPB13StringBuilderPB6Logger11write__char(builder, 45);
  }
  if (!(exp >= -6 && exp < 21)) {
    _M0IPB13StringBuilderPB6Logger11write__view(builder, _M0MPC16string6String21clamped__view_2einner(digits, 0, _M0IPC15float5FloatPB4Show10to__stringN6constrS2215));
    if (length > 1) {
      const _p = ".";
      builder.val = `${builder.val}${_p}`;
      _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(builder, _M0MPC16string6String21clamped__view_2einner(digits, 1, undefined));
    }
    const _p = "e";
    builder.val = `${builder.val}${_p}`;
    _M0MPB13StringBuilder13write__objectGcE(builder, exp < 0 ? 45 : 43);
    _M0MPB13StringBuilder13write__objectGiE(builder, exp < 0 ? -exp | 0 : exp);
  } else {
    if (exp < 0) {
      const _p = "0.";
      builder.val = `${builder.val}${_p}`;
      const _bind = (-exp | 0) - 1 | 0;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          _M0IPB13StringBuilderPB6Logger11write__char(builder, 48);
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      builder.val = `${builder.val}${digits}`;
    } else {
      if ((exp + 1 | 0) >= length) {
        builder.val = `${builder.val}${digits}`;
        const _bind = (exp + 1 | 0) - length | 0;
        let _tmp = 0;
        while (true) {
          const _ = _tmp;
          if (_ < _bind) {
            _M0IPB13StringBuilderPB6Logger11write__char(builder, 48);
            _tmp = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      } else {
        _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(builder, _M0MPC16string6String21clamped__view_2einner(digits, 0, exp + 1 | 0));
        const _p = ".";
        builder.val = `${builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(builder, _M0MPC16string6String21clamped__view_2einner(digits, exp + 1 | 0, undefined));
      }
    }
  }
  return builder.val;
}
function _M0FPC16buffer24buffer__growth__capacity(current, len, required) {
  if (required < len) {
    $panic("Buffer capacity overflow");
  }
  const start = current > 8 ? current : 8;
  let _tmp = start;
  while (true) {
    const space = _tmp;
    if (space >= required) {
      return space;
    }
    const next = Math.imul(space, 2) | 0;
    if (next <= space) {
      return required;
    }
    _tmp = next;
    continue;
  }
}
function _M0MPC16buffer6Buffer4grow(self, required) {
  const new_capacity = _M0FPC16buffer24buffer__growth__capacity(self.data.length, self.len, required);
  const new_data = _M0MPC15array10FixedArray23make__and__blit_2einnerGyE(self.data, new_capacity, 0, self.len, 0, 0);
  self.data = new_data;
}
function _M0MPC16buffer6Buffer14Buffer_2einner(capacity) {
  if (capacity >= 0) {
    const data = $makebytes(capacity, 0);
    return new _M0TPC16buffer6Buffer(data, 0);
  } else {
    return $panic("capacity must be non-negative");
  }
}
function _M0MPC16buffer6Buffer17write__char__utf8(buf, value) {
  const code = value;
  if (code >>> 0 < 128 >>> 0) {
    if (buf.len >= buf.data.length) {
      _M0MPC16buffer6Buffer4grow(buf, buf.len + 1 | 0);
    }
    const _tmp = buf.data;
    const _tmp$2 = buf.len;
    const _p = code & 127 | 0;
    _tmp[_tmp$2] = _p & 255;
    buf.len = buf.len + 1 | 0;
    return;
  } else {
    if (code >>> 0 < 2048 >>> 0) {
      if ((buf.data.length - buf.len | 0) < 2) {
        _M0MPC16buffer6Buffer4grow(buf, buf.len + 2 | 0);
      }
      const data = buf.data;
      const offset = buf.len;
      const _p = code >>> 6 & 31 | 192;
      data[offset] = _p & 255;
      const _tmp = offset + 1 | 0;
      const _p$2 = code & 63 | 128;
      data[_tmp] = _p$2 & 255;
      buf.len = buf.len + 2 | 0;
      return;
    } else {
      if (code >>> 0 < 65536 >>> 0) {
        if ((buf.data.length - buf.len | 0) < 3) {
          _M0MPC16buffer6Buffer4grow(buf, buf.len + 3 | 0);
        }
        const data = buf.data;
        const offset = buf.len;
        const _p = code >>> 12 & 15 | 224;
        data[offset] = _p & 255;
        const _tmp = offset + 1 | 0;
        const _p$2 = code >>> 6 & 63 | 128;
        data[_tmp] = _p$2 & 255;
        const _tmp$2 = offset + 2 | 0;
        const _p$3 = code & 63 | 128;
        data[_tmp$2] = _p$3 & 255;
        buf.len = buf.len + 3 | 0;
        return;
      } else {
        if (code >>> 0 < 1114112 >>> 0) {
          if ((buf.data.length - buf.len | 0) < 4) {
            _M0MPC16buffer6Buffer4grow(buf, buf.len + 4 | 0);
          }
          const data = buf.data;
          const offset = buf.len;
          const _p = code >>> 18 & 7 | 240;
          data[offset] = _p & 255;
          const _tmp = offset + 1 | 0;
          const _p$2 = code >>> 12 & 63 | 128;
          data[_tmp] = _p$2 & 255;
          const _tmp$2 = offset + 2 | 0;
          const _p$3 = code >>> 6 & 63 | 128;
          data[_tmp$2] = _p$3 & 255;
          const _tmp$3 = offset + 3 | 0;
          const _p$4 = code & 63 | 128;
          data[_tmp$3] = _p$4 & 255;
          buf.len = buf.len + 4 | 0;
          return;
        } else {
          $panic("Char out of range");
          return;
        }
      }
    }
  }
}
function _M0MPC16buffer6Buffer19write__string__utf8(buf, string) {
  const _bind = string.str;
  const _bind$2 = string.start;
  const _bind$3 = string.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$4;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      _M0MPC16buffer6Buffer17write__char__utf8(buf, _decoded_char);
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC16buffer6Buffer16write__bytesview(self, value) {
  const val_len = value.end - value.start | 0;
  const required = self.len + val_len | 0;
  if (required > self.data.length || required < self.len) {
    _M0MPC16buffer6Buffer4grow(self, required);
  }
  _M0MPC15array10FixedArray17blit__from__bytes(self.data, self.len, value.buf, value.start, value.end - value.start | 0);
  self.len = self.len + val_len | 0;
}
function _M0MPC16buffer6Buffer12write__bytes(self, value) {
  _M0MPC16buffer6Buffer16write__bytesview(self, value);
}
function _M0MPC16buffer6Buffer11write__byte(self, value) {
  if (self.len >= self.data.length) {
    _M0MPC16buffer6Buffer4grow(self, self.len + 1 | 0);
  }
  self.data[self.len] = value;
  self.len = self.len + 1 | 0;
}
function _M0MPC16buffer6Buffer9to__bytes(self) {
  const _bind = self.data;
  const _bind$2 = self.len;
  const _bind$3 = _bind.length;
  const _bind$4 = 0 > _bind$3 ? _bind$3 : 0;
  const _bind$5 = _bind$2 < 0 ? 0 : _bind$2 > _bind$3 ? _bind$3 : _bind$2;
  return _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind, _bind$4, _bind$5 > _bind$4 ? _bind$5 : _bind$4));
}
function _M0MPC14json4Json4JsonGdE(value) {
  return _M0IPC16double6DoublePC14json6ToJson8to__json(value);
}
function _M0IPC16double6DoublePC14json6ToJson8to__json(self) {
  if (self !== self) {
    const _p = "NaN";
    return new _M0DTPC14json4Json6String(_p);
  } else {
    if (self > $i64_reinterpret_f64(9218868437227405311n)) {
      const _p = "Infinity";
      return new _M0DTPC14json4Json6String(_p);
    } else {
      if (self < $i64_reinterpret_f64(18442240474082181119n)) {
        const _p = "-Infinity";
        return new _M0DTPC14json4Json6String(_p);
      } else {
        const _p = undefined;
        return new _M0DTPC14json4Json6Number(self, _p);
      }
    }
  }
}
function _M0FPC14json20need__escape__scalar(str, escape_slash, start, end) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      const _p = str.charCodeAt(i);
      if (_p === 34 || (_p === 92 || (_p < 32 || escape_slash && _p === 47))) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPC14json12need__escape(str, escape_slash) {
  return _M0FPC14json20need__escape__scalar(str, escape_slash, 0, str.length);
}
function _M0FPC14json13write__escape(buf, code) {
  switch (code) {
    case 34: {
      const _p = "\\\"";
      buf.val = `${buf.val}${_p}`;
      return;
    }
    case 92: {
      const _p$2 = "\\\\";
      buf.val = `${buf.val}${_p$2}`;
      return;
    }
    case 47: {
      const _p$3 = "\\/";
      buf.val = `${buf.val}${_p$3}`;
      return;
    }
    case 10: {
      const _p$4 = "\\n";
      buf.val = `${buf.val}${_p$4}`;
      return;
    }
    case 13: {
      const _p$5 = "\\r";
      buf.val = `${buf.val}${_p$5}`;
      return;
    }
    case 8: {
      const _p$6 = "\\b";
      buf.val = `${buf.val}${_p$6}`;
      return;
    }
    case 9: {
      const _p$7 = "\\t";
      buf.val = `${buf.val}${_p$7}`;
      return;
    }
    case 12: {
      const _p$8 = "\\f";
      buf.val = `${buf.val}${_p$8}`;
      return;
    }
    default: {
      const _p$9 = "\\u00";
      buf.val = `${buf.val}${_p$9}`;
      _M0MPB13StringBuilder13write__objectGsE(buf, _M0MPC14byte4Byte7to__hex(code & 255));
      return;
    }
  }
}
function _M0FPC14json14write__escaped(buf, str, escape_slash) {
  if (!_M0FPC14json12need__escape(str, escape_slash)) {
    buf.val = `${buf.val}${str}`;
    return undefined;
  }
  const _bind = str.length;
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp;
    const run_start = _tmp$2;
    if (i < _bind) {
      const code = str.charCodeAt(i);
      if (code === 34 || (code === 92 || (code < 32 || escape_slash && code === 47))) {
        _M0IPB13StringBuilderPB6Logger11write__view(buf, _M0MPC16string6String19exact__view_2einner(str, run_start, i));
        _M0FPC14json13write__escape(buf, code);
        _tmp = i + 1 | 0;
        _tmp$2 = i + 1 | 0;
        continue;
      } else {
        _tmp = i + 1 | 0;
        continue;
      }
    } else {
      _M0IPB13StringBuilderPB6Logger11write__view(buf, _M0MPC16string6String19exact__view_2einner(str, run_start, undefined));
      return;
    }
  }
}
function _M0FPC14json13write__indent(buf, cache, level, indent) {
  while (true) {
    if (cache.len <= level) {
      if (cache.len >= 1) {
        const _bind = cache.len - 1 | 0;
        const _last = cache.buf[_bind];
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(cache, `${_last}${_M0MPC16string6String6repeat(" ", indent)}`);
      } else {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(cache, "\n");
      }
      continue;
    } else {
      break;
    }
  }
  if (level < 0 || level >= cache.len) {
    $panic();
  }
  const _p = cache.buf[level];
  buf.val = `${buf.val}${_p}`;
}
function _M0MPC14json4Json17stringify_2einner(self, escape_slash, indent, replacer) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const indent_cache = new _M0TPB5ArrayGsE([], 0);
  const stack = new _M0TPB5ArrayGRPC14json10WriteFrameE([], 0);
  let depth = 0;
  let _tmp = self;
  _L: while (true) {
    const x = _tmp;
    if (x === undefined) {
      if (stack.len === 0) {
        break;
      } else {
        const _bind = stack.len - 1 | 0;
        const _x = stack.buf[_bind];
        if (_x.$tag === 0) {
          const _Array = _x;
          const _arr = _Array._0;
          const _i = _Array._1;
          if (_i < _arr.len) {
            if (_i < 0 || _i >= _arr.len) {
              $panic();
            }
            const element = _arr.buf[_i];
            _Array._1 = _i + 1 | 0;
            if (_i > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
            }
            _tmp = element;
            continue;
          } else {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGsE(stack);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 93);
            _tmp = undefined;
            continue;
          }
        } else {
          const _Object = _x;
          const _iterator = _Object._0;
          const _first = _Object._1;
          const _bind$2 = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_iterator);
          if (_bind$2 === undefined) {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGsE(stack);
            if (indent > 0 && !_first) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 125);
            _tmp = undefined;
            continue;
          } else {
            const _Some = _bind$2;
            const _x$2 = _Some;
            const _k = _x$2._0;
            const _v = _x$2._1;
            let v2 = _v;
            if (replacer === undefined) {
            } else {
              const _Some$2 = replacer;
              const _replacer = _Some$2;
              const _func = _replacer.f;
              const _bind$3 = _func(_k, _v);
              if (_bind$3 === undefined) {
                _tmp = undefined;
                continue;
              } else {
                const _Some$3 = _bind$3;
                const _v$2 = _Some$3;
                v2 = _v$2;
              }
            }
            if (!_first) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
            }
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0FPC14json14write__escaped(buf, _k, escape_slash);
            const _p = "\":";
            buf.val = `${buf.val}${_p}`;
            if (indent > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
            }
            _Object._1 = false;
            _tmp = v2;
            continue;
          }
        }
      }
    } else {
      const _Some = x;
      const _value = _Some;
      switch (_value.$tag) {
        case 6: {
          const _Object = _value;
          const _members = _Object._0;
          if (_members.size === 0) {
            const _p = "{}";
            buf.val = `${buf.val}${_p}`;
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 123);
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(stack, new _M0DTPC14json10WriteFrame6Object(_M0MPB3Map4iterGsRPC14json4JsonE(_members), true));
          }
          break;
        }
        case 5: {
          const _Array = _value;
          const _arr = _Array._0;
          if (_arr.len === 0) {
            const _p = "[]";
            buf.val = `${buf.val}${_p}`;
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 91);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(stack, new _M0DTPC14json10WriteFrame5Array(_arr, 0));
          }
          break;
        }
        case 4: {
          const _String = _value;
          const _s = _String._0;
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          _M0FPC14json14write__escaped(buf, _s, escape_slash);
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          break;
        }
        case 3: {
          const _Number = _value;
          const _n = _Number._0;
          const _repr = _Number._1;
          if (_repr === undefined) {
            if (!(_n >= _M0FPB18double__min__value && _n <= _M0FPB18double__max__value)) {
              _tmp = _M0MPC14json4Json4JsonGdE(_n);
              continue _L;
            } else {
              _M0MPB13StringBuilder13write__objectGdE(buf, _n);
            }
          } else {
            const _Some$2 = _repr;
            const _r = _Some$2;
            buf.val = `${buf.val}${_r}`;
          }
          break;
        }
        case 1: {
          const _p = "true";
          buf.val = `${buf.val}${_p}`;
          break;
        }
        case 2: {
          const _p$2 = "false";
          buf.val = `${buf.val}${_p$2}`;
          break;
        }
        default: {
          const _p$3 = "null";
          buf.val = `${buf.val}${_p$3}`;
        }
      }
      _tmp = undefined;
      continue;
    }
  }
  return buf.val;
}
function _M0MPC15debug4Repr8children(self) {
  let value;
  _L: {
    _L$2: {
      switch (self.$tag) {
        case 0: {
          break _L$2;
        }
        case 1: {
          break _L$2;
        }
        case 2: {
          break _L$2;
        }
        case 3: {
          break _L$2;
        }
        case 4: {
          break _L$2;
        }
        case 5: {
          break _L$2;
        }
        case 6: {
          break _L$2;
        }
        case 15: {
          break _L$2;
        }
        case 17: {
          break _L$2;
        }
        case 7: {
          const _Tuple = self;
          const _xs = _Tuple._0;
          return _xs;
        }
        case 8: {
          const _Array = self;
          const _xs$2 = _Array._0;
          return _xs$2;
        }
        case 9: {
          const _Record = self;
          const _xs$3 = _Record._0;
          return _xs$3;
        }
        case 10: {
          const _Enum = self;
          const _xs$4 = _Enum._1;
          return _xs$4;
        }
        case 11: {
          const _Map = self;
          const _xs$5 = _Map._0;
          return _xs$5;
        }
        case 14: {
          const _Opaque = self;
          const _value = _Opaque._1;
          value = _value;
          break _L;
        }
        case 12: {
          const _RecordField = self;
          const _value$2 = _RecordField._1;
          value = _value$2;
          break _L;
        }
        case 13: {
          const _EnumLabeledArg = self;
          const _value$3 = _EnumLabeledArg._1;
          value = _value$3;
          break _L;
        }
        default: {
          const _MapEntry = self;
          const _key = _MapEntry._0;
          const _value$4 = _MapEntry._1;
          return new _M0TPB5ArrayGRPC15debug4ReprE([_key, _value$4], 2);
        }
      }
    }
    return new _M0TPB5ArrayGRPC15debug4ReprE([], 0);
  }
  return new _M0TPB5ArrayGRPC15debug4ReprE([value], 1);
}
function _M0MPC15debug4Repr14with__children(self, children) {
  _L: {
    switch (self.$tag) {
      case 0: {
        break _L;
      }
      case 1: {
        break _L;
      }
      case 2: {
        break _L;
      }
      case 3: {
        break _L;
      }
      case 4: {
        break _L;
      }
      case 5: {
        break _L;
      }
      case 6: {
        break _L;
      }
      case 15: {
        break _L;
      }
      case 17: {
        break _L;
      }
      case 7: {
        return new _M0DTPC15debug4Repr5Tuple(children);
      }
      case 8: {
        return new _M0DTPC15debug4Repr5Array(children);
      }
      case 9: {
        return new _M0DTPC15debug4Repr6Record(children);
      }
      case 10: {
        const _Enum = self;
        const _name = _Enum._0;
        return new _M0DTPC15debug4Repr4Enum(_name, children);
      }
      case 11: {
        return new _M0DTPC15debug4Repr3Map(children);
      }
      case 12: {
        const _RecordField = self;
        const _name$2 = _RecordField._0;
        if (children.len === 1) {
          const _value = children.buf[0];
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _value);
        } else {
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 13: {
        const _EnumLabeledArg = self;
        const _label = _EnumLabeledArg._0;
        if (children.len === 1) {
          const _value = children.buf[0];
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _value);
        } else {
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 16: {
        if (children.len === 2) {
          const _key = children.buf[0];
          const _value = children.buf[1];
          return new _M0DTPC15debug4Repr8MapEntry(_key, _value);
        } else {
          return new _M0DTPC15debug4Repr8MapEntry(_M0DTPC15debug4Repr7Omitted__, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      default: {
        const _Opaque = self;
        const _name$3 = _Opaque._0;
        if (children.len === 1) {
          const _value = children.buf[0];
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _value);
        } else {
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _M0DTPC15debug4Repr7Omitted__);
        }
      }
    }
  }
  return self;
}
function _M0MPC15debug4Repr4ctor(name, args) {
  const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(args.len);
  const _p$2 = args.len;
  const _p$3 = args.buf;
  let _tmp = 0;
  while (true) {
    const _p$4 = _tmp;
    if (_p$4 < _p$2) {
      const _p$5 = _p$3[_p$4];
      const _p$6 = _p$5._0;
      const _p$7 = _p$5._1;
      let _p$8;
      if (_p$6 === undefined) {
        _p$8 = _p$7;
      } else {
        const _p$9 = _p$6;
        const _p$10 = _p$9;
        _p$8 = new _M0DTPC15debug4Repr14EnumLabeledArg(_p$10, _p$7);
      }
      _p.buf[_p$4] = _p$8;
      _tmp = _p$4 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC15debug4Repr4Enum(name, _p);
}
function _M0MPC15debug4Repr7shallow(self) {
  return _M0MPC15debug4Repr14with__children(self, new _M0TPB5ArrayGRPC15debug4ReprE([], 0));
}
function _M0IPC15debug13ContentParensPB3Add3add(self, other) {
  return new _M0TPC15debug13ContentParens(self.size + other.size | 0, _M0IPC15array5ArrayPB3Add3addGsE(self.lines, other.lines));
}
function _M0FPC15debug14empty__content() {
  return new _M0TPC15debug7Content(0, new _M0TPB5ArrayGsE([], 0), false);
}
function _M0FPC15debug8verbatim(x) {
  return new _M0TPC15debug13ContentParens(1, new _M0TPB5ArrayGsE([x], 1));
}
function _M0FPC15debug15content__parens(size, lines) {
  return new _M0TPC15debug13ContentParens(size, lines);
}
function _M0FPC15debug12leaf_2einner(x, needs_parens) {
  return new _M0TPC15debug7Content(1, new _M0TPB5ArrayGsE([x], 1), needs_parens);
}
function _M0FPC15debug11with__lines(r, f) {
  return new _M0TPC15debug13ContentParens(r.size, f(r.lines));
}
function _M0MPC15debug7Content20with__lines__content(r, f) {
  return new _M0TPC15debug7Content(r.size, f(r.lines), r.needs_parens);
}
function _M0FPC15debug15surround__lines(start, finish, lines) {
  if (lines.len === 0) {
    return new _M0TPB5ArrayGsE([`${start}${finish}`], 1);
  } else {
    if (lines.len === 1) {
      const _item = lines.buf[0];
      return new _M0TPB5ArrayGsE([`${start}${_item}${finish}`], 1);
    } else {
      const _first = lines.buf[0];
      const _bind = lines.len - 1 | 0;
      const _last = lines.buf[_bind];
      const _x = new _M0TPB9ArrayViewGsE(lines.buf, 1, lines.len - 1 | 0);
      const _self = new _M0TPB5ArrayGsE([], 0);
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, `${start}${_first}`);
      _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x));
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, `${_last}${finish}`);
      return _self;
    }
  }
}
function _M0FPC15debug8surround(start, finish, r) {
  return _M0FPC15debug11with__lines(r, (lines) => _M0FPC15debug15surround__lines(start, finish, lines));
}
function _M0MPC15debug7Content8no__wrap(c) {
  return new _M0TPC15debug13ContentParens(c.size, c.lines);
}
function _M0FPC15debug6parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, true);
}
function _M0FPC15debug10no__parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, false);
}
function _M0FPC15debug15compact__middle(middle) {
  const parts = new _M0TPB5ArrayGRPC16string10StringViewE([], 0);
  const _bind = middle.end - middle.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const m = middle.buf[middle.start + _ | 0];
      const t = _M0MPC16string6String4trim(m, undefined);
      if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, _M0FPC15debug15compact__middleN6recordS2439)) {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(parts, t);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, _M0FPC15debug15compact__middleN6recordS2440);
  return _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string6String13strip__suffix(joined0, _M0FPC15debug15compact__middleN6recordS2441), new _M0TPC16string10StringView(joined0, 0, joined0.length));
}
function _M0FPC15debug14compact__lines(lines) {
  if (lines.len === 0) {
    return new _M0TPB5ArrayGsE([], 0);
  } else {
    if (lines.len === 1) {
      const _x = lines.buf[0];
      return new _M0TPB5ArrayGsE([_x], 1);
    } else {
      const _first = lines.buf[0];
      const _bind = lines.len - 1 | 0;
      const _last = lines.buf[_bind];
      const _bind$2 = lines.buf;
      const _bind$3 = lines.len - 1 | 0;
      const _x = new _M0TPB9ArrayViewGsE(_bind$2, 1, _bind$3);
      if (_first === "[" && _last === "]" || _first === "{" && _last === "}") {
        const joined = _M0FPC15debug15compact__middle(_x);
        if (_first === "{") {
          const s1 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__prefix(joined, _M0FPC15debug14compact__linesN6recordS2450), joined);
          const inner = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__suffix(s1, _M0FPC15debug14compact__linesN6recordS2451), s1);
          if (_M0IPC16string10StringViewPB2Eq5equal(inner, _M0FPC15debug14compact__linesN6recordS2452)) {
            return new _M0TPB5ArrayGsE(["{}"], 1);
          } else {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "{ ";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner);
            const _p$2 = " }";
            _string_builder.val = `${_string_builder.val}${_p$2}`;
            return new _M0TPB5ArrayGsE([_string_builder.val], 1);
          }
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "[";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          const _p$2 = "]";
          _string_builder.val = `${_string_builder.val}${_p$2}`;
          return new _M0TPB5ArrayGsE([_string_builder.val], 1);
        }
      } else {
        if (_M0MPC16string6String11has__suffix(_first, _M0FPC15debug14compact__linesN6recordS2453) && _last === ")") {
          const joined = _M0FPC15debug15compact__middle(_x);
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _first);
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _last);
          return new _M0TPB5ArrayGsE([_string_builder.val], 1);
        } else {
          const parts = new _M0TPB5ArrayGRPC16string10StringViewE([new _M0TPC16string10StringView(_first, 0, _first.length)], 1);
          const _bind$4 = _bind$3 - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind$4) {
              const m = _bind$2[1 + _ | 0];
              _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(parts, _M0MPC16string6String4trim(m, undefined));
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(parts, _M0MPC16string6String4trim(_last, undefined));
          return new _M0TPB5ArrayGsE([_M0MPC15array5Array4joinGRPC16string10StringViewE(parts, _M0FPC15debug14compact__linesN6recordS2454)], 1);
        }
      }
    }
  }
}
function _M0MPC15debug7Content7compact(r) {
  return _M0MPC15debug7Content20with__lines__content(r, _M0FPC15debug14compact__lines);
}
function _M0FPC15debug6indent(prefix, r) {
  return _M0FPC15debug11with__lines(r, (lines) => {
    const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(lines.len);
    const _p$2 = lines.len;
    const _p$3 = lines.buf;
    let _tmp = 0;
    while (true) {
      const _p$4 = _tmp;
      if (_p$4 < _p$2) {
        const _p$5 = _p$3[_p$4];
        const _p$6 = `${prefix}${_p$5}`;
        _p.buf[_p$4] = _p$6;
        _tmp = _p$4 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return _p;
  });
}
function _M0FPC15debug14indent__spaces(n, r) {
  return _M0FPC15debug6indent(_M0MPC16string6String6repeat(" ", n), r);
}
function _M0FPC15debug21push__indented__items(out, indent_by, contents) {
  const _bind = contents.len;
  const _bind$2 = contents.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const item = _bind$2[_];
      const _p = new _M0TPB5ArrayGsE([], 0);
      const _p$2 = item.len;
      const _p$3 = item.buf;
      let item_lines;
      let _tmp$2 = 0;
      while (true) {
        const _p$4 = _tmp$2;
        if (_p$4 < _p$2) {
          const _p$5 = _p$3[_p$4];
          const _p$6 = "";
          if (!(_p$5 === _p$6)) {
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_p, _p$5);
          }
          _tmp$2 = _p$4 + 1 | 0;
          continue;
        } else {
          item_lines = _p;
          break;
        }
      }
      if (item_lines.len === 0) {
      } else {
        if (item_lines.len === 1) {
          const _x = item_lines.buf[0];
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_x},`);
        } else {
          const _first = item_lines.buf[0];
          const _bind$3 = item_lines.len - 1 | 0;
          const _last = item_lines.buf[_bind$3];
          const _x_buf = item_lines.buf;
          const _x_end = item_lines.len - 1 | 0;
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_first}`);
          const _bind$4 = _x_end - 1 | 0;
          let _tmp$3 = 0;
          while (true) {
            const _$2 = _tmp$3;
            if (_$2 < _bind$4) {
              const mid = _x_buf[1 + _$2 | 0];
              _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${mid}`);
              _tmp$3 = _$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_last},`);
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPC15debug19bracket__seq__lines(open, close, indent_by, contents) {
  if (contents.len === 0) {
    return new _M0TPB5ArrayGsE([`${open}${close}`], 1);
  } else {
    if (contents.len === 1) {
      const _item = contents.buf[0];
      if (_item.len > 1) {
        const lines = _M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines;
        if (!(lines.len === 0)) {
          const last_i = lines.len - 1 | 0;
          if (last_i < 0 || last_i >= lines.len) {
            $panic();
          }
          const _bind = `${lines.buf[last_i]},`;
          if (last_i < 0 || last_i >= lines.len) {
            $panic();
          }
          lines.buf[last_i] = _bind;
        }
        const _self = new _M0TPB5ArrayGsE([], 0);
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, open);
        _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(lines));
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, close);
        return _self;
      } else {
        const inner = _M0FPC15debug14compact__lines(_item);
        if (inner.len === 0) {
          return new _M0TPB5ArrayGsE([`${open}${close}`], 1);
        } else {
          if (inner.len === 1) {
            const _x = inner.buf[0];
            if (open === "{" && close === "}") {
              const inner$2 = _M0MPC16string6String4trim(_x, undefined);
              if (_M0IPC16string10StringViewPB2Eq5equal(inner$2, _M0FPC15debug19bracket__seq__linesN6recordS2502)) {
                return new _M0TPB5ArrayGsE(["{}"], 1);
              } else {
                const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                const _p = "{ ";
                _string_builder.val = `${_string_builder.val}${_p}`;
                _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner$2);
                const _p$2 = " }";
                _string_builder.val = `${_string_builder.val}${_p$2}`;
                return new _M0TPB5ArrayGsE([_string_builder.val], 1);
              }
            } else {
              return new _M0TPB5ArrayGsE([`${open}${_x}${close}`], 1);
            }
          } else {
            const _self = new _M0TPB5ArrayGsE([], 0);
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, open);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines));
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, close);
            return _self;
          }
        }
      }
    } else {
      const out = new _M0TPB5ArrayGsE([open], 1);
      _M0FPC15debug21push__indented__items(out, indent_by, contents);
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, close);
      return out;
    }
  }
}
function _M0FPC15debug17comma__seq__lines(begin, end, contents) {
  if (begin === "[" && end === "]") {
    return _M0FPC15debug19bracket__seq__lines("[", "]", 2, contents);
  } else {
    if (begin === "{" && end === "}") {
      return _M0FPC15debug19bracket__seq__lines("{", "}", 2, contents);
    } else {
      if (begin === "" && end === "") {
        let lines;
        if (contents.len === 0) {
          lines = new _M0TPB5ArrayGsE([`${begin}${end}`], 1);
        } else {
          if (contents.len === 1) {
            const _item = contents.buf[0];
            lines = _M0FPC15debug15surround__lines(begin, end, _item);
          } else {
            const _first = contents.buf[0];
            const _bind = contents.len - 1 | 0;
            const _last = contents.buf[_bind];
            const _x_buf = contents.buf;
            const _x_end = contents.len - 1 | 0;
            const space = _M0MPC16string6String6repeat(" ", begin.length);
            const middle_lines = new _M0TPB5ArrayGsE([], 0);
            const _bind$2 = _x_end - 1 | 0;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind$2) {
                const item = _x_buf[1 + _ | 0];
                const _bind$3 = _M0FPC15debug15surround__lines(space, ",", item);
                _M0MPC15array5Array6appendGsE(middle_lines, new _M0TPB9ArrayViewGsE(_bind$3.buf, 0, _bind$3.len));
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const _self = new _M0TPB5ArrayGsE([], 0);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(begin, ",", _first)));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(middle_lines));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(space, end, _last)));
            lines = _self;
          }
        }
        const _p = new _M0TPB5ArrayGsE([], 0);
        const _p$2 = lines.len;
        const _p$3 = lines.buf;
        let _tmp = 0;
        while (true) {
          const _p$4 = _tmp;
          if (_p$4 < _p$2) {
            const _p$5 = _p$3[_p$4];
            const _p$6 = "";
            if (!(_p$5 === _p$6)) {
              _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_p, _p$5);
            }
            _tmp = _p$4 + 1 | 0;
            continue;
          } else {
            return _p;
          }
        }
      } else {
        if (contents.len === 0) {
          return new _M0TPB5ArrayGsE([`${begin}${end}`], 1);
        } else {
          if (contents.len === 1) {
            const _item = contents.buf[0];
            const _p = new _M0TPB5ArrayGsE([], 0);
            const _p$2 = _item.len;
            const _p$3 = _item.buf;
            let item_lines;
            let _tmp = 0;
            while (true) {
              const _p$4 = _tmp;
              if (_p$4 < _p$2) {
                const _p$5 = _p$3[_p$4];
                const _p$6 = "";
                if (!(_p$5 === _p$6)) {
                  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_p, _p$5);
                }
                _tmp = _p$4 + 1 | 0;
                continue;
              } else {
                item_lines = _p;
                break;
              }
            }
            if (item_lines.len === 0) {
              return new _M0TPB5ArrayGsE([`${begin}${end}`], 1);
            } else {
              if (item_lines.len === 1) {
                const _x = item_lines.buf[0];
                return new _M0TPB5ArrayGsE([`${begin}${_x}${end}`], 1);
              } else {
                const _bind = item_lines.len - 1 | 0;
                const _last_line = item_lines.buf[_bind];
                const _x = new _M0TPB9ArrayViewGsE(item_lines.buf, 0, item_lines.len - 1 | 0);
                const _self = new _M0TPB5ArrayGsE([], 0);
                _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, begin);
                const _p$4 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(_x.end - _x.start | 0);
                const _p$5 = _x.end - _x.start | 0;
                let _tmp$2 = 0;
                while (true) {
                  const _p$6 = _tmp$2;
                  if (_p$6 < _p$5) {
                    const _p$7 = _x.buf[_x.start + _p$6 | 0];
                    const _p$8 = `${_M0MPC16string6String6repeat(" ", 2)}${_p$7}`;
                    _p$4.buf[_p$6] = _p$8;
                    _tmp$2 = _p$6 + 1 | 0;
                    continue;
                  } else {
                    break;
                  }
                }
                _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_p$4));
                _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, `${_M0MPC16string6String6repeat(" ", 2)}${_last_line},`);
                _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, end);
                return _self;
              }
            }
          } else {
            const out = new _M0TPB5ArrayGsE([begin], 1);
            _M0FPC15debug21push__indented__items(out, 2, contents);
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, end);
            return out;
          }
        }
      }
    }
  }
}
function _M0FPC15debug10comma__seq(begin, end, contents) {
  const _bind = contents.len;
  const _bind$2 = contents.buf;
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp;
    const size = _tmp$2;
    if (_ < _bind) {
      const c = _bind$2[_];
      _tmp = _ + 1 | 0;
      _tmp$2 = size + c.size | 0;
      continue;
    } else {
      const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(contents.len);
      const _p$2 = contents.len;
      const _p$3 = contents.buf;
      let _tmp$3 = 0;
      while (true) {
        const _p$4 = _tmp$3;
        if (_p$4 < _p$2) {
          const _p$5 = _p$3[_p$4];
          const _p$6 = _p$5.lines;
          _p.buf[_p$4] = _p$6;
          _tmp$3 = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return new _M0TPC15debug7Content(size, _M0FPC15debug17comma__seq__lines(begin, end, _p), false);
    }
  }
}
function _M0FPC15debug14print__content(r) {
  return _M0MPC15array5Array4joinGsE(r.lines, _M0FPC15debug14print__contentN6recordS2557);
}
function _M0FPC15debug14with__resizing(threshold, rendered_children) {
  if (threshold <= 0) {
    return rendered_children;
  } else {
    const compacted = _M0MPC15debug7Content7compact(rendered_children);
    const _p = compacted.lines;
    let _tmp;
    let _p$2;
    _L: {
      _L$2: {
        const _p$3 = _p.len;
        const _p$4 = _p.buf;
        let _tmp$2 = 0;
        while (true) {
          const _p$5 = _tmp$2;
          if (_p$5 < _p$3) {
            const _p$6 = _p$4[_p$5];
            if (!(_p$6.length <= threshold)) {
              _p$2 = false;
              break _L$2;
            }
            _tmp$2 = _p$5 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _tmp = true;
        break _L;
      }
      _tmp = _p$2;
    }
    if (_tmp) {
      return compacted;
    } else {
      return rendered_children;
    }
  }
}
function _M0MPC15debug4Repr17info__adds__depth(info) {
  let _tmp;
  switch (info.$tag) {
    case 12: {
      _tmp = true;
      break;
    }
    case 13: {
      _tmp = true;
      break;
    }
    case 16: {
      _tmp = true;
      break;
    }
    default: {
      _tmp = false;
    }
  }
  return !_tmp;
}
function _M0MPC15debug4Repr19prune__info_2einnerN2goS2564(replacement, d, node) {
  const children = _M0MPC15debug4Repr8children(node);
  if (d <= 0) {
    if (children.len === 0) {
      return node;
    } else {
      if (!_M0MPC15debug4Repr17info__adds__depth(node)) {
        const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
        const _p$2 = children.len;
        const _p$3 = children.buf;
        let _tmp = 0;
        while (true) {
          const _p$4 = _tmp;
          if (_p$4 < _p$2) {
            const _p$5 = _p$3[_p$4];
            const _p$6 = _M0MPC15debug4Repr19prune__info_2einnerN2goS2564(replacement, d, _p$5);
            _p.buf[_p$4] = _p$6;
            _tmp = _p$4 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        return _M0MPC15debug4Repr14with__children(node, _p);
      } else {
        return replacement;
      }
    }
  } else {
    if (children.len === 0) {
      return node;
    } else {
      const next_depth = _M0MPC15debug4Repr17info__adds__depth(node) ? d - 1 | 0 : d;
      const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
      const _p$2 = children.len;
      const _p$3 = children.buf;
      let _tmp = 0;
      while (true) {
        const _p$4 = _tmp;
        if (_p$4 < _p$2) {
          const _p$5 = _p$3[_p$4];
          const _p$6 = _M0MPC15debug4Repr19prune__info_2einnerN2goS2564(replacement, next_depth, _p$5);
          _p.buf[_p$4] = _p$6;
          _tmp = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0MPC15debug4Repr14with__children(node, _p);
    }
  }
}
function _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth) {
  if (max_depth === undefined) {
    return self;
  } else {
    const _Some = max_depth;
    const _depth = _Some;
    return _M0MPC15debug4Repr19prune__info_2einnerN2goS2564(replacement, 1 > _depth ? 1 : _depth, self);
  }
}
function _M0MPC15debug4Repr11prune__info(self, replacement$46$opt, max_depth) {
  let replacement;
  if (replacement$46$opt === undefined) {
    replacement = _M0DTPC15debug4Repr7Omitted__;
  } else {
    const _Some = replacement$46$opt;
    replacement = _Some;
  }
  return _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth);
}
function _M0FPC15debug17is__unquoted__key(key) {
  let _cursor_228 = 0;
  const _input_end_230 = key.length;
  let _accept_state_231 = -1;
  let _match_end_232 = -1;
  let _labelled_block_result;
  _L: {
    if (_cursor_228 < _input_end_230) {
      let _labelled_block_result$2;
      _L$2: {
        const _next_char_237 = key.charCodeAt(_cursor_228);
        _cursor_228 = _cursor_228 + 1 | 0;
        if (_next_char_237 < 96) {
          if (_next_char_237 < 95) {
            _labelled_block_result = undefined;
            break _L;
          } else {
            _labelled_block_result$2 = undefined;
            break _L$2;
          }
        } else {
          if (_next_char_237 > 96) {
            if (_next_char_237 < 123) {
              _labelled_block_result$2 = undefined;
              break _L$2;
            } else {
              _labelled_block_result = undefined;
              break _L;
            }
          } else {
            _labelled_block_result = undefined;
            break _L;
          }
        }
      }
      while (true) {
        if (_cursor_228 < _input_end_230) {
          let _labelled_block_result$3;
          _L$3: {
            const _next_char_235 = key.charCodeAt(_cursor_228);
            _cursor_228 = _cursor_228 + 1 | 0;
            if (_next_char_235 < 91) {
              if (_next_char_235 < 58) {
                if (_next_char_235 < 48) {
                  _labelled_block_result = undefined;
                  break _L;
                } else {
                  _labelled_block_result$3 = undefined;
                  break _L$3;
                }
              } else {
                if (_next_char_235 > 64) {
                  _labelled_block_result$3 = undefined;
                  break _L$3;
                } else {
                  _labelled_block_result = undefined;
                  break _L;
                }
              }
            } else {
              if (_next_char_235 > 94) {
                if (_next_char_235 < 97) {
                  if (_next_char_235 < 96) {
                    _labelled_block_result$3 = undefined;
                    break _L$3;
                  } else {
                    _labelled_block_result = undefined;
                    break _L;
                  }
                } else {
                  if (_next_char_235 > 122) {
                    _labelled_block_result = undefined;
                    break _L;
                  } else {
                    _labelled_block_result$3 = undefined;
                    break _L$3;
                  }
                }
              } else {
                _labelled_block_result = undefined;
                break _L;
              }
            }
          }
          continue;
        } else {
          _accept_state_231 = 0;
          _match_end_232 = _cursor_228;
          _labelled_block_result = undefined;
          break _L;
        }
      }
    } else {
      _labelled_block_result = undefined;
      break _L;
    }
  }
  const _bind = _accept_state_231;
  if (_bind === 0) {
    return true;
  } else {
    return false;
  }
}
function _M0FPC15debug20pretty__print__label(name) {
  return _M0FPC15debug17is__unquoted__key(name) ? name : _M0MPC16string6String14escape_2einner(name, true);
}
function _M0MPC15debug4Repr13pretty__print(self, children) {
  switch (self.$tag) {
    case 0: {
      return _M0FPC15debug10comma__seq("(", ")", new _M0TPB5ArrayGRPC15debug13ContentParensE([], 0));
    }
    case 1: {
      const _Integer = self;
      const _s = _Integer._0;
      let _tmp;
      if (_s.length >= 1) {
        const _x = _s.charCodeAt(0);
        if (_x === 45) {
          _tmp = 1;
        } else {
          _tmp = 0;
        }
      } else {
        _tmp = 0;
      }
      return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp, new _M0TPB5ArrayGsE([_s], 1)));
    }
    case 2: {
      const _DoubleLit = self;
      const _x = _DoubleLit._0;
      const needs_parens = 1 / _x < 0;
      return _M0FPC15debug12leaf_2einner(String(_x), needs_parens);
    }
    case 3: {
      const _FloatLit = self;
      const _x$2 = _FloatLit._0;
      const needs_parens$2 = Math.fround(Math.fround(1) / _x$2) < Math.fround(0);
      return _M0FPC15debug12leaf_2einner(_M0IPC15float5FloatPB4Show10to__string(_x$2), needs_parens$2);
    }
    case 4: {
      const _BoolLit = self;
      const _x$3 = _BoolLit._0;
      return _M0FPC15debug12leaf_2einner(_x$3 ? "true" : "false", false);
    }
    case 5: {
      const _CharLit = self;
      const _x$4 = _CharLit._0;
      return _M0FPC15debug12leaf_2einner(_M0MPC14char4Char14escape_2einner(_x$4, true), false);
    }
    case 6: {
      const _StringLit = self;
      const _x$5 = _StringLit._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_M0MPC16string6String14escape_2einner(_x$5, true)));
    }
    case 7: {
      const _p = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
      const _p$2 = children.len;
      const _p$3 = children.buf;
      let _tmp$2 = 0;
      while (true) {
        const _p$4 = _tmp$2;
        if (_p$4 < _p$2) {
          const _p$5 = _p$3[_p$4];
          const _p$6 = _M0MPC15debug7Content8no__wrap(_p$5);
          _p.buf[_p$4] = _p$6;
          _tmp$2 = _p$4 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0FPC15debug10comma__seq("(", ")", _p);
    }
    case 10: {
      const _Enum = self;
      const _name = _Enum._0;
      if (children.len === 0) {
        return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_name));
      } else {
        if (_name === "Tuple") {
          const _p$4 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
          const _p$5 = children.len;
          const _p$6 = children.buf;
          let _tmp$3 = 0;
          while (true) {
            const _p$7 = _tmp$3;
            if (_p$7 < _p$5) {
              const _p$8 = _p$6[_p$7];
              const _p$9 = _M0MPC15debug7Content8no__wrap(_p$8);
              _p$4.buf[_p$7] = _p$9;
              _tmp$3 = _p$7 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return _M0FPC15debug10comma__seq("(", ")", _p$4);
        } else {
          const _tmp$3 = `${_name}(`;
          const _p$4 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
          const _p$5 = children.len;
          const _p$6 = children.buf;
          let _tmp$4 = 0;
          while (true) {
            const _p$7 = _tmp$4;
            if (_p$7 < _p$5) {
              const _p$8 = _p$6[_p$7];
              const _p$9 = _M0MPC15debug7Content8no__wrap(_p$8);
              _p$4.buf[_p$7] = _p$9;
              _tmp$4 = _p$7 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return _M0FPC15debug10comma__seq(_tmp$3, ")", _p$4);
        }
      }
    }
    case 8: {
      const _p$4 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
      const _p$5 = children.len;
      const _p$6 = children.buf;
      let _tmp$3 = 0;
      while (true) {
        const _p$7 = _tmp$3;
        if (_p$7 < _p$5) {
          const _p$8 = _p$6[_p$7];
          const _p$9 = _M0MPC15debug7Content8no__wrap(_p$8);
          _p$4.buf[_p$7] = _p$9;
          _tmp$3 = _p$7 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0FPC15debug10comma__seq("[", "]", _p$4);
    }
    case 9: {
      const _p$7 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
      const _p$8 = children.len;
      const _p$9 = children.buf;
      let _tmp$4 = 0;
      while (true) {
        const _p$10 = _tmp$4;
        if (_p$10 < _p$8) {
          const _p$11 = _p$9[_p$10];
          const _p$12 = _M0MPC15debug7Content8no__wrap(_p$11);
          _p$7.buf[_p$10] = _p$12;
          _tmp$4 = _p$10 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0FPC15debug10comma__seq("{", "}", _p$7);
    }
    case 14: {
      const _Opaque = self;
      const _name$2 = _Opaque._0;
      if (children.len === 0) {
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", _M0FPC15debug8verbatim(_name$2)));
      } else {
        const _tmp$5 = _M0FPC15debug8verbatim(`${_name$2}:`);
        const _p$10 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
        const _p$11 = children.len;
        const _p$12 = children.buf;
        let _tmp$6 = 0;
        while (true) {
          const _p$13 = _tmp$6;
          if (_p$13 < _p$11) {
            const _p$14 = _p$12[_p$13];
            const _p$15 = _M0MPC15debug7Content8no__wrap(_p$14);
            _p$10.buf[_p$13] = _p$15;
            _tmp$6 = _p$13 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const body = _M0IPC15debug13ContentParensPB3Add3add(_tmp$5, _M0FPC15debug6indent("  ", _M0MPC15debug7Content8no__wrap(_M0FPC15debug10comma__seq("", "", _p$10))));
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", body));
      }
    }
    case 15: {
      const _Literal = self;
      const _str = _Literal._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_str));
    }
    case 11: {
      const _p$10 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(children.len);
      const _p$11 = children.len;
      const _p$12 = children.buf;
      let _tmp$5 = 0;
      while (true) {
        const _p$13 = _tmp$5;
        if (_p$13 < _p$11) {
          const _p$14 = _p$12[_p$13];
          const _p$15 = _M0MPC15debug7Content8no__wrap(_p$14);
          _p$10.buf[_p$13] = _p$15;
          _tmp$5 = _p$13 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      return _M0FPC15debug10comma__seq("{", "}", _p$10);
    }
    case 16: {
      if (children.len === 2) {
        const _key = children.buf[0];
        const _val = children.buf[1];
        const k = _M0MPC15debug7Content8no__wrap(_key);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind = v.lines;
        if (_bind.len === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          const _first = _bind.buf[0];
          const _x$6 = new _M0TPB9ArrayViewGsE(_bind.buf, 1, _bind.len);
          const head = `${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_first}`;
          const _tmp$6 = (1 + k.size | 0) + v.size | 0;
          const _self = new _M0TPB5ArrayGsE([], 0);
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, head);
          _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
          return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$6, _self));
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 13: {
      const _EnumLabeledArg = self;
      const _name$3 = _EnumLabeledArg._0;
      if (children.len === 1) {
        const _val = children.buf[0];
        const _bind = _val.lines;
        if (_bind.len === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          const _first = _bind.buf[0];
          const _x$6 = new _M0TPB9ArrayViewGsE(_bind.buf, 1, _bind.len);
          const _tmp$6 = 1 + _val.size | 0;
          const _self = new _M0TPB5ArrayGsE([], 0);
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, `${_name$3}=${_first}`);
          _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
          return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$6, _self));
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 12: {
      const _RecordField = self;
      const _name$4 = _RecordField._0;
      if (children.len === 1) {
        const _val = children.buf[0];
        const label = _M0FPC15debug20pretty__print__label(_name$4);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind = v.lines;
        if (_bind.len === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          const _first = _bind.buf[0];
          const _x$6 = new _M0TPB9ArrayViewGsE(_bind.buf, 1, _bind.len);
          const _tmp$6 = 1 + v.size | 0;
          const _self = new _M0TPB5ArrayGsE([], 0);
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(_self, `${label}: ${_first}`);
          _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
          return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$6, _self));
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    default: {
      return _M0FPC15debug6parens(_M0FPC15debug8verbatim("..."));
    }
  }
}
function _M0MPC15debug4Repr12render__repr(self, threshold) {
  const label = _M0MPC15debug4Repr7shallow(self);
  const _p = _M0MPC15debug4Repr8children(self);
  const _p$2 = _M0MPC15array5Array20unsafe__make__uninitGRPC15debug13ContentParensE(_p.len);
  const _p$3 = _p.len;
  const _p$4 = _p.buf;
  let _tmp = 0;
  while (true) {
    const _p$5 = _tmp;
    if (_p$5 < _p$3) {
      const _p$6 = _p$4[_p$5];
      const _p$7 = _M0MPC15debug4Repr12render__repr(_p$6, threshold);
      _p$2.buf[_p$5] = _p$7;
      _tmp = _p$5 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const children = _p$2;
  return _M0FPC15debug14with__resizing(threshold, _M0MPC15debug4Repr13pretty__print(label, children));
}
function _M0FPC15debug14render__pruned(r, max_depth) {
  const info = _M0MPC15debug4Repr11prune__info(r, undefined, max_depth);
  return _M0FPC15debug14print__content(_M0MPC15debug7Content8no__wrap(_M0MPC15debug4Repr12render__repr(info, 70)));
}
function _M0FPC15debug6render(r, max_depth) {
  return _M0FPC15debug14render__pruned(r, _M0MPC16option6Option10unwrap__orGiE(max_depth, 16));
}
function _M0IPC15debug4ReprPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0FPC15debug6render(self, undefined));
}
function _M0IPC16string6StringPC15debug5Debug8to__repr(self) {
  return new _M0DTPC15debug4Repr9StringLit(self);
}
function _M0IP39XinOrigin10moon__warc6digest11DigestErrorPC15debug5Debug8to__repr(_x_144) {
  switch (_x_144.$tag) {
    case 0: {
      const _InvalidAlgorithm = _x_144;
      const _$42$arg_145 = _InvalidAlgorithm._0;
      return _M0MPC15debug4Repr4ctor("InvalidAlgorithm", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_145) }], 1));
    }
    case 1: {
      const _InvalidEncoding = _x_144;
      const _$42$arg_146 = _InvalidEncoding._0;
      return _M0MPC15debug4Repr4ctor("InvalidEncoding", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_146) }], 1));
    }
    case 2: {
      const _InvalidFormat = _x_144;
      const _$42$arg_147 = _InvalidFormat._0;
      return _M0MPC15debug4Repr4ctor("InvalidFormat", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_147) }], 1));
    }
    default: {
      const _InvalidLength = _x_144;
      const _$42$arg_148 = _InvalidLength._0;
      return _M0MPC15debug4Repr4ctor("InvalidLength", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_148) }], 1));
    }
  }
}
function _M0FP39XinOrigin10moon__warc6digest12base32__char(idx) {
  const _p = _M0MPC13int3Int8to__char(idx >>> 0 < _M0FP39XinOrigin10moon__warc6digest16base32__alphabet.length ? _M0FP39XinOrigin10moon__warc6digest16base32__alphabet.charCodeAt(idx) : $oob());
  return _p === -1 ? $panic() : _p;
}
function _M0FP39XinOrigin10moon__warc6digest14base32__encode(data) {
  const len = data.end - data.start | 0;
  if (len === 0) {
    return "";
  }
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  let i = 0;
  while (true) {
    if (i < len) {
      const _bind = i;
      if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
        $panic();
      }
      const b0 = data.buf[data.start + _bind | 0];
      const has1 = (i + 1 | 0) < len;
      const has2 = (i + 2 | 0) < len;
      const has3 = (i + 3 | 0) < len;
      const has4 = (i + 4 | 0) < len;
      let b1;
      if (has1) {
        const _bind$2 = i + 1 | 0;
        if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
          $panic();
        }
        b1 = data.buf[data.start + _bind$2 | 0];
      } else {
        b1 = 0;
      }
      let b2;
      if (has2) {
        const _bind$2 = i + 2 | 0;
        if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
          $panic();
        }
        b2 = data.buf[data.start + _bind$2 | 0];
      } else {
        b2 = 0;
      }
      let b3;
      if (has3) {
        const _bind$2 = i + 3 | 0;
        if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
          $panic();
        }
        b3 = data.buf[data.start + _bind$2 | 0];
      } else {
        b3 = 0;
      }
      let b4;
      if (has4) {
        const _bind$2 = i + 4 | 0;
        if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
          $panic();
        }
        b4 = data.buf[data.start + _bind$2 | 0];
      } else {
        b4 = 0;
      }
      const c0 = b0 >> 3 & 31;
      const c1 = (b0 & 7) << 2 | b1 >> 6 & 3;
      const c2 = b1 >> 1 & 31;
      const c3 = (b1 & 1) << 4 | b2 >> 4 & 15;
      const c4 = (b2 & 15) << 1 | b3 >> 7 & 1;
      const c5 = b3 >> 2 & 31;
      const c6 = (b3 & 3) << 3 | b4 >> 5 & 7;
      const c7 = b4 & 31;
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc6digest12base32__char(c0));
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc6digest12base32__char(c1));
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has1 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c2) : 61);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has1 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c3) : 61);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has2 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c4) : 61);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has3 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c5) : 61);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has3 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c6) : 61);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, has4 ? _M0FP39XinOrigin10moon__warc6digest12base32__char(c7) : 61);
      i = i + 5 | 0;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc6digest14write__u32__be(buf, v) {
  const _p = v >>> 24 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p & 255);
  const _p$2 = v >>> 16 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$2 & 255);
  const _p$3 = v >>> 8 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$3 & 255);
  const _p$4 = v & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$4 & 255);
}
function _M0FP39XinOrigin10moon__warc6digest20read__u32__be__fixed(buf, offset) {
  const _p = offset >>> 0 < buf.length ? buf[offset] : $oob();
  const _tmp = _p << 24;
  const _tmp$2 = offset + 1 | 0;
  const _p$2 = _tmp$2 >>> 0 < buf.length ? buf[_tmp$2] : $oob();
  const _tmp$3 = _tmp | _p$2 << 16;
  const _tmp$4 = offset + 2 | 0;
  const _p$3 = _tmp$4 >>> 0 < buf.length ? buf[_tmp$4] : $oob();
  const _tmp$5 = _tmp$3 | _p$3 << 8;
  const _tmp$6 = offset + 3 | 0;
  const _p$4 = _tmp$6 >>> 0 < buf.length ? buf[_tmp$6] : $oob();
  return _tmp$5 | _p$4;
}
function _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher15compress__block(self, block) {
  const w = self.w;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 16) {
      if (i >>> 0 < w.length) {
        w[i] = _M0FP39XinOrigin10moon__warc6digest20read__u32__be__fixed(block, Math.imul(i, 4) | 0);
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 16;
  while (true) {
    const i = _tmp$2;
    if (i < 80) {
      const _tmp$3 = i - 3 | 0;
      const _tmp$4 = _tmp$3 >>> 0 < w.length ? w[_tmp$3] : $oob();
      const _tmp$5 = i - 8 | 0;
      const _tmp$6 = _tmp$4 ^ (_tmp$5 >>> 0 < w.length ? w[_tmp$5] : $oob());
      const _tmp$7 = i - 14 | 0;
      const _tmp$8 = _tmp$6 ^ (_tmp$7 >>> 0 < w.length ? w[_tmp$7] : $oob());
      const _tmp$9 = i - 16 | 0;
      const _p = _tmp$8 ^ (_tmp$9 >>> 0 < w.length ? w[_tmp$9] : $oob());
      if (i >>> 0 < w.length) {
        w[i] = _p << 1 | (_p >>> 31 | 0);
      } else {
        $oob();
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let a = self.h0;
  let b = self.h1;
  let c = self.h2;
  let d = self.h3;
  let e = self.h4;
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < 80) {
      let f;
      let k;
      _L: {
        if (i < 20) {
          f = b & c | ~b & d;
          k = 1518500249;
          break _L;
        } else {
          if (i < 40) {
            f = b ^ c ^ d;
            k = 1859775393;
            break _L;
          } else {
            if (i < 60) {
              f = b & c | b & d | c & d;
              k = -1894007588;
              break _L;
            } else {
              f = b ^ c ^ d;
              k = -899497514;
              break _L;
            }
          }
        }
      }
      const _p = a;
      const temp = ((((((((_p << 5 | (_p >>> 27 | 0)) >>> 0) + (f >>> 0) | 0) >>> 0) + (e >>> 0) | 0) >>> 0) + (k >>> 0) | 0) >>> 0) + ((i >>> 0 < w.length ? w[i] : $oob()) >>> 0) | 0;
      e = d;
      d = c;
      const _p$2 = b;
      c = _p$2 << 30 | (_p$2 >>> 2 | 0);
      b = a;
      a = temp;
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.h0 = (self.h0 >>> 0) + (a >>> 0) | 0;
  self.h1 = (self.h1 >>> 0) + (b >>> 0) | 0;
  self.h2 = (self.h2 >>> 0) + (c >>> 0) | 0;
  self.h3 = (self.h3 >>> 0) + (d >>> 0) | 0;
  self.h4 = (self.h4 >>> 0) + (e >>> 0) | 0;
}
function _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher8finalize(self) {
  const clone = new _M0TP39XinOrigin10moon__warc6digest10Sha1Hasher(self.h0, self.h1, self.h2, self.h3, self.h4, _M0MPC15array10FixedArray4copyGyE(self.block), $make_array_len_and_init(80, 0), self.block_len, self.total_bytes);
  const bit_len = BigInt.asUintN(64, clone.total_bytes * 8n);
  const _tmp = clone.block;
  const _tmp$2 = clone.block_len;
  if (_tmp$2 >>> 0 < _tmp.length) {
    _tmp[_tmp$2] = 128;
  } else {
    $oob();
  }
  clone.block_len = clone.block_len + 1 | 0;
  if (clone.block_len > 56) {
    while (true) {
      if (clone.block_len < 64) {
        const _tmp$3 = clone.block;
        const _tmp$4 = clone.block_len;
        if (_tmp$4 >>> 0 < _tmp$3.length) {
          _tmp$3[_tmp$4] = 0;
        } else {
          $oob();
        }
        clone.block_len = clone.block_len + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher15compress__block(clone, clone.block);
    clone.block_len = 0;
  }
  while (true) {
    if (clone.block_len < 56) {
      const _tmp$3 = clone.block;
      const _tmp$4 = clone.block_len;
      if (_tmp$4 >>> 0 < _tmp$3.length) {
        _tmp$3[_tmp$4] = 0;
      } else {
        $oob();
      }
      clone.block_len = clone.block_len + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < 8) {
      const shift = Math.imul(7 - i | 0, 8) | 0;
      const _tmp$4 = clone.block;
      const _tmp$5 = 56 + i | 0;
      const _p = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, bit_len) >> BigInt(shift & 63)) & 255n);
      if (_tmp$5 >>> 0 < _tmp$4.length) {
        _tmp$4[_tmp$5] = (Number(BigInt.asIntN(32, _p)) | 0) & 255;
      } else {
        $oob();
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher15compress__block(clone, clone.block);
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(20);
  _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, clone.h0);
  _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, clone.h1);
  _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, clone.h2);
  _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, clone.h3);
  _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, clone.h4);
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher3new() {
  return new _M0TP39XinOrigin10moon__warc6digest10Sha1Hasher(1732584193, -271733879, -1732584194, 271733878, -1009589776, $makebytes(64, 0), $make_array_len_and_init(80, 0), 0, 0n);
}
function _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher6update(self, data) {
  const len = data.end - data.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      const _tmp$2 = self.block;
      const _tmp$3 = self.block_len;
      if (i < 0 || i >= (data.end - data.start | 0)) {
        $panic();
      }
      if (_tmp$3 >>> 0 < _tmp$2.length) {
        _tmp$2[_tmp$3] = data.buf[data.start + i | 0];
      } else {
        $oob();
      }
      self.block_len = self.block_len + 1 | 0;
      if (self.block_len === 64) {
        _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher15compress__block(self, self.block);
        self.block_len = 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.total_bytes = BigInt.asUintN(64, self.total_bytes + BigInt.asUintN(64, BigInt(len)));
}
function _M0FP39XinOrigin10moon__warc6digest4sha1(data) {
  const h = _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher3new();
  _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher6update(h, data);
  return _M0MP39XinOrigin10moon__warc6digest10Sha1Hasher8finalize(h);
}
function _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher15compress__block(self, block) {
  const w = self.w;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 16) {
      if (i >>> 0 < w.length) {
        w[i] = _M0FP39XinOrigin10moon__warc6digest20read__u32__be__fixed(block, Math.imul(i, 4) | 0);
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 16;
  while (true) {
    const i = _tmp$2;
    if (i < 64) {
      const _tmp$3 = i - 15 | 0;
      const _p = _tmp$3 >>> 0 < w.length ? w[_tmp$3] : $oob();
      const _tmp$4 = _p >>> 7 | _p << 25;
      const _tmp$5 = i - 15 | 0;
      const _p$2 = _tmp$5 >>> 0 < w.length ? w[_tmp$5] : $oob();
      const _tmp$6 = _tmp$4 ^ (_p$2 >>> 18 | _p$2 << 14);
      const _tmp$7 = i - 15 | 0;
      const s0 = _tmp$6 ^ ((_tmp$7 >>> 0 < w.length ? w[_tmp$7] : $oob()) >>> 3 | 0);
      const _tmp$8 = i - 2 | 0;
      const _p$3 = _tmp$8 >>> 0 < w.length ? w[_tmp$8] : $oob();
      const _tmp$9 = _p$3 >>> 17 | _p$3 << 15;
      const _tmp$10 = i - 2 | 0;
      const _p$4 = _tmp$10 >>> 0 < w.length ? w[_tmp$10] : $oob();
      const _tmp$11 = _tmp$9 ^ (_p$4 >>> 19 | _p$4 << 13);
      const _tmp$12 = i - 2 | 0;
      const s1 = _tmp$11 ^ ((_tmp$12 >>> 0 < w.length ? w[_tmp$12] : $oob()) >>> 10 | 0);
      const _tmp$13 = i - 16 | 0;
      const _tmp$14 = ((_tmp$13 >>> 0 < w.length ? w[_tmp$13] : $oob()) >>> 0) + (s0 >>> 0) | 0;
      const _tmp$15 = i - 7 | 0;
      if (i >>> 0 < w.length) {
        w[i] = (((_tmp$14 >>> 0) + ((_tmp$15 >>> 0 < w.length ? w[_tmp$15] : $oob()) >>> 0) | 0) >>> 0) + (s1 >>> 0) | 0;
      } else {
        $oob();
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$3 = self.h;
  let a = 0 >>> 0 < _tmp$3.length ? _tmp$3[0] : $oob();
  const _tmp$4 = self.h;
  let b = 1 >>> 0 < _tmp$4.length ? _tmp$4[1] : $oob();
  const _tmp$5 = self.h;
  let c = 2 >>> 0 < _tmp$5.length ? _tmp$5[2] : $oob();
  const _tmp$6 = self.h;
  let d = 3 >>> 0 < _tmp$6.length ? _tmp$6[3] : $oob();
  const _tmp$7 = self.h;
  let e = 4 >>> 0 < _tmp$7.length ? _tmp$7[4] : $oob();
  const _tmp$8 = self.h;
  let f = 5 >>> 0 < _tmp$8.length ? _tmp$8[5] : $oob();
  const _tmp$9 = self.h;
  let g = 6 >>> 0 < _tmp$9.length ? _tmp$9[6] : $oob();
  const _tmp$10 = self.h;
  let h = 7 >>> 0 < _tmp$10.length ? _tmp$10[7] : $oob();
  let _tmp$11 = 0;
  while (true) {
    const i = _tmp$11;
    if (i < 64) {
      const _p = e;
      const _tmp$12 = _p >>> 6 | _p << 26;
      const _p$2 = e;
      const _tmp$13 = _tmp$12 ^ (_p$2 >>> 11 | _p$2 << 21);
      const _p$3 = e;
      const s1 = _tmp$13 ^ (_p$3 >>> 25 | _p$3 << 7);
      const ch = e & f ^ ~e & g;
      const temp1 = (((((((h >>> 0) + (s1 >>> 0) | 0) >>> 0) + (ch >>> 0) | 0) >>> 0) + ((i >>> 0 < _M0FP39XinOrigin10moon__warc6digest9sha256__k.length ? _M0FP39XinOrigin10moon__warc6digest9sha256__k[i] : $oob()) >>> 0) | 0) >>> 0) + ((i >>> 0 < w.length ? w[i] : $oob()) >>> 0) | 0;
      const _p$4 = a;
      const _tmp$14 = _p$4 >>> 2 | _p$4 << 30;
      const _p$5 = a;
      const _tmp$15 = _tmp$14 ^ (_p$5 >>> 13 | _p$5 << 19);
      const _p$6 = a;
      const s0 = _tmp$15 ^ (_p$6 >>> 22 | _p$6 << 10);
      const maj = a & b ^ a & c ^ b & c;
      const temp2 = (s0 >>> 0) + (maj >>> 0) | 0;
      h = g;
      g = f;
      f = e;
      e = (d >>> 0) + (temp1 >>> 0) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 >>> 0) + (temp2 >>> 0) | 0;
      _tmp$11 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp$12 = self.h;
  const _tmp$13 = self.h;
  if (0 >>> 0 < _tmp$12.length) {
    _tmp$12[0] = ((0 >>> 0 < _tmp$13.length ? _tmp$13[0] : $oob()) >>> 0) + (a >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$14 = self.h;
  const _tmp$15 = self.h;
  if (1 >>> 0 < _tmp$14.length) {
    _tmp$14[1] = ((1 >>> 0 < _tmp$15.length ? _tmp$15[1] : $oob()) >>> 0) + (b >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$16 = self.h;
  const _tmp$17 = self.h;
  if (2 >>> 0 < _tmp$16.length) {
    _tmp$16[2] = ((2 >>> 0 < _tmp$17.length ? _tmp$17[2] : $oob()) >>> 0) + (c >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$18 = self.h;
  const _tmp$19 = self.h;
  if (3 >>> 0 < _tmp$18.length) {
    _tmp$18[3] = ((3 >>> 0 < _tmp$19.length ? _tmp$19[3] : $oob()) >>> 0) + (d >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$20 = self.h;
  const _tmp$21 = self.h;
  if (4 >>> 0 < _tmp$20.length) {
    _tmp$20[4] = ((4 >>> 0 < _tmp$21.length ? _tmp$21[4] : $oob()) >>> 0) + (e >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$22 = self.h;
  const _tmp$23 = self.h;
  if (5 >>> 0 < _tmp$22.length) {
    _tmp$22[5] = ((5 >>> 0 < _tmp$23.length ? _tmp$23[5] : $oob()) >>> 0) + (f >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$24 = self.h;
  const _tmp$25 = self.h;
  if (6 >>> 0 < _tmp$24.length) {
    _tmp$24[6] = ((6 >>> 0 < _tmp$25.length ? _tmp$25[6] : $oob()) >>> 0) + (g >>> 0) | 0;
  } else {
    $oob();
  }
  const _tmp$26 = self.h;
  const _tmp$27 = self.h;
  if (7 >>> 0 < _tmp$26.length) {
    _tmp$26[7] = ((7 >>> 0 < _tmp$27.length ? _tmp$27[7] : $oob()) >>> 0) + (h >>> 0) | 0;
  } else {
    $oob();
  }
}
function _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher8finalize(self) {
  const clone = new _M0TP39XinOrigin10moon__warc6digest12Sha256Hasher(_M0MPC15array10FixedArray4copyGjE(self.h), _M0MPC15array10FixedArray4copyGyE(self.block), $make_array_len_and_init(64, 0), self.block_len, self.total_bytes);
  const bit_len = BigInt.asUintN(64, clone.total_bytes * 8n);
  const _tmp = clone.block;
  const _tmp$2 = clone.block_len;
  if (_tmp$2 >>> 0 < _tmp.length) {
    _tmp[_tmp$2] = 128;
  } else {
    $oob();
  }
  clone.block_len = clone.block_len + 1 | 0;
  if (clone.block_len > 56) {
    while (true) {
      if (clone.block_len < 64) {
        const _tmp$3 = clone.block;
        const _tmp$4 = clone.block_len;
        if (_tmp$4 >>> 0 < _tmp$3.length) {
          _tmp$3[_tmp$4] = 0;
        } else {
          $oob();
        }
        clone.block_len = clone.block_len + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher15compress__block(clone, clone.block);
    clone.block_len = 0;
  }
  while (true) {
    if (clone.block_len < 56) {
      const _tmp$3 = clone.block;
      const _tmp$4 = clone.block_len;
      if (_tmp$4 >>> 0 < _tmp$3.length) {
        _tmp$3[_tmp$4] = 0;
      } else {
        $oob();
      }
      clone.block_len = clone.block_len + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < 8) {
      const shift = Math.imul(7 - i | 0, 8) | 0;
      const _tmp$4 = clone.block;
      const _tmp$5 = 56 + i | 0;
      const _p = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, bit_len) >> BigInt(shift & 63)) & 255n);
      if (_tmp$5 >>> 0 < _tmp$4.length) {
        _tmp$4[_tmp$5] = (Number(BigInt.asIntN(32, _p)) | 0) & 255;
      } else {
        $oob();
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher15compress__block(clone, clone.block);
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(32);
  let _tmp$4 = 0;
  while (true) {
    const i = _tmp$4;
    if (i < 8) {
      const _tmp$5 = clone.h;
      _M0FP39XinOrigin10moon__warc6digest14write__u32__be(out, i >>> 0 < _tmp$5.length ? _tmp$5[i] : $oob());
      _tmp$4 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher3new() {
  return new _M0TP39XinOrigin10moon__warc6digest12Sha256Hasher([1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225], $makebytes(64, 0), $make_array_len_and_init(64, 0), 0, 0n);
}
function _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher6update(self, data) {
  const len = data.end - data.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      const _tmp$2 = self.block;
      const _tmp$3 = self.block_len;
      if (i < 0 || i >= (data.end - data.start | 0)) {
        $panic();
      }
      if (_tmp$3 >>> 0 < _tmp$2.length) {
        _tmp$2[_tmp$3] = data.buf[data.start + i | 0];
      } else {
        $oob();
      }
      self.block_len = self.block_len + 1 | 0;
      if (self.block_len === 64) {
        _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher15compress__block(self, self.block);
        self.block_len = 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.total_bytes = BigInt.asUintN(64, self.total_bytes + BigInt.asUintN(64, BigInt(len)));
}
function _M0FP39XinOrigin10moon__warc6digest6sha256(data) {
  const h = _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher3new();
  _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher6update(h, data);
  return _M0MP39XinOrigin10moon__warc6digest12Sha256Hasher8finalize(h);
}
function _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(data) {
  const _bind = _M0FP39XinOrigin10moon__warc6digest6sha256(data);
  return `sha256:${_M0FP39XinOrigin10moon__warc6digest14base32__encode(new _M0TPC15bytes9BytesView(_bind, 0, _bind.length))}`;
}
function _M0FP39XinOrigin10moon__warc6digest19decode__base32__val(code) {
  return code >= 65 && code <= 90 ? code - 65 | 0 : code >= 97 && code <= 122 ? code - 97 | 0 : code >= 50 && code <= 55 ? (code - 50 | 0) + 26 | 0 : undefined;
}
function _M0FP39XinOrigin10moon__warc6digest14base32__decode(encoded) {
  const raw = _M0MPC16string10StringView9to__owned(encoded);
  let end = raw.length;
  let pad_count = 0;
  while (true) {
    let _tmp;
    if (end > 0) {
      const _tmp$2 = end - 1 | 0;
      _tmp = (_tmp$2 >>> 0 < raw.length ? raw.charCodeAt(_tmp$2) : $oob()) === 61;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      end = end - 1 | 0;
      pad_count = pad_count + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (pad_count > 0 && (raw.length % 8 | 0) !== 0) {
    return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2793;
  }
  if (pad_count > 6) {
    return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2795;
  }
  if (end === 0) {
    if (pad_count > 0) {
      return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2797;
    }
    return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2798;
  }
  const rem = end % 8 | 0;
  if (rem === 1 || (rem === 3 || rem === 6)) {
    return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2800;
  }
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(((Math.imul(end, 5) | 0) / 8 | 0) + 1 | 0);
  let buf_bits = 0;
  let bits_left = 0;
  const _bind = end;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const code = i >>> 0 < raw.length ? raw.charCodeAt(i) : $oob();
      const _bind$2 = _M0FP39XinOrigin10moon__warc6digest19decode__base32__val(code);
      if (_bind$2 === undefined) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "invalid Base32 character at index ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(i, 10));
        return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding(_string_builder.val));
      } else {
        const _Some = _bind$2;
        const _v = _Some;
        buf_bits = buf_bits << 5 | _v;
        bits_left = bits_left + 5 | 0;
        if (bits_left >= 8) {
          bits_left = bits_left - 8 | 0;
          _M0MPC16buffer6Buffer11write__byte(out, buf_bits >> bits_left & 255);
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (bits_left > 0) {
    const mask = (1 << bits_left) - 1 | 0;
    if ((buf_bits & mask) !== 0) {
      return _M0FP39XinOrigin10moon__warc6digest14base32__decodeN6constrS2802;
    }
  }
  return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(_M0MPC16buffer6Buffer9to__bytes(out));
}
function _M0FP39XinOrigin10moon__warc6digest16decode__hex__val(code) {
  return code >= 48 && code <= 57 ? code - 48 | 0 : code >= 97 && code <= 102 ? (code - 97 | 0) + 10 | 0 : code >= 65 && code <= 70 ? (code - 65 | 0) + 10 | 0 : undefined;
}
function _M0FP39XinOrigin10moon__warc6digest11hex__decode(encoded) {
  const s = _M0MPC16string10StringView9to__owned(encoded);
  const len = s.length;
  if ((len % 2 | 0) !== 0) {
    return _M0FP39XinOrigin10moon__warc6digest11hex__decodeN6constrS2823;
  }
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(len / 2 | 0);
  let i = 0;
  while (true) {
    if (i < len) {
      const _tmp = i;
      const hi = _M0FP39XinOrigin10moon__warc6digest16decode__hex__val(_tmp >>> 0 < s.length ? s.charCodeAt(_tmp) : $oob());
      const _tmp$2 = i + 1 | 0;
      const lo = _M0FP39XinOrigin10moon__warc6digest16decode__hex__val(_tmp$2 >>> 0 < s.length ? s.charCodeAt(_tmp$2) : $oob());
      _L: {
        _L$2: {
          if (hi === undefined) {
            break _L$2;
          } else {
            const _Some = hi;
            const _h = _Some;
            if (lo === undefined) {
              break _L$2;
            } else {
              const _Some$2 = lo;
              const _l = _Some$2;
              _M0MPC16buffer6Buffer11write__byte(out, (_h << 4 | _l) & 255);
            }
          }
          break _L;
        }
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "invalid hex character near index ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(i, 10));
        return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError15InvalidEncoding(_string_builder.val));
      }
      i = i + 2 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(_M0MPC16buffer6Buffer9to__bytes(out));
}
function _M0FP39XinOrigin10moon__warc6digest19parse__warc__digest(header_value) {
  const trimmed = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(header_value, undefined));
  const _bind = _M0MPC16string6String11split__once(trimmed, _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6recordS2838);
  if (_bind === undefined) {
    const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
    const _p = "digest header missing ':' separator: ";
    _string_builder.val = `${_string_builder.val}${_p}`;
    _M0MPB13StringBuilder13write__objectGsE(_string_builder, trimmed);
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidFormat(_string_builder.val));
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _algo_view = _x._0;
    const _val_view = _x._1;
    const algo = _M0MPC16string6String9to__lower(_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_algo_view, undefined)));
    const val = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_val_view, undefined));
    if (algo === "" || val === "") {
      return _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2840;
    }
    if (algo === "sha1") {
      let bytes;
      if (val.length === 40) {
        const _bind$2 = _M0FP39XinOrigin10moon__warc6digest11hex__decode(new _M0TPC16string10StringView(val, 0, val.length));
        if (_bind$2.$tag === 1) {
          const _Ok = _bind$2;
          bytes = _Ok._0;
        } else {
          const _Err = _bind$2;
          const _e = _Err._0;
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_e);
        }
      } else {
        if (val.length === 32) {
          const _bind$2 = _M0FP39XinOrigin10moon__warc6digest14base32__decode(new _M0TPC16string10StringView(val, 0, val.length));
          if (_bind$2.$tag === 1) {
            const _Ok = _bind$2;
            bytes = _Ok._0;
          } else {
            const _Err = _bind$2;
            const _e = _Err._0;
            return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_e);
          }
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "sha1 digest expects 32 Base32 chars or 40 hex chars, got ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(val.length, 10));
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength(_string_builder.val));
        }
      }
      if (bytes.length !== 20) {
        return _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2842;
      }
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(new _M0DTP39XinOrigin10moon__warc6digest10WarcDigest4Sha1(bytes));
    } else {
      if (algo === "sha256") {
        let bytes;
        if (val.length === 64) {
          const _bind$2 = _M0FP39XinOrigin10moon__warc6digest11hex__decode(new _M0TPC16string10StringView(val, 0, val.length));
          if (_bind$2.$tag === 1) {
            const _Ok = _bind$2;
            bytes = _Ok._0;
          } else {
            const _Err = _bind$2;
            const _e = _Err._0;
            return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_e);
          }
        } else {
          if (val.length === 52 || val.length === 56) {
            const _bind$2 = _M0FP39XinOrigin10moon__warc6digest14base32__decode(new _M0TPC16string10StringView(val, 0, val.length));
            if (_bind$2.$tag === 1) {
              const _Ok = _bind$2;
              bytes = _Ok._0;
            } else {
              const _Err = _bind$2;
              const _e = _Err._0;
              return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_e);
            }
          } else {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "sha256 digest expects 52/56 Base32 chars or 64 hex chars, got ";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(val.length, 10));
            return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError13InvalidLength(_string_builder.val));
          }
        }
        if (bytes.length !== 32) {
          return _M0FP39XinOrigin10moon__warc6digest19parse__warc__digestN6constrS2844;
        }
        return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(new _M0DTP39XinOrigin10moon__warc6digest10WarcDigest6Sha256(bytes));
      } else {
        return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6digest10WarcDigestRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok(new _M0DTP39XinOrigin10moon__warc6digest10WarcDigest5Other(algo, val));
      }
    }
  }
}
function _M0FP39XinOrigin10moon__warc6digest20verify__warc__digest(header_value, data) {
  const _bind = _M0FP39XinOrigin10moon__warc6digest19parse__warc__digest(header_value);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    const _x = _Ok._0;
    switch (_x.$tag) {
      case 0: {
        const _Sha1 = _x;
        const _expected = _Sha1._0;
        return new _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok($bytes_equal(_M0FP39XinOrigin10moon__warc6digest4sha1(data), _expected));
      }
      case 1: {
        const _Sha256 = _x;
        const _expected$2 = _Sha256._0;
        return new _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE2Ok($bytes_equal(_M0FP39XinOrigin10moon__warc6digest6sha256(data), _expected$2));
      }
      default: {
        const _Other = _x;
        const _algo = _Other._0;
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "unsupported digest algorithm: ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _algo);
        return new _M0DTPB6ResultGbRP39XinOrigin10moon__warc6digest11DigestErrorE3Err(new _M0DTP39XinOrigin10moon__warc6digest11DigestError16InvalidAlgorithm(_string_builder.val));
      }
    }
  }
}
function _M0FP39XinOrigin10moon__warc6digest9hex__char(idx) {
  const _p = _M0MPC13int3Int8to__char(idx >>> 0 < _M0FP39XinOrigin10moon__warc6digest13hex__alphabet.length ? _M0FP39XinOrigin10moon__warc6digest13hex__alphabet.charCodeAt(idx) : $oob());
  return _p === -1 ? $panic() : _p;
}
function _M0FP39XinOrigin10moon__warc6digest11hex__encode(data) {
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind = data.end - data.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      if (i < 0 || i >= (data.end - data.start | 0)) {
        $panic();
      }
      const v = data.buf[data.start + i | 0];
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc6digest9hex__char(v >> 4 & 15));
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc6digest9hex__char(v & 15));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0IP39XinOrigin10moon__warc4gzip9GzipErrorPC15debug5Debug8to__repr(_x_325) {
  switch (_x_325.$tag) {
    case 0: {
      const _InvalidHeader = _x_325;
      const _$42$arg_326 = _InvalidHeader._0;
      return _M0MPC15debug4Repr4ctor("InvalidHeader", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_326) }], 1));
    }
    case 1: {
      const _InvalidDeflateStream = _x_325;
      const _$42$arg_327 = _InvalidDeflateStream._0;
      return _M0MPC15debug4Repr4ctor("InvalidDeflateStream", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_327) }], 1));
    }
    case 2: {
      const _UnexpectedEof = _x_325;
      const _$42$arg_328 = _UnexpectedEof._0;
      return _M0MPC15debug4Repr4ctor("UnexpectedEof", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_328) }], 1));
    }
    case 3: {
      const _ChecksumMismatch = _x_325;
      const _$42$arg_329 = _ChecksumMismatch._0;
      return _M0MPC15debug4Repr4ctor("ChecksumMismatch", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_329) }], 1));
    }
    case 4: {
      const _SizeMismatch = _x_325;
      const _$42$arg_330 = _SizeMismatch._0;
      return _M0MPC15debug4Repr4ctor("SizeMismatch", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_330) }], 1));
    }
    default: {
      const _LimitExceeded = _x_325;
      const _$42$arg_331 = _LimitExceeded._0;
      return _M0MPC15debug4Repr4ctor("LimitExceeded", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_331) }], 1));
    }
  }
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader3new(data, start) {
  return new _M0TP39XinOrigin10moon__warc4gzip9BitReader(data, start, 0, 0);
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bits(self, n) {
  while (true) {
    if (self.bit_cnt < n) {
      const _tmp = self.byte_pos;
      const _bind = self.data;
      if (_tmp >= (_bind.end - _bind.start | 0)) {
        return _M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bitsN6constrS2912;
      }
      const _bind$2 = self.data;
      const _bind$3 = self.byte_pos;
      if (_bind$3 < 0 || _bind$3 >= (_bind$2.end - _bind$2.start | 0)) {
        $panic();
      }
      const _p = _bind$2.buf[_bind$2.start + _bind$3 | 0];
      const b = _p;
      self.byte_pos = self.byte_pos + 1 | 0;
      self.bit_buf = self.bit_buf | b << self.bit_cnt;
      self.bit_cnt = self.bit_cnt + 8 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(undefined);
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(self, n) {
  if (n === 0) {
    return _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bitsN6constrS2920;
  }
  const _bind = _M0MP39XinOrigin10moon__warc4gzip9BitReader12ensure__bits(self, n);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const mask = (1 << n >>> 0) - (1 >>> 0) | 0;
  const val = self.bit_buf & mask;
  self.bit_buf = self.bit_buf >>> n | 0;
  self.bit_cnt = self.bit_cnt - n | 0;
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(val);
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader15align__to__byte(self) {
  const drop = self.bit_cnt % 8 | 0;
  if (drop > 0) {
    self.bit_buf = self.bit_buf >>> drop | 0;
    self.bit_cnt = self.bit_cnt - drop | 0;
    return;
  } else {
    return;
  }
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader22read__aligned__u16__le(self) {
  const _bind = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(self, 8);
  let lo;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    lo = _Ok._0;
  } else {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const _bind$2 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(self, 8);
  let hi;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    hi = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(lo | hi << 8);
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink3new(initial_cap) {
  const cap = initial_cap < 256 ? 256 : initial_cap;
  return new _M0TP39XinOrigin10moon__warc4gzip8ByteSink($makebytes(cap, 0), 0);
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink13ensure__extra(self, extra) {
  if (extra <= (self.buf.length - self.len | 0)) {
    return undefined;
  }
  if (extra > (2147483647 - self.len | 0)) {
    $panic("ByteSink buffer overflow");
  }
  const needed = self.len + extra | 0;
  const doubled = self.buf.length > 1073741823 ? 2147483647 : Math.imul(self.buf.length, 2) | 0;
  const new_cap = doubled < needed ? needed : doubled;
  const next = $makebytes(new_cap, 0);
  const _bind = self.len;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _tmp$2 = self.buf;
      if (i >>> 0 < next.length) {
        next[i] = i >>> 0 < _tmp$2.length ? _tmp$2[i] : $oob();
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.buf = next;
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink10push__byte(self, b) {
  if (self.len >= self.buf.length) {
    _M0MP39XinOrigin10moon__warc4gzip8ByteSink13ensure__extra(self, 1);
  }
  const _tmp = self.buf;
  const _tmp$2 = self.len;
  if (_tmp$2 >>> 0 < _tmp.length) {
    _tmp[_tmp$2] = b;
  } else {
    $oob();
  }
  self.len = self.len + 1 | 0;
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink11push__slice(self, src, start, n) {
  if (n <= 0) {
    return undefined;
  }
  _M0MP39XinOrigin10moon__warc4gzip8ByteSink13ensure__extra(self, n);
  const dst = self.len;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const _tmp$2 = self.buf;
      const _tmp$3 = dst + i | 0;
      const _bind = start + i | 0;
      if (_bind < 0 || _bind >= (src.end - src.start | 0)) {
        $panic();
      }
      if (_tmp$3 >>> 0 < _tmp$2.length) {
        _tmp$2[_tmp$3] = src.buf[src.start + _bind | 0];
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.len = dst + n | 0;
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink11copy__match(self, dist, match_len) {
  _M0MP39XinOrigin10moon__warc4gzip8ByteSink13ensure__extra(self, match_len);
  const dst = self.len;
  const src = dst - dist | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < match_len) {
      const _tmp$2 = self.buf;
      const _tmp$3 = dst + i | 0;
      const _tmp$4 = self.buf;
      const _tmp$5 = src + i | 0;
      if (_tmp$3 >>> 0 < _tmp$2.length) {
        _tmp$2[_tmp$3] = _tmp$5 >>> 0 < _tmp$4.length ? _tmp$4[_tmp$5] : $oob();
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.len = dst + match_len | 0;
}
function _M0MP39XinOrigin10moon__warc4gzip8ByteSink9to__bytes(self) {
  const _p = self.len;
  if (_p <= 0) {
    return $bytes_literal$6;
  }
  const _tmp = self.buf;
  const _p$2 = $makebytes(_p, 0 >>> 0 < _tmp.length ? _tmp[0] : $oob());
  let _tmp$2 = 1;
  while (true) {
    const _p$3 = _tmp$2;
    if (_p$3 < _p) {
      const _tmp$3 = self.buf;
      if (_p$3 >>> 0 < _p$2.length) {
        _p$2[_p$3] = _p$3 >>> 0 < _tmp$3.length ? _tmp$3[_p$3] : $oob();
      } else {
        $oob();
      }
      _tmp$2 = _p$3 + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _p$2;
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytes(self, n, out, max_output) {
  const buffered_bytes = self.bit_cnt / 8 | 0;
  const unread_start = self.byte_pos - buffered_bytes | 0;
  self.byte_pos = unread_start;
  self.bit_buf = 0;
  self.bit_cnt = 0;
  const _bind = self.data;
  if (((_bind.end - _bind.start | 0) - self.byte_pos | 0) < n) {
    return _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2972;
  }
  if (max_output >= 0 && (max_output - out.len | 0) < n) {
    return _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytesN6constrS2974;
  }
  _M0MP39XinOrigin10moon__warc4gzip8ByteSink11push__slice(out, self.data, self.byte_pos, n);
  self.byte_pos = self.byte_pos + n | 0;
  return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(undefined);
}
function _M0MP39XinOrigin10moon__warc4gzip9BitReader26byte__offset__after__align(self) {
  _M0MP39XinOrigin10moon__warc4gzip9BitReader15align__to__byte(self);
  const buffered_bytes = self.bit_cnt / 8 | 0;
  return self.byte_pos - buffered_bytes | 0;
}
function _M0FP39XinOrigin10moon__warc4gzip14build__huffman(lengths, num_syms) {
  const counts = $make_array_len_and_init(16, 0);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < num_syms) {
      const l = i >>> 0 < lengths.length ? lengths[i] : $oob();
      if (l < 0 || l > 15) {
        return _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2985;
      }
      if (l > 0) {
        if (l >>> 0 < counts.length) {
          counts[l] = (l >>> 0 < counts.length ? counts[l] : $oob()) + 1 | 0;
        } else {
          $oob();
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let left = 1;
  let _tmp$2 = 1;
  let _tmp$3 = true;
  while (true) {
    const len = _tmp$2;
    const _more = _tmp$3;
    if (_more) {
      left = (left << 1) - (len >>> 0 < counts.length ? counts[len] : $oob()) | 0;
      if (left < 0) {
        return _M0FP39XinOrigin10moon__warc4gzip14build__huffmanN6constrS2987;
      }
      _tmp$2 = len + 1 | 0;
      _tmp$3 = len < 15;
      continue;
    } else {
      break;
    }
  }
  const offsets = $make_array_len_and_init(16, 0);
  const bl_code = $make_array_len_and_init(16, 0);
  let c = 0;
  let _tmp$4 = 1;
  while (true) {
    const len = _tmp$4;
    if (len < 15) {
      const _tmp$5 = len + 1 | 0;
      if (_tmp$5 >>> 0 < offsets.length) {
        offsets[_tmp$5] = (len >>> 0 < offsets.length ? offsets[len] : $oob()) + (len >>> 0 < counts.length ? counts[len] : $oob()) | 0;
      } else {
        $oob();
      }
      c = c + (len >>> 0 < counts.length ? counts[len] : $oob()) << 1;
      const _tmp$6 = len + 1 | 0;
      if (_tmp$6 >>> 0 < bl_code.length) {
        bl_code[_tmp$6] = c;
      } else {
        $oob();
      }
      _tmp$4 = len + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const symbols = $make_array_len_and_init(num_syms, 0);
  const fast = $make_array_len_and_init(512, 0);
  let _tmp$5 = 0;
  while (true) {
    const sym = _tmp$5;
    if (sym < num_syms) {
      const l = sym >>> 0 < lengths.length ? lengths[sym] : $oob();
      if (l !== 0) {
        const _tmp$6 = l >>> 0 < offsets.length ? offsets[l] : $oob();
        if (_tmp$6 >>> 0 < symbols.length) {
          symbols[_tmp$6] = sym;
        } else {
          $oob();
        }
        if (l >>> 0 < offsets.length) {
          offsets[l] = (l >>> 0 < offsets.length ? offsets[l] : $oob()) + 1 | 0;
        } else {
          $oob();
        }
        if (l <= 9) {
          const msb_code = l >>> 0 < bl_code.length ? bl_code[l] : $oob();
          if (l >>> 0 < bl_code.length) {
            bl_code[l] = msb_code + 1 | 0;
          } else {
            $oob();
          }
          let rev = 0;
          let m = msb_code;
          let _tmp$7 = 0;
          while (true) {
            const _ = _tmp$7;
            if (_ < l) {
              rev = rev << 1 | m & 1;
              m = m >> 1;
              _tmp$7 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const entry = l << 16 | sym;
          const step = 1 << l;
          let slot = rev;
          while (true) {
            if (slot < 512) {
              const _tmp$8 = slot;
              if (_tmp$8 >>> 0 < fast.length) {
                fast[_tmp$8] = entry;
              } else {
                $oob();
              }
              slot = slot + step | 0;
              continue;
            } else {
              break;
            }
          }
        }
      }
      _tmp$5 = sym + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(new _M0TP39XinOrigin10moon__warc4gzip12HuffmanTable(counts, symbols, fast));
}
function _M0FP39XinOrigin10moon__warc4gzip15decode__huffman(br, table) {
  const _bind = br.data;
  const data_len = _bind.end - _bind.start | 0;
  while (true) {
    if (br.bit_cnt <= 23 && br.byte_pos < data_len) {
      const _bind$2 = br.data;
      const _bind$3 = br.byte_pos;
      if (_bind$3 < 0 || _bind$3 >= (_bind$2.end - _bind$2.start | 0)) {
        $panic();
      }
      const _p = _bind$2.buf[_bind$2.start + _bind$3 | 0];
      const b = _p;
      br.byte_pos = br.byte_pos + 1 | 0;
      br.bit_buf = br.bit_buf | b << br.bit_cnt;
      br.bit_cnt = br.bit_cnt + 8 | 0;
      continue;
    } else {
      break;
    }
  }
  const _tmp = table.fast;
  const _tmp$2 = br.bit_buf & 511;
  const entry = _tmp$2 >>> 0 < _tmp.length ? _tmp[_tmp$2] : $oob();
  if (entry !== 0) {
    const len = entry >> 16;
    if (br.bit_cnt >= len) {
      br.bit_buf = br.bit_buf >>> len | 0;
      br.bit_cnt = br.bit_cnt - len | 0;
      return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(entry & 65535);
    }
  }
  let code = 0;
  let first = 0;
  let index = 0;
  let _tmp$3 = 1;
  let _tmp$4 = true;
  while (true) {
    const len = _tmp$3;
    const _more = _tmp$4;
    if (_more) {
      const _bind$2 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 1);
      let bit;
      if (_bind$2.$tag === 1) {
        const _Ok = _bind$2;
        bit = _Ok._0;
      } else {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      code = code | bit;
      const _tmp$5 = table.counts;
      const count = len >>> 0 < _tmp$5.length ? _tmp$5[len] : $oob();
      if ((code - count | 0) < first) {
        const _tmp$6 = table.symbols;
        const _tmp$7 = index + (code - first | 0) | 0;
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(_tmp$7 >>> 0 < _tmp$6.length ? _tmp$6[_tmp$7] : $oob());
      }
      index = index + count | 0;
      first = first + count << 1;
      code = code << 1;
      _tmp$3 = len + 1 | 0;
      _tmp$4 = len < 15;
      continue;
    } else {
      break;
    }
  }
  return _M0FP39XinOrigin10moon__warc4gzip15decode__huffmanN6constrS3018;
}
function _M0FP39XinOrigin10moon__warc4gzip20build__fixed__tables() {
  const lit_lens = $make_array_len_and_init(288, 0);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 144) {
      if (i >>> 0 < lit_lens.length) {
        lit_lens[i] = 8;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$2 = 144;
  while (true) {
    const i = _tmp$2;
    if (i < 256) {
      if (i >>> 0 < lit_lens.length) {
        lit_lens[i] = 9;
      } else {
        $oob();
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$3 = 256;
  while (true) {
    const i = _tmp$3;
    if (i < 280) {
      if (i >>> 0 < lit_lens.length) {
        lit_lens[i] = 7;
      } else {
        $oob();
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _tmp$4 = 280;
  while (true) {
    const i = _tmp$4;
    if (i < 288) {
      if (i >>> 0 < lit_lens.length) {
        lit_lens[i] = 8;
      } else {
        $oob();
      }
      _tmp$4 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dist_lens = $make_array_len_and_init(32, 5);
  const _bind = _M0FP39XinOrigin10moon__warc4gzip14build__huffman(lit_lens, 288);
  let lit_tbl;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    lit_tbl = _Ok._0;
  } else {
    lit_tbl = $panic("fixed lit table build failed");
  }
  const _bind$2 = _M0FP39XinOrigin10moon__warc4gzip14build__huffman(dist_lens, 32);
  let dist_tbl;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    dist_tbl = _Ok._0;
  } else {
    dist_tbl = $panic("fixed dist table build failed");
  }
  return { _0: lit_tbl, _1: dist_tbl };
}
function _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tables(br) {
  const _bind = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 5);
  let hlit;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    const _v = _Ok._0;
    hlit = _v + 257 | 0;
  } else {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const _bind$2 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 5);
  let hdist;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    const _v = _Ok._0;
    hdist = _v + 1 | 0;
  } else {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const _bind$3 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 4);
  let hclen;
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    const _v = _Ok._0;
    hclen = _v + 4 | 0;
  } else {
    const _Err = _bind$3;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  if (hlit > 286 || hdist > 30) {
    return _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3058;
  }
  const cl_lens = $make_array_len_and_init(19, 0);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < hclen) {
      const _bind$4 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 3);
      let v;
      if (_bind$4.$tag === 1) {
        const _Ok = _bind$4;
        v = _Ok._0;
      } else {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      const _tmp$2 = i >>> 0 < _M0FP39XinOrigin10moon__warc4gzip14codelen__order.length ? _M0FP39XinOrigin10moon__warc4gzip14codelen__order[i] : $oob();
      if (_tmp$2 >>> 0 < cl_lens.length) {
        cl_lens[_tmp$2] = v;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip14build__huffman(cl_lens, 19);
  let cl_table;
  if (_bind$4.$tag === 1) {
    const _Ok = _bind$4;
    cl_table = _Ok._0;
  } else {
    const _Err = _bind$4;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const total = hlit + hdist | 0;
  const all_lens = $make_array_len_and_init(total, 0);
  let idx = 0;
  while (true) {
    if (idx < total) {
      const _bind$5 = _M0FP39XinOrigin10moon__warc4gzip15decode__huffman(br, cl_table);
      let sym;
      if (_bind$5.$tag === 1) {
        const _Ok = _bind$5;
        sym = _Ok._0;
      } else {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      if (sym < 16) {
        const _tmp$2 = idx;
        if (_tmp$2 >>> 0 < all_lens.length) {
          all_lens[_tmp$2] = sym;
        } else {
          $oob();
        }
        idx = idx + 1 | 0;
      } else {
        let rep_len = 0;
        let rep_cnt;
        if (sym === 16) {
          if (idx === 0) {
            return _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3060;
          }
          const _tmp$2 = idx - 1 | 0;
          rep_len = _tmp$2 >>> 0 < all_lens.length ? all_lens[_tmp$2] : $oob();
          const _bind$6 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 2);
          let extra;
          if (_bind$6.$tag === 1) {
            const _Ok = _bind$6;
            extra = _Ok._0;
          } else {
            const _Err = _bind$6;
            const _e = _Err._0;
            return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
          }
          rep_cnt = 3 + extra | 0;
        } else {
          if (sym === 17) {
            const _bind$6 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 3);
            let extra;
            if (_bind$6.$tag === 1) {
              const _Ok = _bind$6;
              extra = _Ok._0;
            } else {
              const _Err = _bind$6;
              const _e = _Err._0;
              return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
            }
            rep_cnt = 3 + extra | 0;
          } else {
            const _bind$6 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 7);
            let extra;
            if (_bind$6.$tag === 1) {
              const _Ok = _bind$6;
              extra = _Ok._0;
            } else {
              const _Err = _bind$6;
              const _e = _Err._0;
              return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
            }
            rep_cnt = 11 + extra | 0;
          }
        }
        if ((idx + rep_cnt | 0) > total) {
          return _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3062;
        }
        let _tmp$2 = 0;
        while (true) {
          const _ = _tmp$2;
          if (_ < rep_cnt) {
            const _tmp$3 = idx;
            if (_tmp$3 >>> 0 < all_lens.length) {
              all_lens[_tmp$3] = rep_len;
            } else {
              $oob();
            }
            idx = idx + 1 | 0;
            _tmp$2 = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  if ((256 >>> 0 < all_lens.length ? all_lens[256] : $oob()) === 0) {
    return _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tablesN6constrS3064;
  }
  const lit_lens = $make_array_len_and_init(hlit, 0);
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < hlit) {
      if (i >>> 0 < lit_lens.length) {
        lit_lens[i] = i >>> 0 < all_lens.length ? all_lens[i] : $oob();
      } else {
        $oob();
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const dist_lens = $make_array_len_and_init(hdist, 0);
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < hdist) {
      const _tmp$4 = hlit + i | 0;
      if (i >>> 0 < dist_lens.length) {
        dist_lens[i] = _tmp$4 >>> 0 < all_lens.length ? all_lens[_tmp$4] : $oob();
      } else {
        $oob();
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$5 = _M0FP39XinOrigin10moon__warc4gzip14build__huffman(lit_lens, hlit);
  let lit_tbl;
  if (_bind$5.$tag === 1) {
    const _Ok = _bind$5;
    lit_tbl = _Ok._0;
  } else {
    const _Err = _bind$5;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  const _bind$6 = _M0FP39XinOrigin10moon__warc4gzip14build__huffman(dist_lens, hdist);
  let dist_tbl;
  if (_bind$6.$tag === 1) {
    const _Ok = _bind$6;
    dist_tbl = _Ok._0;
  } else {
    const _Err = _bind$6;
    const _e = _Err._0;
    return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
  }
  return new _M0DTPB6ResultGURP39XinOrigin10moon__warc4gzip12HuffmanTableRP39XinOrigin10moon__warc4gzip12HuffmanTableERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok({ _0: lit_tbl, _1: dist_tbl });
}
function _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__block(br, lit_tbl, dist_tbl, out, max_output) {
  while (true) {
    const _bind = _M0FP39XinOrigin10moon__warc4gzip15decode__huffman(br, lit_tbl);
    let sym;
    if (_bind.$tag === 1) {
      const _Ok = _bind;
      sym = _Ok._0;
    } else {
      const _Err = _bind;
      const _e = _Err._0;
      return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
    }
    if (sym < 256) {
      if (max_output >= 0 && (max_output - out.len | 0) < 1) {
        return _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3142;
      }
      _M0MP39XinOrigin10moon__warc4gzip8ByteSink10push__byte(out, sym & 255);
    } else {
      if (sym === 256) {
        return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(undefined);
      } else {
        const l_idx = sym - 257 | 0;
        if (l_idx < 0 || l_idx >= 29) {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "invalid literal/length symbol ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(sym, 10));
          return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream(_string_builder.val));
        }
        const _bind$2 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, l_idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip10len__extra.length ? _M0FP39XinOrigin10moon__warc4gzip10len__extra[l_idx] : $oob());
        let extra_l;
        if (_bind$2.$tag === 1) {
          const _Ok = _bind$2;
          extra_l = _Ok._0;
        } else {
          const _Err = _bind$2;
          const _e = _Err._0;
          return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        const match_len = (l_idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip9len__base.length ? _M0FP39XinOrigin10moon__warc4gzip9len__base[l_idx] : $oob()) + extra_l | 0;
        const _bind$3 = _M0FP39XinOrigin10moon__warc4gzip15decode__huffman(br, dist_tbl);
        let d_sym;
        if (_bind$3.$tag === 1) {
          const _Ok = _bind$3;
          d_sym = _Ok._0;
        } else {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        if (d_sym < 0 || d_sym >= 30) {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "invalid distance symbol ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(d_sym, 10));
          return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError20InvalidDeflateStream(_string_builder.val));
        }
        const _bind$4 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, d_sym >>> 0 < _M0FP39XinOrigin10moon__warc4gzip11dist__extra.length ? _M0FP39XinOrigin10moon__warc4gzip11dist__extra[d_sym] : $oob());
        let extra_d;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          extra_d = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGuRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        const dist = (d_sym >>> 0 < _M0FP39XinOrigin10moon__warc4gzip10dist__base.length ? _M0FP39XinOrigin10moon__warc4gzip10dist__base[d_sym] : $oob()) + extra_d | 0;
        if (dist <= 0 || dist > out.len) {
          return _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3144;
        }
        if (max_output >= 0 && (max_output - out.len | 0) < match_len) {
          return _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__blockN6constrS3146;
        }
        _M0MP39XinOrigin10moon__warc4gzip8ByteSink11copy__match(out, dist, match_len);
      }
    }
    continue;
  }
}
function _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einner(data, start, max_output_bytes) {
  const br = _M0MP39XinOrigin10moon__warc4gzip9BitReader3new(data, start);
  const rem_in = (data.end - data.start | 0) - start | 0;
  let init_cap;
  if (rem_in > 0) {
    const est = rem_in > 536870911 ? rem_in : Math.imul(rem_in, 2) | 0;
    init_cap = max_output_bytes >= 0 && est > max_output_bytes ? max_output_bytes : est;
  } else {
    init_cap = 256;
  }
  const out = _M0MP39XinOrigin10moon__warc4gzip8ByteSink3new(init_cap);
  let bfinal = 0;
  while (true) {
    if (bfinal === 0) {
      const _bind = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 1);
      let _tmp;
      if (_bind.$tag === 1) {
        const _Ok = _bind;
        _tmp = _Ok._0;
      } else {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      bfinal = _tmp;
      const _bind$2 = _M0MP39XinOrigin10moon__warc4gzip9BitReader10read__bits(br, 2);
      let btype;
      if (_bind$2.$tag === 1) {
        const _Ok = _bind$2;
        btype = _Ok._0;
      } else {
        const _Err = _bind$2;
        const _e = _Err._0;
        return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      if (btype === 0) {
        _M0MP39XinOrigin10moon__warc4gzip9BitReader15align__to__byte(br);
        const _bind$3 = _M0MP39XinOrigin10moon__warc4gzip9BitReader22read__aligned__u16__le(br);
        let len;
        if (_bind$3.$tag === 1) {
          const _Ok = _bind$3;
          len = _Ok._0;
        } else {
          const _Err = _bind$3;
          const _e = _Err._0;
          return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        const _bind$4 = _M0MP39XinOrigin10moon__warc4gzip9BitReader22read__aligned__u16__le(br);
        let nlen;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          nlen = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        if ((len ^ 65535) !== nlen) {
          return _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3179;
        }
        const _bind$5 = _M0MP39XinOrigin10moon__warc4gzip9BitReader20read__aligned__bytes(br, len, out, max_output_bytes);
        if (_bind$5.$tag === 1) {
        } else {
          const _Err = _bind$5;
          const _e = _Err._0;
          return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
      } else {
        if (btype === 1) {
          const _lit_tbl = _M0FP39XinOrigin10moon__warc4gzip13fixed__tables._0;
          const _dist_tbl = _M0FP39XinOrigin10moon__warc4gzip13fixed__tables._1;
          const _bind$3 = _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__block(br, _lit_tbl, _dist_tbl, out, max_output_bytes);
          if (_bind$3.$tag === 1) {
          } else {
            const _Err = _bind$3;
            const _e = _Err._0;
            return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
          }
        } else {
          if (btype === 2) {
            const _bind$3 = _M0FP39XinOrigin10moon__warc4gzip21read__dynamic__tables(br);
            let _bind$4;
            if (_bind$3.$tag === 1) {
              const _Ok = _bind$3;
              _bind$4 = _Ok._0;
            } else {
              const _Err = _bind$3;
              const _e = _Err._0;
              return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
            }
            const _lit_tbl = _bind$4._0;
            const _dist_tbl = _bind$4._1;
            const _bind$5 = _M0FP39XinOrigin10moon__warc4gzip23inflate__huffman__block(br, _lit_tbl, _dist_tbl, out, max_output_bytes);
            if (_bind$5.$tag === 1) {
            } else {
              const _Err = _bind$5;
              const _e = _Err._0;
              return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
            }
          } else {
            return _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einnerN6constrS3181;
          }
        }
      }
      continue;
    } else {
      break;
    }
  }
  const end_pos = _M0MP39XinOrigin10moon__warc4gzip9BitReader26byte__offset__after__align(br);
  return new _M0DTPB6ResultGUziERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok({ _0: _M0MP39XinOrigin10moon__warc4gzip8ByteSink9to__bytes(out), _1: end_pos });
}
function _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__at(data, pos) {
  if ((pos + 2 | 0) > (data.end - data.start | 0)) {
    return _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__atN6constrS3231;
  }
  if (pos < 0 || pos >= (data.end - data.start | 0)) {
    $panic();
  }
  const _tmp = data.buf[data.start + pos | 0];
  const _bind = pos + 1 | 0;
  if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
    $panic();
  }
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(_tmp | data.buf[data.start + _bind | 0] << 8);
}
function _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__at(data, pos) {
  if ((pos + 4 | 0) > (data.end - data.start | 0)) {
    return _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__atN6constrS3236;
  }
  if (pos < 0 || pos >= (data.end - data.start | 0)) {
    $panic();
  }
  const _p = data.buf[data.start + pos | 0];
  const b0 = _p;
  const _bind = pos + 1 | 0;
  if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
    $panic();
  }
  const _p$2 = data.buf[data.start + _bind | 0];
  const b1 = _p$2;
  const _bind$2 = pos + 2 | 0;
  if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
    $panic();
  }
  const _p$3 = data.buf[data.start + _bind$2 | 0];
  const b2 = _p$3;
  const _bind$3 = pos + 3 | 0;
  if (_bind$3 < 0 || _bind$3 >= (data.end - data.start | 0)) {
    $panic();
  }
  const _p$4 = data.buf[data.start + _bind$3 | 0];
  const b3 = _p$4;
  return new _M0DTPB6ResultGjRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(b0 | b1 << 8 | b2 << 16 | b3 << 24);
}
function _M0FP39XinOrigin10moon__warc4gzip14write__u32__le(buf, v) {
  const _p = v & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p & 255);
  const _p$2 = v >>> 8 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$2 & 255);
  const _p$3 = v >>> 16 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$3 & 255);
  const _p$4 = v >>> 24 & 255;
  _M0MPC16buffer6Buffer11write__byte(buf, _p$4 & 255);
}
function _M0FP39XinOrigin10moon__warc4gzip22skip__zero__terminated(data, start, label) {
  let pos = start;
  while (true) {
    if (pos < (data.end - data.start | 0)) {
      const _bind = pos;
      if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
        $panic();
      }
      if (data.buf[data.start + _bind | 0] === 0) {
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(pos + 1 | 0);
      }
      pos = pos + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _p = "unterminated gzip header ";
  _string_builder.val = `${_string_builder.val}${_p}`;
  _M0MPB13StringBuilder13write__objectGsE(_string_builder, label);
  const _p$2 = " field";
  _string_builder.val = `${_string_builder.val}${_p$2}`;
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13UnexpectedEof(_string_builder.val));
}
function _M0MP39XinOrigin10moon__warc4gzip11Crc32Hasher3new() {
  return new _M0TP39XinOrigin10moon__warc4gzip11Crc32Hasher(-1);
}
function _M0FP39XinOrigin10moon__warc4gzip18make__crc32__table() {
  const table = $make_array_len_and_init(256, 0);
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < 256) {
      let c = i;
      let _tmp$2 = 0;
      while (true) {
        const _ = _tmp$2;
        if (_ < 8) {
          if ((c & 1) !== 0) {
            c = -306674912 ^ (c >>> 1 | 0);
          } else {
            c = c >>> 1 | 0;
          }
          _tmp$2 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (i >>> 0 < table.length) {
        table[i] = c;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return table;
}
function _M0MP39XinOrigin10moon__warc4gzip11Crc32Hasher6update(self, data) {
  let crc = self.state;
  const _bind = data.end - data.start | 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const _tmp$2 = crc;
      if (i < 0 || i >= (data.end - data.start | 0)) {
        $panic();
      }
      const _p = data.buf[data.start + i | 0];
      const idx = (_tmp$2 ^ _p) & 255;
      crc = (idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip12crc32__table.length ? _M0FP39XinOrigin10moon__warc4gzip12crc32__table[idx] : $oob()) ^ (crc >>> 8 | 0);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.state = crc;
}
function _M0FP39XinOrigin10moon__warc4gzip5crc32(data) {
  const h = _M0MP39XinOrigin10moon__warc4gzip11Crc32Hasher3new();
  _M0MP39XinOrigin10moon__warc4gzip11Crc32Hasher6update(h, data);
  return h.state ^ -1;
}
function _M0MP39XinOrigin10moon__warc4gzip9BitWriter12flush__bytes(self) {
  if (self.bit_cnt > 0) {
    const _tmp = self.buf;
    const _p = self.bit_buf & 255;
    _M0MPC16buffer6Buffer11write__byte(_tmp, _p & 255);
    self.bit_buf = 0;
    self.bit_cnt = 0;
    return;
  } else {
    return;
  }
}
function _M0MP39XinOrigin10moon__warc4gzip9BitWriter11new_2einner(capacity) {
  return new _M0TP39XinOrigin10moon__warc4gzip9BitWriter(_M0MPC16buffer6Buffer14Buffer_2einner(capacity), 0, 0);
}
function _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(self, val, nbits) {
  self.bit_buf = self.bit_buf | val << self.bit_cnt;
  self.bit_cnt = self.bit_cnt + nbits | 0;
  while (true) {
    if (self.bit_cnt >= 8) {
      const _tmp = self.buf;
      const _p = self.bit_buf & 255;
      _M0MPC16buffer6Buffer11write__byte(_tmp, _p & 255);
      self.bit_buf = self.bit_buf >>> 8 | 0;
      self.bit_cnt = self.bit_cnt - 8 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP39XinOrigin10moon__warc4gzip15deflate__stored(data) {
  const total = data.end - data.start | 0;
  const bw = _M0MP39XinOrigin10moon__warc4gzip9BitWriter11new_2einner(total + 16 | 0);
  if (total === 0) {
    _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, 1, 1);
    _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, 0, 2);
    _M0MP39XinOrigin10moon__warc4gzip9BitWriter12flush__bytes(bw);
    _M0MPC16buffer6Buffer11write__byte(bw.buf, 0);
    _M0MPC16buffer6Buffer11write__byte(bw.buf, 0);
    _M0MPC16buffer6Buffer11write__byte(bw.buf, 255);
    _M0MPC16buffer6Buffer11write__byte(bw.buf, 255);
    return _M0MPC16buffer6Buffer9to__bytes(bw.buf);
  }
  let pos = 0;
  while (true) {
    if (pos < total) {
      const rem = total - pos | 0;
      const blk_len = rem > 65535 ? 65535 : rem;
      const is_final = (pos + blk_len | 0) >= total ? 1 : 0;
      _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, is_final, 1);
      _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, 0, 2);
      _M0MP39XinOrigin10moon__warc4gzip9BitWriter12flush__bytes(bw);
      const nlen = blk_len ^ 65535;
      _M0MPC16buffer6Buffer11write__byte(bw.buf, blk_len & 255);
      _M0MPC16buffer6Buffer11write__byte(bw.buf, blk_len >> 8 & 255);
      _M0MPC16buffer6Buffer11write__byte(bw.buf, nlen & 255);
      _M0MPC16buffer6Buffer11write__byte(bw.buf, nlen >> 8 & 255);
      const _tmp = bw.buf;
      const _bind = pos;
      const _bind$2 = pos + blk_len | 0;
      const _bind$3 = data.end - data.start | 0;
      const _bind$4 = _bind < 0 ? 0 : _bind > _bind$3 ? _bind$3 : _bind;
      const _bind$5 = _bind$2 < 0 ? 0 : _bind$2 > _bind$3 ? _bind$3 : _bind$2;
      _M0MPC16buffer6Buffer16write__bytesview(_tmp, new _M0TPC15bytes9BytesView(data.buf, data.start + _bind$4 | 0, data.start + (_bind$5 > _bind$4 ? _bind$5 : _bind$4) | 0));
      pos = pos + blk_len | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC16buffer6Buffer9to__bytes(bw.buf);
}
function _M0FP39XinOrigin10moon__warc4gzip18encode__dist__code(dist) {
  let _tmp = 0;
  while (true) {
    const idx = _tmp;
    if (idx < 30) {
      const base = idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip10dist__base.length ? _M0FP39XinOrigin10moon__warc4gzip10dist__base[idx] : $oob();
      const extra_bits = idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip11dist__extra.length ? _M0FP39XinOrigin10moon__warc4gzip11dist__extra[idx] : $oob();
      const span = 1 << extra_bits;
      if (dist >= base && dist < (base + span | 0)) {
        return { _0: idx, _1: dist - base | 0, _2: extra_bits };
      }
      _tmp = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return { _0: 29, _1: dist - (29 >>> 0 < _M0FP39XinOrigin10moon__warc4gzip10dist__base.length ? _M0FP39XinOrigin10moon__warc4gzip10dist__base[29] : $oob()) | 0, _2: 29 >>> 0 < _M0FP39XinOrigin10moon__warc4gzip11dist__extra.length ? _M0FP39XinOrigin10moon__warc4gzip11dist__extra[29] : $oob() };
}
function _M0FP39XinOrigin10moon__warc4gzip20encode__length__code(length) {
  let _tmp = 0;
  while (true) {
    const idx = _tmp;
    if (idx < 29) {
      const base = idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip9len__base.length ? _M0FP39XinOrigin10moon__warc4gzip9len__base[idx] : $oob();
      const extra_bits = idx >>> 0 < _M0FP39XinOrigin10moon__warc4gzip10len__extra.length ? _M0FP39XinOrigin10moon__warc4gzip10len__extra[idx] : $oob();
      const span = 1 << extra_bits;
      if (length >= base && length < (base + span | 0)) {
        return { _0: 257 + idx | 0, _1: length - base | 0, _2: extra_bits };
      }
      _tmp = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FP39XinOrigin10moon__warc4gzip20encode__length__codeN5tupleS3297;
}
function _M0FP39XinOrigin10moon__warc4gzip5hash3(data, pos) {
  if (pos < 0 || pos >= (data.end - data.start | 0)) {
    $panic();
  }
  const b0 = data.buf[data.start + pos | 0];
  const _bind = pos + 1 | 0;
  if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
    $panic();
  }
  const b1 = data.buf[data.start + _bind | 0];
  const _bind$2 = pos + 2 | 0;
  if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
    $panic();
  }
  const b2 = data.buf[data.start + _bind$2 | 0];
  return (b0 << 10 ^ b1 << 5 ^ b2) & 32767;
}
function _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(self, code, nbits) {
  let shift = nbits - 1 | 0;
  while (true) {
    if (shift >= 0) {
      const bit = code >> shift & 1;
      _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(self, bit, 1);
      shift = shift - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FP39XinOrigin10moon__warc4gzip21write__fixed__literal(bw, sym) {
  if (sym <= 143) {
    _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(bw, 48 + sym | 0, 8);
    return;
  } else {
    if (sym <= 255) {
      _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(bw, 400 + (sym - 144 | 0) | 0, 9);
      return;
    } else {
      if (sym <= 279) {
        _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(bw, sym - 256 | 0, 7);
        return;
      } else {
        _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(bw, 192 + (sym - 280 | 0) | 0, 8);
        return;
      }
    }
  }
}
function _M0FP39XinOrigin10moon__warc4gzip20deflate__raw_2einner(data, level) {
  if (level <= 0) {
    return _M0FP39XinOrigin10moon__warc4gzip15deflate__stored(data);
  }
  const total = data.end - data.start | 0;
  const bw = _M0MP39XinOrigin10moon__warc4gzip9BitWriter11new_2einner((total / 2 | 0) + 16 | 0);
  _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, 1, 1);
  _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, 1, 2);
  if (total === 0) {
    _M0FP39XinOrigin10moon__warc4gzip21write__fixed__literal(bw, 256);
    _M0MP39XinOrigin10moon__warc4gzip9BitWriter12flush__bytes(bw);
    return _M0MPC16buffer6Buffer9to__bytes(bw.buf);
  }
  const max_chain = level >= 6 ? 64 : 16;
  const head = $make_array_len_and_init(32768, -1);
  const prev = $make_array_len_and_init(total, -1);
  let pos = 0;
  while (true) {
    if (pos < total) {
      let best_len = 0;
      let best_dist = 0;
      if ((pos + 3 | 0) <= total) {
        const h = _M0FP39XinOrigin10moon__warc4gzip5hash3(data, pos);
        let cand = h >>> 0 < head.length ? head[h] : $oob();
        const _tmp = pos;
        if (_tmp >>> 0 < prev.length) {
          prev[_tmp] = cand;
        } else {
          $oob();
        }
        if (h >>> 0 < head.length) {
          head[h] = pos;
        } else {
          $oob();
        }
        const min_pos = pos > 32768 ? pos - 32768 | 0 : 0;
        const max_match = (total - pos | 0) > 258 ? 258 : total - pos | 0;
        let steps = 0;
        while (true) {
          if (cand >= min_pos && steps < max_chain) {
            let _tmp$2;
            if (best_len < 3) {
              _tmp$2 = true;
            } else {
              const _bind = cand + best_len | 0;
              if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
                $panic();
              }
              const _tmp$3 = data.buf[data.start + _bind | 0];
              const _bind$2 = pos + best_len | 0;
              if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
                $panic();
              }
              _tmp$2 = _tmp$3 === data.buf[data.start + _bind$2 | 0];
            }
            if (_tmp$2) {
              let m = 0;
              while (true) {
                let _tmp$3;
                if (m < max_match) {
                  const _bind = cand + m | 0;
                  if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
                    $panic();
                  }
                  const _tmp$4 = data.buf[data.start + _bind | 0];
                  const _bind$2 = pos + m | 0;
                  if (_bind$2 < 0 || _bind$2 >= (data.end - data.start | 0)) {
                    $panic();
                  }
                  _tmp$3 = _tmp$4 === data.buf[data.start + _bind$2 | 0];
                } else {
                  _tmp$3 = false;
                }
                if (_tmp$3) {
                  m = m + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              if (m >= 3 && m > best_len) {
                best_len = m;
                best_dist = pos - cand | 0;
                if (best_len === max_match) {
                  break;
                }
              }
            }
            const _tmp$3 = cand;
            cand = _tmp$3 >>> 0 < prev.length ? prev[_tmp$3] : $oob();
            steps = steps + 1 | 0;
            continue;
          } else {
            break;
          }
        }
      }
      if (best_len >= 3) {
        const _bind = _M0FP39XinOrigin10moon__warc4gzip20encode__length__code(best_len);
        const _l_sym = _bind._0;
        const _l_extra = _bind._1;
        const _l_bits = _bind._2;
        _M0FP39XinOrigin10moon__warc4gzip21write__fixed__literal(bw, _l_sym);
        if (_l_bits > 0) {
          _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, _l_extra, _l_bits);
        }
        const _bind$2 = _M0FP39XinOrigin10moon__warc4gzip18encode__dist__code(best_dist);
        const _d_sym = _bind$2._0;
        const _d_extra = _bind$2._1;
        const _d_bits = _bind$2._2;
        _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__msb(bw, _d_sym, 5);
        if (_d_bits > 0) {
          _M0MP39XinOrigin10moon__warc4gzip9BitWriter16write__bits__lsb(bw, _d_extra, _d_bits);
        }
        const advance_end = ((pos + best_len | 0) - 2 | 0) <= total ? pos + best_len | 0 : pos + 1 | 0;
        const _bind$3 = pos + 1 | 0;
        let _tmp = _bind$3;
        while (true) {
          const p = _tmp;
          if (p < advance_end) {
            if ((p + 2 | 0) < total) {
              const hh = _M0FP39XinOrigin10moon__warc4gzip5hash3(data, p);
              if (p >>> 0 < prev.length) {
                prev[p] = hh >>> 0 < head.length ? head[hh] : $oob();
              } else {
                $oob();
              }
              if (hh >>> 0 < head.length) {
                head[hh] = p;
              } else {
                $oob();
              }
            }
            _tmp = p + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        pos = pos + best_len | 0;
      } else {
        const _bind = pos;
        if (_bind < 0 || _bind >= (data.end - data.start | 0)) {
          $panic();
        }
        _M0FP39XinOrigin10moon__warc4gzip21write__fixed__literal(bw, data.buf[data.start + _bind | 0]);
        pos = pos + 1 | 0;
      }
      continue;
    } else {
      break;
    }
  }
  _M0FP39XinOrigin10moon__warc4gzip21write__fixed__literal(bw, 256);
  _M0MP39XinOrigin10moon__warc4gzip9BitWriter12flush__bytes(bw);
  return _M0MPC16buffer6Buffer9to__bytes(bw.buf);
}
function _M0FP39XinOrigin10moon__warc4gzip16compress_2einner(data, level) {
  const deflated = _M0FP39XinOrigin10moon__warc4gzip20deflate__raw_2einner(data, level);
  const sum = _M0FP39XinOrigin10moon__warc4gzip5crc32(data);
  const isize = data.end - data.start | 0;
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(18 + deflated.length | 0);
  _M0MPC16buffer6Buffer11write__byte(out, 31);
  _M0MPC16buffer6Buffer11write__byte(out, 139);
  _M0MPC16buffer6Buffer11write__byte(out, 8);
  _M0MPC16buffer6Buffer11write__byte(out, 0);
  _M0MPC16buffer6Buffer11write__byte(out, 0);
  _M0MPC16buffer6Buffer11write__byte(out, 0);
  _M0MPC16buffer6Buffer11write__byte(out, 0);
  _M0MPC16buffer6Buffer11write__byte(out, 0);
  _M0MPC16buffer6Buffer11write__byte(out, level >= 6 ? 2 : level <= 0 ? 4 : 0);
  _M0MPC16buffer6Buffer11write__byte(out, 255);
  _M0MPC16buffer6Buffer12write__bytes(out, new _M0TPC15bytes9BytesView(deflated, 0, deflated.length));
  _M0FP39XinOrigin10moon__warc4gzip14write__u32__le(out, sum);
  _M0FP39XinOrigin10moon__warc4gzip14write__u32__le(out, isize);
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einner(raw, max_member_output_bytes) {
  const members = new _M0TPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberE([], 0);
  const total_len = raw.end - raw.start | 0;
  let pos = 0;
  while (true) {
    if (pos < total_len) {
      const member_start = pos;
      if ((pos + 10 | 0) > total_len) {
        return _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3363;
      }
      let _tmp;
      const _bind = pos;
      if (_bind < 0 || _bind >= (raw.end - raw.start | 0)) {
        $panic();
      }
      if (raw.buf[raw.start + _bind | 0] !== 31) {
        _tmp = true;
      } else {
        const _bind$2 = pos + 1 | 0;
        if (_bind$2 < 0 || _bind$2 >= (raw.end - raw.start | 0)) {
          $panic();
        }
        _tmp = raw.buf[raw.start + _bind$2 | 0] !== 139;
      }
      if (_tmp) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "invalid gzip magic bytes at offset ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(pos, 10));
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13InvalidHeader(_string_builder.val));
      }
      const _bind$2 = pos + 2 | 0;
      if (_bind$2 < 0 || _bind$2 >= (raw.end - raw.start | 0)) {
        $panic();
      }
      if (raw.buf[raw.start + _bind$2 | 0] !== 8) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "unsupported gzip compression method ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        const _bind$3 = pos + 2 | 0;
        if (_bind$3 < 0 || _bind$3 >= (raw.end - raw.start | 0)) {
          $panic();
        }
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(raw.buf[raw.start + _bind$3 | 0], 10));
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError13InvalidHeader(_string_builder.val));
      }
      const _bind$3 = pos + 3 | 0;
      if (_bind$3 < 0 || _bind$3 >= (raw.end - raw.start | 0)) {
        $panic();
      }
      const flg = raw.buf[raw.start + _bind$3 | 0];
      if ((flg & 224) !== 0) {
        return _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3365;
      }
      pos = pos + 10 | 0;
      if ((flg & 4) !== 0) {
        const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__at(raw, pos);
        let xlen;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          xlen = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        pos = pos + 2 | 0;
        if ((total_len - pos | 0) < xlen) {
          return _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3367;
        }
        pos = pos + xlen | 0;
      }
      if ((flg & 8) !== 0) {
        const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip22skip__zero__terminated(raw, pos, "FNAME");
        let _tmp$2;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          _tmp$2 = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        pos = _tmp$2;
      }
      if ((flg & 16) !== 0) {
        const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip22skip__zero__terminated(raw, pos, "FCOMMENT");
        let _tmp$2;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          _tmp$2 = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        pos = _tmp$2;
      }
      if ((flg & 2) !== 0) {
        const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip17read__u16__le__at(raw, pos);
        let expected_hcrc;
        if (_bind$4.$tag === 1) {
          const _Ok = _bind$4;
          expected_hcrc = _Ok._0;
        } else {
          const _Err = _bind$4;
          const _e = _Err._0;
          return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
        }
        const _bind$5 = pos;
        const _bind$6 = raw.end - raw.start | 0;
        const _bind$7 = member_start < 0 ? 0 : member_start > _bind$6 ? _bind$6 : member_start;
        const _bind$8 = _bind$5 < 0 ? 0 : _bind$5 > _bind$6 ? _bind$6 : _bind$5;
        const actual_hcrc = _M0FP39XinOrigin10moon__warc4gzip5crc32(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$7 | 0, raw.start + (_bind$8 > _bind$7 ? _bind$8 : _bind$7) | 0)) & 65535;
        if (expected_hcrc !== actual_hcrc) {
          return _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3369;
        }
        pos = pos + 2 | 0;
      }
      const _bind$4 = _M0FP39XinOrigin10moon__warc4gzip20inflate__raw_2einner(raw, pos, max_member_output_bytes);
      let _bind$5;
      if (_bind$4.$tag === 1) {
        const _Ok = _bind$4;
        _bind$5 = _Ok._0;
      } else {
        const _Err = _bind$4;
        const _e = _Err._0;
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      const _uncompressed = _bind$5._0;
      const _deflate_end = _bind$5._1;
      if ((total_len - _deflate_end | 0) < 8) {
        return _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einnerN6constrS3371;
      }
      const _bind$6 = _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__at(raw, _deflate_end);
      let expected_crc;
      if (_bind$6.$tag === 1) {
        const _Ok = _bind$6;
        expected_crc = _Ok._0;
      } else {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      const _bind$7 = _M0FP39XinOrigin10moon__warc4gzip17read__u32__le__at(raw, _deflate_end + 4 | 0);
      let expected_isize;
      if (_bind$7.$tag === 1) {
        const _Ok = _bind$7;
        expected_isize = _Ok._0;
      } else {
        const _Err = _bind$7;
        const _e = _Err._0;
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(_e);
      }
      const actual_crc = _M0FP39XinOrigin10moon__warc4gzip5crc32(new _M0TPC15bytes9BytesView(_uncompressed, 0, _uncompressed.length));
      if (actual_crc !== expected_crc) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "gzip member CRC-32 mismatch at offset ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(member_start, 10));
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError16ChecksumMismatch(_string_builder.val));
      }
      const actual_isize = _uncompressed.length;
      if (actual_isize !== expected_isize) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "gzip member ISIZE mismatch at offset ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(member_start, 10));
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE3Err(new _M0DTP39XinOrigin10moon__warc4gzip9GzipError12SizeMismatch(_string_builder.val));
      }
      const member_end = _deflate_end + 8 | 0;
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(members, new _M0TP39XinOrigin10moon__warc4gzip10GzipMember(BigInt.asUintN(64, BigInt(member_start)), BigInt.asUintN(64, BigInt(member_end - member_start | 0)), _uncompressed, actual_crc));
      pos = member_end;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc4gzip10GzipMemberERP39XinOrigin10moon__warc4gzip9GzipErrorE2Ok(members);
}
function _M0FPC28encoding4utf821utf8__find__malformed(src, src_offset, src_length) {
  const _bind = src_offset + src_length | 0;
  const _bind$2 = src.length;
  const _bind$3 = src_offset < 0 ? 0 : src_offset > _bind$2 ? _bind$2 : src_offset;
  const _bind$4 = _bind < 0 ? 0 : _bind > _bind$2 ? _bind$2 : _bind;
  const view = new _M0TPC15bytes9BytesView(src, _bind$3, _bind$4 > _bind$3 ? _bind$4 : _bind$3);
  let _tmp = view;
  while (true) {
    const bytes = _tmp;
    let malformed;
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            let rest$4;
            _L$5: {
              if ((bytes.end - bytes.start | 0) === 0) {
                return -1;
              } else {
                if ((bytes.end - bytes.start | 0) >= 8) {
                  const _x = bytes.buf[bytes.start];
                  if (_x <= 127) {
                    const _x$2 = bytes.buf[bytes.start + 1 | 0];
                    if (_x$2 <= 127) {
                      const _x$3 = bytes.buf[bytes.start + 2 | 0];
                      if (_x$3 <= 127) {
                        const _x$4 = bytes.buf[bytes.start + 3 | 0];
                        if (_x$4 <= 127) {
                          const _x$5 = bytes.buf[bytes.start + 4 | 0];
                          if (_x$5 <= 127) {
                            const _x$6 = bytes.buf[bytes.start + 5 | 0];
                            if (_x$6 <= 127) {
                              const _x$7 = bytes.buf[bytes.start + 6 | 0];
                              if (_x$7 <= 127) {
                                const _x$8 = bytes.buf[bytes.start + 7 | 0];
                                if (_x$8 <= 127) {
                                  const _x$9 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 8 | 0, bytes.end);
                                  _tmp = _x$9;
                                  continue;
                                } else {
                                  const _x$9 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                                  rest$4 = _x$9;
                                  break _L$5;
                                }
                              } else {
                                const _x$8 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                                rest$4 = _x$8;
                                break _L$5;
                              }
                            } else {
                              const _x$7 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                              rest$4 = _x$7;
                              break _L$5;
                            }
                          } else {
                            const _x$6 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                            rest$4 = _x$6;
                            break _L$5;
                          }
                        } else {
                          const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                          rest$4 = _x$5;
                          break _L$5;
                        }
                      } else {
                        const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                        rest$4 = _x$4;
                        break _L$5;
                      }
                    } else {
                      const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                      rest$4 = _x$3;
                      break _L$5;
                    }
                  } else {
                    if (_x >= 194 && _x <= 223) {
                      const _x$2 = bytes.buf[bytes.start + 1 | 0];
                      if (_x$2 >= 128 && _x$2 <= 191) {
                        const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 2 | 0, bytes.end);
                        rest$3 = _x$3;
                        break _L$4;
                      } else {
                        malformed = bytes;
                        break _L;
                      }
                    } else {
                      if (_x === 224) {
                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                        if (_x$2 >= 160 && _x$2 <= 191) {
                          const _x$3 = bytes.buf[bytes.start + 2 | 0];
                          if (_x$3 >= 128 && _x$3 <= 191) {
                            const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                            rest$2 = _x$4;
                            break _L$3;
                          } else {
                            malformed = bytes;
                            break _L;
                          }
                        } else {
                          malformed = bytes;
                          break _L;
                        }
                      } else {
                        if (_x >= 225 && _x <= 236) {
                          const _x$2 = bytes.buf[bytes.start + 1 | 0];
                          if (_x$2 >= 128 && _x$2 <= 191) {
                            const _x$3 = bytes.buf[bytes.start + 2 | 0];
                            if (_x$3 >= 128 && _x$3 <= 191) {
                              const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                              rest$2 = _x$4;
                              break _L$3;
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            malformed = bytes;
                            break _L;
                          }
                        } else {
                          if (_x === 237) {
                            const _x$2 = bytes.buf[bytes.start + 1 | 0];
                            if (_x$2 >= 128 && _x$2 <= 159) {
                              const _x$3 = bytes.buf[bytes.start + 2 | 0];
                              if (_x$3 >= 128 && _x$3 <= 191) {
                                const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                rest$2 = _x$4;
                                break _L$3;
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            if (_x >= 238 && _x <= 239) {
                              const _x$2 = bytes.buf[bytes.start + 1 | 0];
                              if (_x$2 >= 128 && _x$2 <= 191) {
                                const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                if (_x$3 >= 128 && _x$3 <= 191) {
                                  const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                  rest$2 = _x$4;
                                  break _L$3;
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              if (_x === 240) {
                                const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                if (_x$2 >= 144 && _x$2 <= 191) {
                                  const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                    const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                    if (_x$4 >= 128 && _x$4 <= 191) {
                                      const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                      rest = _x$5;
                                      break _L$2;
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                if (_x >= 241 && _x <= 243) {
                                  const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                  if (_x$2 >= 128 && _x$2 <= 191) {
                                    const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                      if (_x$4 >= 128 && _x$4 <= 191) {
                                        const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                        rest = _x$5;
                                        break _L$2;
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  if (_x === 244) {
                                    const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                    if (_x$2 >= 128 && _x$2 <= 143) {
                                      const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                      if (_x$3 >= 128 && _x$3 <= 191) {
                                        const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                        if (_x$4 >= 128 && _x$4 <= 191) {
                                          const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                          rest = _x$5;
                                          break _L$2;
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  const _x = bytes.buf[bytes.start];
                  if (_x >= 0 && _x <= 127) {
                    const _x$2 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                    rest$4 = _x$2;
                    break _L$5;
                  } else {
                    if ((bytes.end - bytes.start | 0) >= 2) {
                      if (_x >= 194 && _x <= 223) {
                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                        if (_x$2 >= 128 && _x$2 <= 191) {
                          const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 2 | 0, bytes.end);
                          rest$3 = _x$3;
                          break _L$4;
                        } else {
                          malformed = bytes;
                          break _L;
                        }
                      } else {
                        if ((bytes.end - bytes.start | 0) >= 3) {
                          if (_x === 224) {
                            const _x$2 = bytes.buf[bytes.start + 1 | 0];
                            if (_x$2 >= 160 && _x$2 <= 191) {
                              const _x$3 = bytes.buf[bytes.start + 2 | 0];
                              if (_x$3 >= 128 && _x$3 <= 191) {
                                const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                rest$2 = _x$4;
                                break _L$3;
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            if (_x >= 225 && _x <= 236) {
                              const _x$2 = bytes.buf[bytes.start + 1 | 0];
                              if (_x$2 >= 128 && _x$2 <= 191) {
                                const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                if (_x$3 >= 128 && _x$3 <= 191) {
                                  const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                  rest$2 = _x$4;
                                  break _L$3;
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              if (_x === 237) {
                                const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                if (_x$2 >= 128 && _x$2 <= 159) {
                                  const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                    const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                    rest$2 = _x$4;
                                    break _L$3;
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                if (_x >= 238 && _x <= 239) {
                                  const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                  if (_x$2 >= 128 && _x$2 <= 191) {
                                    const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                      rest$2 = _x$4;
                                      break _L$3;
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  if ((bytes.end - bytes.start | 0) >= 4) {
                                    if (_x === 240) {
                                      const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                      if (_x$2 >= 144 && _x$2 <= 191) {
                                        const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                        if (_x$3 >= 128 && _x$3 <= 191) {
                                          const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                          if (_x$4 >= 128 && _x$4 <= 191) {
                                            const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                            rest = _x$5;
                                            break _L$2;
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      if (_x >= 241 && _x <= 243) {
                                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                        if (_x$2 >= 128 && _x$2 <= 191) {
                                          const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                          if (_x$3 >= 128 && _x$3 <= 191) {
                                            const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                            if (_x$4 >= 128 && _x$4 <= 191) {
                                              const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                              rest = _x$5;
                                              break _L$2;
                                            } else {
                                              malformed = bytes;
                                              break _L;
                                            }
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        if (_x === 244) {
                                          const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                          if (_x$2 >= 128 && _x$2 <= 143) {
                                            const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                            if (_x$3 >= 128 && _x$3 <= 191) {
                                              const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                              if (_x$4 >= 128 && _x$4 <= 191) {
                                                const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                                rest = _x$5;
                                                break _L$2;
                                              } else {
                                                malformed = bytes;
                                                break _L;
                                              }
                                            } else {
                                              malformed = bytes;
                                              break _L;
                                            }
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      }
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          malformed = bytes;
                          break _L;
                        }
                      }
                    } else {
                      malformed = bytes;
                      break _L;
                    }
                  }
                }
              }
            }
            _tmp = rest$4;
            continue;
          }
          _tmp = rest$3;
          continue;
        }
        _tmp = rest$2;
        continue;
      }
      _tmp = rest;
      continue;
    }
    return malformed.start - src_offset | 0;
  }
}
function _M0FPC28encoding4utf825strict__malformed__suffix(bytes) {
  const input = bytes.buf;
  const src_offset = bytes.start;
  const src_length = bytes.end - bytes.start | 0;
  const malformed_offset = _M0FPC28encoding4utf821utf8__find__malformed(input, src_offset, src_length);
  const _bind = bytes.end - bytes.start | 0;
  const _bind$2 = malformed_offset < 0 ? 0 : malformed_offset > _bind ? _bind : malformed_offset;
  return new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + _bind$2 | 0, bytes.start + _bind | 0);
}
function _M0FPC28encoding4utf815drop__utf8__bom(bytes, ignore_bom) {
  _L: {
    if (ignore_bom) {
      _L$2: {
        if ((bytes.end - bytes.start | 0) >= 3) {
          const _x = bytes.buf[bytes.start];
          if (_x === 239) {
            const _x$2 = bytes.buf[bytes.start + 1 | 0];
            if (_x$2 === 187) {
              const _x$3 = bytes.buf[bytes.start + 2 | 0];
              if (_x$3 === 191) {
                return new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
              } else {
                break _L$2;
              }
            } else {
              break _L$2;
            }
          } else {
            break _L$2;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    } else {
      break _L;
    }
  }
  return bytes;
}
function _M0FPC28encoding4utf814decode_2einner(bytes, ignore_bom) {
  const result = _M0FPC28encoding4utf816decode__utf8__js(bytes.buf, bytes.start, bytes.end - bytes.start | 0, !ignore_bom);
  if (result.length === 1) {
    return new _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok(0 >>> 0 < result.length ? result[0] : $oob());
  } else {
    const bytes$2 = _M0FPC28encoding4utf815drop__utf8__bom(bytes, ignore_bom);
    return new _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err(new _M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed(_M0FPC28encoding4utf825strict__malformed__suffix(bytes$2)));
  }
}
function _M0FPC28encoding4utf821decode__lossy_2einner(bytes, ignore_bom) {
  return _M0FPC28encoding4utf823decode__utf8__lossy__js(bytes.buf, bytes.start, bytes.end - bytes.start | 0, !ignore_bom);
}
function _M0IP39XinOrigin10moon__warc6header11HeaderErrorPC15debug5Debug8to__repr(_x_185) {
  switch (_x_185.$tag) {
    case 0: {
      const _InvalidVersion = _x_185;
      const _$42$arg_186 = _InvalidVersion._0;
      return _M0MPC15debug4Repr4ctor("InvalidVersion", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_186) }], 1));
    }
    case 1: {
      const _InvalidHeaderLine = _x_185;
      const _$42$arg_187 = _InvalidHeaderLine._0;
      return _M0MPC15debug4Repr4ctor("InvalidHeaderLine", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_187) }], 1));
    }
    case 2: {
      const _MissingRequiredHeader = _x_185;
      const _$42$arg_188 = _MissingRequiredHeader._0;
      return _M0MPC15debug4Repr4ctor("MissingRequiredHeader", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_188) }], 1));
    }
    case 3: {
      const _InvalidDate = _x_185;
      const _$42$arg_189 = _InvalidDate._0;
      return _M0MPC15debug4Repr4ctor("InvalidDate", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_189) }], 1));
    }
    case 4: {
      const _InvalidContentLength = _x_185;
      const _$42$arg_190 = _InvalidContentLength._0;
      return _M0MPC15debug4Repr4ctor("InvalidContentLength", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_190) }], 1));
    }
    default: {
      return _M0MPC15debug4Repr4ctor("MissingTerminator", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
    }
  }
}
function _M0IP39XinOrigin10moon__warc6header8WarcTypePB2Eq5equal(_x_171, _x_172) {
  switch (_x_171.$tag) {
    case 0: {
      if (_x_172.$tag === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_172.$tag === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_172.$tag === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_172.$tag === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_172.$tag === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_172.$tag === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_172.$tag === 6) {
        return true;
      } else {
        return false;
      }
    }
    case 7: {
      if (_x_172.$tag === 7) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      const _Extension = _x_171;
      const _$42$x0_173 = _Extension._0;
      if (_x_172.$tag === 8) {
        const _Extension$2 = _x_172;
        const _$42$y0_174 = _Extension$2._0;
        return _$42$x0_173 === _$42$y0_174;
      } else {
        return false;
      }
    }
  }
}
function _M0MP39XinOrigin10moon__warc6header11WarcVersion16to__wire__string(self) {
  if (self === 0) {
    return "WARC/1.0";
  } else {
    return "WARC/1.1";
  }
}
function _M0MP39XinOrigin10moon__warc6header11WarcVersion5parse(line) {
  const s = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(line, undefined));
  return s === "WARC/1.0" ? _M0MP39XinOrigin10moon__warc6header11WarcVersion5parseN6constrS3560 : s === "WARC/1.1" ? _M0MP39XinOrigin10moon__warc6header11WarcVersion5parseN6constrS3561 : new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header11WarcVersionRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError14InvalidVersion(s));
}
function _M0MP39XinOrigin10moon__warc6header8WarcType16to__wire__string(self) {
  switch (self.$tag) {
    case 0: {
      return "warcinfo";
    }
    case 1: {
      return "response";
    }
    case 2: {
      return "resource";
    }
    case 3: {
      return "request";
    }
    case 4: {
      return "metadata";
    }
    case 5: {
      return "revisit";
    }
    case 6: {
      return "conversion";
    }
    case 7: {
      return "continuation";
    }
    default: {
      const _Extension = self;
      return _Extension._0;
    }
  }
}
function _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(a, b) {
  const len = a.end - a.start | 0;
  if (len !== (b.end - b.start | 0)) {
    return false;
  }
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if (i < 0 || i >= (a.end - a.start | 0)) {
        $panic();
      }
      const _p = a.str.charCodeAt(a.start + i | 0);
      const _tmp$2 = _p >= 65 && _p <= 90 ? _p + 32 | 0 : _p;
      if (i < 0 || i >= (b.end - b.start | 0)) {
        $panic();
      }
      const _p$2 = b.str.charCodeAt(b.start + i | 0);
      if (_tmp$2 !== (_p$2 >= 65 && _p$2 <= 90 ? _p$2 + 32 | 0 : _p$2)) {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MP39XinOrigin10moon__warc6header8WarcType5parse(val) {
  const trimmed = _M0MPC16string10StringView4trim(val, undefined);
  return _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3572) ? _M0DTP39XinOrigin10moon__warc6header8WarcType8WarcInfo__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3573) ? _M0DTP39XinOrigin10moon__warc6header8WarcType8Response__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3574) ? _M0DTP39XinOrigin10moon__warc6header8WarcType8Resource__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3575) ? _M0DTP39XinOrigin10moon__warc6header8WarcType7Request__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3576) ? _M0DTP39XinOrigin10moon__warc6header8WarcType8Metadata__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3577) ? _M0DTP39XinOrigin10moon__warc6header8WarcType7Revisit__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3578) ? _M0DTP39XinOrigin10moon__warc6header8WarcType10Conversion__ : _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(trimmed, _M0MP39XinOrigin10moon__warc6header8WarcType5parseN6recordS3579) ? _M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation__ : new _M0DTP39XinOrigin10moon__warc6header8WarcType9Extension(_M0MPC16string10StringView9to__owned(trimmed));
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader3new(version, fields) {
  return new _M0TP39XinOrigin10moon__warc6header10WarcHeader(version, fields);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader5parse(raw) {
  const text = _M0FPC28encoding4utf821decode__lossy_2einner(raw, false);
  const raw_lines = new _M0TPB5ArrayGsE([], 0);
  const _it = _M0MPC16string6String5split(text, _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3584);
  while (true) {
    const _bind = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _part = _Some;
      const _bind$2 = _M0MPC16string10StringView13strip__suffix(_part, _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3585);
      let line;
      if (_bind$2 === undefined) {
        line = _M0MPC16string10StringView9to__owned(_part);
      } else {
        const _Some$2 = _bind$2;
        const _s = _Some$2;
        line = _M0MPC16string10StringView9to__owned(_s);
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(raw_lines, line);
      continue;
    }
  }
  let _tmp;
  if (raw_lines.len === 0) {
    _tmp = true;
  } else {
    if (0 >= raw_lines.len) {
      $panic();
    }
    const _p = raw_lines.buf[0];
    _tmp = _p === "";
  }
  if (_tmp) {
    return _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3587;
  }
  if (0 >= raw_lines.len) {
    $panic();
  }
  const _bind = raw_lines.buf[0];
  const _bind$2 = _M0MP39XinOrigin10moon__warc6header11WarcVersion5parse(new _M0TPC16string10StringView(_bind, 0, _bind.length));
  let version;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    version = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _e = _Err._0;
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(_e);
  }
  const fields = new _M0TPB5ArrayGUssEE([], 0);
  const _bind$3 = raw_lines.len;
  let _tmp$2 = 1;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$3) {
      if (i < 0 || i >= raw_lines.len) {
        $panic();
      }
      const line = raw_lines.buf[i];
      if (line === "") {
        return _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6constrS3589;
      }
      const first_ch = 0 >>> 0 < line.length ? line.charCodeAt(0) : $oob();
      if (first_ch === 32 || first_ch === 9) {
        if (fields.len === 0) {
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine(line));
        }
        const last_idx = fields.len - 1 | 0;
        if (last_idx < 0 || last_idx >= fields.len) {
          $panic();
        }
        const _bind$4 = fields.buf[last_idx];
        const _k = _bind$4._0;
        const _v = _bind$4._1;
        const cont = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(line, undefined));
        const merged = _v === "" ? cont : cont === "" ? _v : `${_v} ${cont}`;
        const _bind$5 = { _0: _k, _1: merged };
        if (last_idx < 0 || last_idx >= fields.len) {
          $panic();
        }
        fields.buf[last_idx] = _bind$5;
      } else {
        const _bind$4 = _M0MPC16string6String11split__once(line, _M0MP39XinOrigin10moon__warc6header10WarcHeader5parseN6recordS3590);
        if (_bind$4 === undefined) {
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine(line));
        } else {
          const _Some = _bind$4;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          const name = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_k, undefined));
          if (name === "") {
            return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError17InvalidHeaderLine(line));
          }
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: name, _1: _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_v, undefined)) });
        }
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header10WarcHeaderRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(new _M0TP39XinOrigin10moon__warc6header10WarcHeader(version, fields));
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, name) {
  const _bind = self.fields;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const pair = _bind$3[_];
      const _bind$4 = pair._0;
      if (_M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length), name)) {
        return pair._1;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader8get__all(self, name) {
  const out = new _M0TPB5ArrayGsE([], 0);
  const _bind = self.fields;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const pair = _bind$3[_];
      const _bind$4 = pair._0;
      if (_M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length), name)) {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, pair._1);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(self, name, value) {
  const next = new _M0TPB5ArrayGUssEE([], 0);
  let replaced = false;
  const _bind = self.fields;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const pair = _bind$3[_];
      let _tmp$2;
      if (!replaced) {
        const _bind$4 = pair._0;
        _tmp$2 = _M0FP39XinOrigin10moon__warc6header23eq__ignore__ascii__case(new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length), new _M0TPC16string10StringView(name, 0, name.length));
      } else {
        _tmp$2 = false;
      }
      if (_tmp$2) {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(next, { _0: pair._0, _1: value });
        replaced = true;
      } else {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(next, pair);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (!replaced) {
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(next, { _0: name, _1: value });
  }
  return new _M0TP39XinOrigin10moon__warc6header10WarcHeader(self.version, next);
}
function _M0FP39XinOrigin10moon__warc6header20parse__nonneg__int32(raw) {
  const s = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(raw, undefined));
  if (s === "") {
    return undefined;
  }
  let acc = 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c < 48 || c > 57) {
        return undefined;
      }
      const digit = c - 48 | 0;
      if (acc > 214748364 || acc === 214748364 && digit > 7) {
        return undefined;
      }
      acc = (Math.imul(acc, 10) | 0) + digit | 0;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP39XinOrigin10moon__warc6header20parse__nonneg__int64(raw) {
  const s = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(raw, undefined));
  if (s === "") {
    return undefined;
  }
  let acc = 0n;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c < 48 || c > 57) {
        return undefined;
      }
      const digit = BigInt.asUintN(64, BigInt(c - 48 | 0));
      if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, 922337203685477580n) || BigInt.asUintN(64, acc) === BigInt.asUintN(64, 922337203685477580n) && BigInt.asIntN(64, digit) > BigInt.asIntN(64, 7n)) {
        return undefined;
      }
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + digit);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(self) {
  const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__typeN6recordS3675);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _v = _Some;
    return _M0MP39XinOrigin10moon__warc6header8WarcType5parse(new _M0TPC16string10StringView(_v, 0, _v.length));
  }
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__idN6recordS3680);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__dateN6recordS3682);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__length(self) {
  const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6recordS3684);
  if (_bind === undefined) {
    return _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__lengthN6constrS3686;
  } else {
    const _Some = _bind;
    const _raw = _Some;
    const _bind$2 = _M0FP39XinOrigin10moon__warc6header20parse__nonneg__int64(_raw);
    if (_bind$2 === undefined) {
      return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError20InvalidContentLength(_raw));
    } else {
      const _Some$2 = _bind$2;
      const _n = _Some$2;
      return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(_n);
    }
  }
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uriN6recordS3694);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__type(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__typeN6recordS3696);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digest(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digestN6recordS3698);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digestN6recordS3700);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader10refers__to(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader10refers__toN6recordS3702);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader14concurrent__to(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader8get__all(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader14concurrent__toN6recordS3704);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader7profile(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader7profileN6recordS3706);
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__number(self) {
  const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__numberN6recordS3708);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _raw = _Some;
    return _M0FP39XinOrigin10moon__warc6header20parse__nonneg__int32(_raw);
  }
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader19segment__origin__id(self) {
  return _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(self, _M0MP39XinOrigin10moon__warc6header10WarcHeader19segment__origin__idN6recordS3713);
}
function _M0FP39XinOrigin10moon__warc6header22sanitize__header__name(name) {
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind = name.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = name.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = name.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      if (_decoded_char !== 13 && (_decoded_char !== 10 && _decoded_char !== 58)) {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc6header23sanitize__header__value(value) {
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind = value.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = value.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = value.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      if (_decoded_char === 13 || _decoded_char === 10) {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, 32);
      } else {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0MP39XinOrigin10moon__warc6header10WarcHeader9serialize(self) {
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _p = _M0MP39XinOrigin10moon__warc6header11WarcVersion16to__wire__string(self.version);
  sb.val = `${sb.val}${_p}`;
  const _p$2 = "\r\n";
  sb.val = `${sb.val}${_p$2}`;
  const _bind = self.fields;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const pair = _bind$3[_];
      _L: {
        const k = _M0FP39XinOrigin10moon__warc6header22sanitize__header__name(pair._0);
        if (k === "") {
          break _L;
        }
        sb.val = `${sb.val}${k}`;
        const _p$3 = ": ";
        sb.val = `${sb.val}${_p$3}`;
        const _p$4 = _M0FP39XinOrigin10moon__warc6header23sanitize__header__value(pair._1);
        sb.val = `${sb.val}${_p$4}`;
        const _p$5 = "\r\n";
        sb.val = `${sb.val}${_p$5}`;
        break _L;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _p$3 = "\r\n";
  sb.val = `${sb.val}${_p$3}`;
  const text = sb.val;
  const buf = _M0MPC16buffer6Buffer14Buffer_2einner(Math.imul(text.length, 2) | 0);
  _M0MPC16buffer6Buffer19write__string__utf8(buf, new _M0TPC16string10StringView(text, 0, text.length));
  return _M0MPC16buffer6Buffer9to__bytes(buf);
}
function _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(s, start, len) {
  if ((start + len | 0) > s.length) {
    return undefined;
  }
  let acc = 0;
  const _bind = start + len | 0;
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c < 48 || c > 57) {
        return undefined;
      }
      acc = (Math.imul(acc, 10) | 0) + (c - 48 | 0) | 0;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP39XinOrigin10moon__warc6header14is__leap__year(year) {
  return (year % 4 | 0) === 0 && (year % 100 | 0) !== 0 || (year % 400 | 0) === 0;
}
function _M0FP39XinOrigin10moon__warc6header15days__in__month(year, month) {
  switch (month) {
    case 1: {
      return 31;
    }
    case 3: {
      return 31;
    }
    case 5: {
      return 31;
    }
    case 7: {
      return 31;
    }
    case 8: {
      return 31;
    }
    case 10: {
      return 31;
    }
    case 12: {
      return 31;
    }
    case 4: {
      return 30;
    }
    case 6: {
      return 30;
    }
    case 9: {
      return 30;
    }
    case 11: {
      return 30;
    }
    case 2: {
      return _M0FP39XinOrigin10moon__warc6header14is__leap__year(year) ? 29 : 28;
    }
    default: {
      return 0;
    }
  }
}
function _M0FP39XinOrigin10moon__warc6header4pad2(v) {
  return v < 10 ? `0${_M0MPC13int3Int18to__string_2einner(v, 10)}` : _M0MPC13int3Int18to__string_2einner(v, 10);
}
function _M0FP39XinOrigin10moon__warc6header4pad4(v) {
  return v < 10 ? `000${_M0MPC13int3Int18to__string_2einner(v, 10)}` : v < 100 ? `00${_M0MPC13int3Int18to__string_2einner(v, 10)}` : v < 1000 ? `0${_M0MPC13int3Int18to__string_2einner(v, 10)}` : _M0MPC13int3Int18to__string_2einner(v, 10);
}
function _M0FP39XinOrigin10moon__warc6header28build__validated__warc__date(year, month, day, hour, minute, second, fraction, raw) {
  if (year < 1 || (month < 1 || month > 12)) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  }
  if (day < 1 || day > _M0FP39XinOrigin10moon__warc6header15days__in__month(year, month)) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  }
  if (hour < 0 || (hour > 23 || (minute < 0 || (minute > 59 || (second < 0 || second > 59))))) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  }
  return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE2Ok(new _M0TP39XinOrigin10moon__warc6header8WarcDate(year, month, day, hour, minute, second, fraction, raw));
}
function _M0MP39XinOrigin10moon__warc6header8WarcDate5parse(raw_view) {
  const raw = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(raw_view, undefined));
  const len = raw.length;
  if (len < 20) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  }
  let _tmp;
  if ((4 >>> 0 < raw.length ? raw.charCodeAt(4) : $oob()) !== 45) {
    _tmp = true;
  } else {
    let _tmp$2;
    if ((7 >>> 0 < raw.length ? raw.charCodeAt(7) : $oob()) !== 45) {
      _tmp$2 = true;
    } else {
      let _tmp$3;
      if ((10 >>> 0 < raw.length ? raw.charCodeAt(10) : $oob()) !== 84) {
        _tmp$3 = true;
      } else {
        let _tmp$4;
        if ((13 >>> 0 < raw.length ? raw.charCodeAt(13) : $oob()) !== 58) {
          _tmp$4 = true;
        } else {
          let _tmp$5;
          if ((16 >>> 0 < raw.length ? raw.charCodeAt(16) : $oob()) !== 58) {
            _tmp$5 = true;
          } else {
            const _tmp$6 = len - 1 | 0;
            _tmp$5 = (_tmp$6 >>> 0 < raw.length ? raw.charCodeAt(_tmp$6) : $oob()) !== 90;
          }
          _tmp$4 = _tmp$5;
        }
        _tmp$3 = _tmp$4;
      }
      _tmp$2 = _tmp$3;
    }
    _tmp = _tmp$2;
  }
  if (_tmp) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  }
  const _bind = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 0, 4);
  let year;
  if (_bind === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind;
    year = _Some;
  }
  const _bind$2 = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 5, 2);
  let month;
  if (_bind$2 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind$2;
    month = _Some;
  }
  const _bind$3 = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 8, 2);
  let day;
  if (_bind$3 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind$3;
    day = _Some;
  }
  const _bind$4 = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 11, 2);
  let hour;
  if (_bind$4 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind$4;
    hour = _Some;
  }
  const _bind$5 = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 14, 2);
  let minute;
  if (_bind$5 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind$5;
    minute = _Some;
  }
  const _bind$6 = _M0FP39XinOrigin10moon__warc6header20parse__fixed__digits(raw, 17, 2);
  let second;
  if (_bind$6 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
  } else {
    const _Some = _bind$6;
    second = _Some;
  }
  let fraction;
  if (len === 20) {
    fraction = undefined;
  } else {
    if ((19 >>> 0 < raw.length ? raw.charCodeAt(19) : $oob()) !== 46 || len === 21) {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
    }
    const _bind$7 = len - 1 | 0;
    let _tmp$2 = 20;
    while (true) {
      const i = _tmp$2;
      if (i < _bind$7) {
        const c = i >>> 0 < raw.length ? raw.charCodeAt(i) : $oob();
        if (c < 48 || c > 57) {
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc6header8WarcDateRP39XinOrigin10moon__warc6header11HeaderErrorE3Err(new _M0DTP39XinOrigin10moon__warc6header11HeaderError11InvalidDate(raw));
        }
        _tmp$2 = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    fraction = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(raw, 20, len - 1 | 0));
  }
  return _M0FP39XinOrigin10moon__warc6header28build__validated__warc__date(year, month, day, hour, minute, second, fraction, raw);
}
function _M0MP39XinOrigin10moon__warc6header8WarcDate19to__cdxj__timestamp(self) {
  return `${_M0FP39XinOrigin10moon__warc6header4pad4(self.year)}${_M0FP39XinOrigin10moon__warc6header4pad2(self.month)}${_M0FP39XinOrigin10moon__warc6header4pad2(self.day)}${_M0FP39XinOrigin10moon__warc6header4pad2(self.hour)}${_M0FP39XinOrigin10moon__warc6header4pad2(self.minute)}${_M0FP39XinOrigin10moon__warc6header4pad2(self.second)}`;
}
function _M0FP39XinOrigin10moon__warc13http__payload19find__header__split(raw) {
  const _bind = _M0MPC15bytes9BytesView4find(raw, _M0FP39XinOrigin10moon__warc13http__payload19find__header__splitN6recordS3795);
  const _bind$2 = _M0MPC15bytes9BytesView4find(raw, _M0FP39XinOrigin10moon__warc13http__payload19find__header__splitN6recordS3796);
  if (_bind === undefined) {
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _b = _Some;
      return { _0: _b, _1: _b + 2 | 0 };
    }
  } else {
    const _Some = _bind;
    const _a = _Some;
    if (_bind$2 === undefined) {
      return { _0: _a, _1: _a + 4 | 0 };
    } else {
      const _Some$2 = _bind$2;
      const _b = _Some$2;
      return _a <= _b ? { _0: _a, _1: _a + 4 | 0 } : { _0: _b, _1: _b + 2 | 0 };
    }
  }
}
function _M0FP39XinOrigin10moon__warc13http__payload17parse__ascii__int(s) {
  if (s === "") {
    return undefined;
  }
  let acc = 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c < 48 || c > 57) {
        return undefined;
      }
      acc = (Math.imul(acc, 10) | 0) + (c - 48 | 0) | 0;
      if (acc > 999999) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP39XinOrigin10moon__warc13http__payload20parse__header__lines(lines) {
  const out = new _M0TPB5ArrayGUssEE([], 0);
  const _bind = lines.len;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      _L: {
        if (i < 0 || i >= lines.len) {
          $panic();
        }
        const line = lines.buf[i];
        if (line === "") {
          return _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6constrS3813;
        }
        if (_M0MPC16string6String11has__prefix(line, _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3814) || _M0MPC16string6String11has__prefix(line, _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3815)) {
          if (out.len === 0) {
            return new _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine(line));
          }
          const last_idx = out.len - 1 | 0;
          if (last_idx < 0 || last_idx >= out.len) {
            $panic();
          }
          const _bind$2 = out.buf[last_idx];
          const _prev_k = _bind$2._0;
          const _prev_v = _bind$2._1;
          const folded = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(line, undefined));
          const _bind$3 = folded === "" ? { _0: _prev_k, _1: _prev_v } : _prev_v === "" ? { _0: _prev_k, _1: folded } : { _0: _prev_k, _1: `${_prev_v} ${folded}` };
          if (last_idx < 0 || last_idx >= out.len) {
            $panic();
          }
          out.buf[last_idx] = _bind$3;
          break _L;
        }
        const _bind$2 = _M0MPC16string6String11split__once(line, _M0FP39XinOrigin10moon__warc13http__payload20parse__header__linesN6recordS3816);
        if (_bind$2 === undefined) {
          return new _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine(line));
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          const name = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_k, undefined));
          if (name === "") {
            return new _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError17InvalidHeaderLine(line));
          }
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, { _0: name, _1: _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_v, undefined)) });
        }
        break _L;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGRPB5ArrayGUssEERP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(out);
}
function _M0FP39XinOrigin10moon__warc13http__payload20split__header__lines(header_bytes) {
  const header_str = _M0FPC28encoding4utf821decode__lossy_2einner(header_bytes, false);
  const lines = new _M0TPB5ArrayGsE([], 0);
  const _it = _M0MPC16string6String5split(header_str, _M0FP39XinOrigin10moon__warc13http__payload20split__header__linesN6recordS3836);
  while (true) {
    const _bind = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _line_v = _Some;
      const _bind$2 = _M0MPC16string10StringView13strip__suffix(_line_v, _M0FP39XinOrigin10moon__warc13http__payload20split__header__linesN6recordS3837);
      let clean;
      if (_bind$2 === undefined) {
        clean = _M0MPC16string10StringView9to__owned(_line_v);
      } else {
        const _Some$2 = _bind$2;
        const _stripped = _Some$2;
        clean = _M0MPC16string10StringView9to__owned(_stripped);
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(lines, clean);
      continue;
    }
  }
  return lines;
}
function _M0FP39XinOrigin10moon__warc13http__payload13header__value(headers, name) {
  const target = _M0MPC16string6String9to__lower(_M0MPC16string10StringView9to__owned(name));
  const _bind = headers.len;
  const _bind$2 = headers.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const pair = _bind$2[_];
      if (_M0MPC16string6String9to__lower(pair._0) === target) {
        return pair._1;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(raw) {
  const _bind = _M0FP39XinOrigin10moon__warc13http__payload19find__header__split(raw);
  let _bind$2;
  if (_bind === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError23MissingHeaderTerminator__);
  } else {
    const _Some = _bind;
    _bind$2 = _Some;
  }
  const _header_end = _bind$2._0;
  const _body_start = _bind$2._1;
  const _bind$3 = raw.end - raw.start | 0;
  const _bind$4 = 0 > _bind$3 ? _bind$3 : 0;
  const _bind$5 = _header_end < 0 ? 0 : _header_end > _bind$3 ? _bind$3 : _header_end;
  const lines = _M0FP39XinOrigin10moon__warc13http__payload20split__header__lines(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$4 | 0, raw.start + (_bind$5 > _bind$4 ? _bind$5 : _bind$4) | 0));
  let _tmp;
  if (lines.len === 0) {
    _tmp = true;
  } else {
    if (0 >= lines.len) {
      $panic();
    }
    const _p = lines.buf[0];
    _tmp = _p === "";
  }
  if (_tmp) {
    return _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6constrS3859;
  }
  if (0 >= lines.len) {
    $panic();
  }
  const start = lines.buf[0];
  const _bind$6 = _M0MPC16string6String11split__once(start, _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3860);
  if (_bind$6 === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine(start));
  } else {
    const _Some = _bind$6;
    const _x = _Some;
    const _v = _x._0;
    const _r = _x._1;
    const version = _M0MPC16string10StringView9to__owned(_v);
    const rest1 = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView11trim__start(_r, undefined));
    if (!_M0MPC16string6String11has__prefix(version, _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3861)) {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine(start));
    }
    let code_str;
    let reason;
    _L: {
      const _bind$7 = _M0MPC16string6String11split__once(rest1, _M0FP39XinOrigin10moon__warc13http__payload21parse__http__responseN6recordS3862);
      if (_bind$7 === undefined) {
        code_str = rest1;
        reason = "";
        break _L;
      } else {
        const _Some$2 = _bind$7;
        const _x$2 = _Some$2;
        const _c = _x$2._0;
        const _r$2 = _x$2._1;
        code_str = _M0MPC16string10StringView9to__owned(_c);
        reason = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_r$2, undefined));
        break _L;
      }
    }
    const _bind$7 = _M0FP39XinOrigin10moon__warc13http__payload17parse__ascii__int(code_str);
    let status_code;
    if (_bind$7 === undefined) {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine(start));
    } else {
      const _Some$2 = _bind$7;
      const _c = _Some$2;
      if (_c >= 100 && _c <= 599) {
        status_code = _c;
      } else {
        return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidStartLine(start));
      }
    }
    const _bind$8 = _M0FP39XinOrigin10moon__warc13http__payload20parse__header__lines(lines);
    let headers;
    if (_bind$8.$tag === 1) {
      const _Ok = _bind$8;
      headers = _Ok._0;
    } else {
      const _Err = _bind$8;
      const _e = _Err._0;
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_e);
    }
    const _bind$9 = raw.end - raw.start | 0;
    const _bind$10 = raw.end - raw.start | 0;
    const _bind$11 = _body_start < 0 ? 0 : _body_start > _bind$10 ? _bind$10 : _body_start;
    const _bind$12 = _bind$9 < 0 ? 0 : _bind$9 > _bind$10 ? _bind$10 : _bind$9;
    const body = _M0MPC15bytes9BytesView9to__owned(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$11 | 0, raw.start + (_bind$12 > _bind$11 ? _bind$12 : _bind$11) | 0));
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc13http__payload12HttpResponseRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(new _M0TP39XinOrigin10moon__warc13http__payload12HttpResponse(version, status_code, reason, headers, body));
  }
}
function _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(self) {
  const _bind = _M0FP39XinOrigin10moon__warc13http__payload13header__value(self.headers, _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mimeN6recordS3903);
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _ct = _Some;
    const _bind$2 = _M0MPC16string6String11split__once(_ct, _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mimeN6recordS3904);
    let mime;
    if (_bind$2 === undefined) {
      mime = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(_ct, undefined));
    } else {
      const _Some$2 = _bind$2;
      const _x = _Some$2;
      const _m = _x._0;
      mime = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_m, undefined));
    }
    return mime === "" ? undefined : _M0MPC16string6String9to__lower(mime);
  }
}
function _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse8location(self) {
  return _M0FP39XinOrigin10moon__warc13http__payload13header__value(self.headers, _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse8locationN6recordS3914);
}
function _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse11is__chunked(self) {
  const _bind = self.headers;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const pair = _bind$3[_];
      if (_M0MPC16string6String9to__lower(pair._0) === "transfer-encoding") {
        const lower_val = _M0MPC16string6String9to__lower(pair._1);
        const _it = _M0MPC16string6String5split(lower_val, _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse11is__chunkedN6recordS3916);
        while (true) {
          const _bind$4 = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
          if (_bind$4 === undefined) {
            break;
          } else {
            const _Some = _bind$4;
            const _part = _Some;
            if (_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_part, undefined)) === "chunked") {
              return true;
            }
            continue;
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FP39XinOrigin10moon__warc13http__payload16parse__hex__size(s) {
  const _bind = _M0MPC16string6String11split__once(s, _M0FP39XinOrigin10moon__warc13http__payload16parse__hex__sizeN6recordS3930);
  let clean;
  if (_bind === undefined) {
    clean = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(s, undefined));
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _sz = _x._0;
    clean = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_sz, undefined));
  }
  if (clean === "") {
    return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidChunkSize(s));
  }
  let val = 0;
  const _bind$2 = clean.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const c = i >>> 0 < clean.length ? clean.charCodeAt(i) : $oob();
      let digit;
      if (c >= 48 && c <= 57) {
        digit = c - 48 | 0;
      } else {
        if (c >= 97 && c <= 102) {
          digit = (c - 97 | 0) + 10 | 0;
        } else {
          if (c >= 65 && c <= 70) {
            digit = (c - 65 | 0) + 10 | 0;
          } else {
            return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidChunkSize(s));
          }
        }
      }
      if (val > 134217727) {
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(new _M0DTP39XinOrigin10moon__warc13http__payload9HttpError16InvalidChunkSize(s));
      }
      val = val << 4 | digit;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(val);
}
function _M0FP39XinOrigin10moon__warc13http__payload15decode__chunked(raw) {
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(raw.end - raw.start | 0);
  const len = raw.end - raw.start | 0;
  let pos = 0;
  while (true) {
    if (pos >= len) {
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody__);
    }
    const _bind = pos;
    const _bind$2 = raw.end - raw.start | 0;
    const _bind$3 = _bind < 0 ? 0 : _bind > _bind$2 ? _bind$2 : _bind;
    const _bind$4 = len < 0 ? 0 : len > _bind$2 ? _bind$2 : len;
    const slice = new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$3 | 0, raw.start + (_bind$4 > _bind$3 ? _bind$4 : _bind$3) | 0);
    const _bind$5 = _M0MPC15bytes9BytesView4find(slice, _M0FP39XinOrigin10moon__warc13http__payload15decode__chunkedN6recordS3943);
    let line_end;
    if (_bind$5 === undefined) {
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf__);
    } else {
      const _Some = _bind$5;
      line_end = _Some;
    }
    const _bind$6 = pos;
    const _bind$7 = pos + line_end | 0;
    const _bind$8 = raw.end - raw.start | 0;
    const _bind$9 = _bind$6 < 0 ? 0 : _bind$6 > _bind$8 ? _bind$8 : _bind$6;
    const _bind$10 = _bind$7 < 0 ? 0 : _bind$7 > _bind$8 ? _bind$8 : _bind$7;
    const size_line = _M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$9 | 0, raw.start + (_bind$10 > _bind$9 ? _bind$10 : _bind$9) | 0), false);
    const _bind$11 = _M0FP39XinOrigin10moon__warc13http__payload16parse__hex__size(size_line);
    let chunk_size;
    if (_bind$11.$tag === 1) {
      const _Ok = _bind$11;
      chunk_size = _Ok._0;
    } else {
      const _Err = _bind$11;
      const _e = _Err._0;
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_e);
    }
    pos = (pos + line_end | 0) + 2 | 0;
    if (chunk_size === 0) {
      while (true) {
        if ((pos + 2 | 0) > len) {
          return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody__);
        }
        let _tmp;
        const _bind$12 = pos;
        if (_bind$12 < 0 || _bind$12 >= (raw.end - raw.start | 0)) {
          $panic();
        }
        if (raw.buf[raw.start + _bind$12 | 0] === 13) {
          const _bind$13 = pos + 1 | 0;
          if (_bind$13 < 0 || _bind$13 >= (raw.end - raw.start | 0)) {
            $panic();
          }
          _tmp = raw.buf[raw.start + _bind$13 | 0] === 10;
        } else {
          _tmp = false;
        }
        if (_tmp) {
          return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(_M0MPC16buffer6Buffer9to__bytes(out));
        }
        const _bind$13 = pos;
        const _bind$14 = raw.end - raw.start | 0;
        const _bind$15 = _bind$13 < 0 ? 0 : _bind$13 > _bind$14 ? _bind$14 : _bind$13;
        const _bind$16 = len < 0 ? 0 : len > _bind$14 ? _bind$14 : len;
        const rem = new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$15 | 0, raw.start + (_bind$16 > _bind$15 ? _bind$16 : _bind$15) | 0);
        const _bind$17 = _M0MPC15bytes9BytesView4find(rem, _M0FP39XinOrigin10moon__warc13http__payload15decode__chunkedN6recordS3944);
        if (_bind$17 === undefined) {
          return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf__);
        } else {
          const _Some = _bind$17;
          const _rel = _Some;
          pos = (pos + _rel | 0) + 2 | 0;
        }
        continue;
      }
    }
    if ((pos + chunk_size | 0) > len) {
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody__);
    }
    const _bind$12 = pos;
    const _bind$13 = pos + chunk_size | 0;
    const _bind$14 = raw.end - raw.start | 0;
    const _bind$15 = _bind$12 < 0 ? 0 : _bind$12 > _bind$14 ? _bind$14 : _bind$12;
    const _bind$16 = _bind$13 < 0 ? 0 : _bind$13 > _bind$14 ? _bind$14 : _bind$13;
    _M0MPC16buffer6Buffer16write__bytesview(out, new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$15 | 0, raw.start + (_bind$16 > _bind$15 ? _bind$16 : _bind$15) | 0));
    pos = pos + chunk_size | 0;
    if ((pos + 2 | 0) > len) {
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError18TruncatedChunkBody__);
    }
    let _tmp;
    const _bind$17 = pos;
    if (_bind$17 < 0 || _bind$17 >= (raw.end - raw.start | 0)) {
      $panic();
    }
    if (raw.buf[raw.start + _bind$17 | 0] !== 13) {
      _tmp = true;
    } else {
      const _bind$18 = pos + 1 | 0;
      if (_bind$18 < 0 || _bind$18 >= (raw.end - raw.start | 0)) {
        $panic();
      }
      _tmp = raw.buf[raw.start + _bind$18 | 0] !== 10;
    }
    if (_tmp) {
      return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE3Err(_M0DTP39XinOrigin10moon__warc13http__payload9HttpError16MissingChunkCrlf__);
    }
    pos = pos + 2 | 0;
    continue;
  }
}
function _M0FP39XinOrigin10moon__warc13http__payload21extract__entity__body(resp) {
  if (_M0MP39XinOrigin10moon__warc13http__payload12HttpResponse11is__chunked(resp)) {
    const _bind = resp.body;
    return _M0FP39XinOrigin10moon__warc13http__payload15decode__chunked(new _M0TPC15bytes9BytesView(_bind, 0, _bind.length));
  } else {
    return new _M0DTPB6ResultGzRP39XinOrigin10moon__warc13http__payload9HttpErrorE2Ok(resp.body);
  }
}
function _M0IP39XinOrigin10moon__warc5codec10CodecErrorPC15debug5Debug8to__repr(_x_220) {
  switch (_x_220.$tag) {
    case 0: {
      const _HeaderError = _x_220;
      const _$42$arg_221 = _HeaderError._0;
      return _M0MPC15debug4Repr4ctor("HeaderError", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IP39XinOrigin10moon__warc6header11HeaderErrorPC15debug5Debug8to__repr(_$42$arg_221) }], 1));
    }
    case 1: {
      const _UnexpectedEof = _x_220;
      const _$42$arg_222 = _UnexpectedEof._0;
      return _M0MPC15debug4Repr4ctor("UnexpectedEof", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_222) }], 1));
    }
    case 2: {
      const _InvalidTrailingSeparator = _x_220;
      const _$42$arg_223 = _InvalidTrailingSeparator._0;
      return _M0MPC15debug4Repr4ctor("InvalidTrailingSeparator", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_223) }], 1));
    }
    case 3: {
      const _InvalidContentLength = _x_220;
      const _$42$arg_224 = _InvalidContentLength._0;
      return _M0MPC15debug4Repr4ctor("InvalidContentLength", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_224) }], 1));
    }
    case 4: {
      const _LimitExceeded = _x_220;
      const _$42$arg_225 = _LimitExceeded._0;
      return _M0MPC15debug4Repr4ctor("LimitExceeded", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_225) }], 1));
    }
    default: {
      const _GzipError = _x_220;
      const _$42$arg_226 = _GzipError._0;
      return _M0MPC15debug4Repr4ctor("GzipError", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([{ _0: undefined, _1: _M0IP39XinOrigin10moon__warc4gzip9GzipErrorPC15debug5Debug8to__repr(_$42$arg_226) }], 1));
    }
  }
}
function _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload) {
  return new _M0TP39XinOrigin10moon__warc5codec10WarcRecord(_M0MP39XinOrigin10moon__warc6header10WarcHeader3new(version, fields), payload, 0n, 0n);
}
function _M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einner(record_id, date, payload, filename, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einnerN5tupleS4005, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, _M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einnerN5tupleS4006], 4);
  if (filename === undefined) {
  } else {
    const _Some = filename;
    const _f = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Filename", _1: _f });
  }
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) });
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec22build__request_2einner(record_id, date, target_uri, payload, concurrent_to, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec22build__request_2einnerN5tupleS4015, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, { _0: "WARC-Target-URI", _1: target_uri }, _M0FP39XinOrigin10moon__warc5codec22build__request_2einnerN5tupleS4016], 5);
  if (concurrent_to === undefined) {
  } else {
    const _Some = concurrent_to;
    const _c = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Concurrent-To", _1: _c });
  }
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) });
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec23build__response_2einner(record_id, date, target_uri, payload, concurrent_to, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec23build__response_2einnerN5tupleS4026, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, { _0: "WARC-Target-URI", _1: target_uri }, _M0FP39XinOrigin10moon__warc5codec23build__response_2einnerN5tupleS4027], 5);
  if (concurrent_to === undefined) {
  } else {
    const _Some = concurrent_to;
    const _c = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Concurrent-To", _1: _c });
  }
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) });
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec23build__resource_2einner(record_id, date, target_uri, content_type, payload, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec23build__resource_2einnerN5tupleS4037, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, { _0: "WARC-Target-URI", _1: target_uri }, { _0: "Content-Type", _1: content_type }, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) }], 6);
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec23build__metadata_2einner(record_id, date, target_uri, payload, concurrent_to, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec23build__metadata_2einnerN5tupleS4045, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, { _0: "WARC-Target-URI", _1: target_uri }, _M0FP39XinOrigin10moon__warc5codec23build__metadata_2einnerN5tupleS4046], 5);
  if (concurrent_to === undefined) {
  } else {
    const _Some = concurrent_to;
    const _c = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Concurrent-To", _1: _c });
  }
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) });
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec22build__revisit_2einner(record_id, date, target_uri, profile, payload_digest, refers_to, refers_to_target_uri, refers_to_date, payload, version) {
  const fields = new _M0TPB5ArrayGUssEE([_M0FP39XinOrigin10moon__warc5codec22build__revisit_2einnerN5tupleS4056, { _0: "WARC-Record-ID", _1: record_id }, { _0: "WARC-Date", _1: date }, { _0: "WARC-Target-URI", _1: target_uri }, { _0: "WARC-Profile", _1: profile }, { _0: "WARC-Payload-Digest", _1: payload_digest }], 6);
  if (refers_to === undefined) {
  } else {
    const _Some = refers_to;
    const _r = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Refers-To", _1: _r });
  }
  if (refers_to_target_uri === undefined) {
  } else {
    const _Some = refers_to_target_uri;
    const _u = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Refers-To-Target-URI", _1: _u });
  }
  if (refers_to_date === undefined) {
  } else {
    const _Some = refers_to_date;
    const _d = _Some;
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "WARC-Refers-To-Date", _1: _d });
  }
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, _M0FP39XinOrigin10moon__warc5codec22build__revisit_2einnerN5tupleS4057);
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(fields, { _0: "Content-Length", _1: _M0MPC13int3Int18to__string_2einner(payload.length, 10) });
  return _M0FP39XinOrigin10moon__warc5codec12make__record(version, fields, payload);
}
function _M0FP39XinOrigin10moon__warc5codec22encode__record_2einner(record, auto_digest) {
  let hdr;
  if (auto_digest) {
    const _tmp = _M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(record.header, "Content-Length", _M0MPC13int3Int18to__string_2einner(record.payload.length, 10));
    const _bind = record.payload;
    let h = _M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(_tmp, "WARC-Block-Digest", _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(new _M0TPC15bytes9BytesView(_bind, 0, _bind.length)));
    const _bind$2 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(h);
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      switch (_x.$tag) {
        case 1: {
          const _bind$3 = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(h, _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4075);
          if (_bind$3 === undefined) {
            const _bind$4 = record.payload;
            const _bind$5 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$4, 0, _bind$4.length));
            if (_bind$5.$tag === 1) {
              const _Ok = _bind$5;
              const _resp = _Ok._0;
              const _bind$6 = _M0FP39XinOrigin10moon__warc13http__payload21extract__entity__body(_resp);
              if (_bind$6.$tag === 1) {
                const _Ok$2 = _bind$6;
                const _entity = _Ok$2._0;
                h = _M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(h, "WARC-Payload-Digest", _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(new _M0TPC15bytes9BytesView(_entity, 0, _entity.length)));
              }
            }
          }
          break;
        }
        case 2: {
          const _bind$4 = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(h, _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4076);
          if (_bind$4 === undefined) {
            const _bind$5 = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(h, _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4077);
            if (_bind$5 === undefined) {
            } else {
              const _tmp$2 = h;
              const _bind$6 = record.payload;
              h = _M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(_tmp$2, "WARC-Payload-Digest", _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(new _M0TPC15bytes9BytesView(_bind$6, 0, _bind$6.length)));
            }
          }
          break;
        }
      }
    }
    hdr = h;
  } else {
    hdr = record.header;
  }
  const hdr_bytes = _M0MP39XinOrigin10moon__warc6header10WarcHeader9serialize(hdr);
  const out = _M0MPC16buffer6Buffer14Buffer_2einner((hdr_bytes.length + record.payload.length | 0) + 4 | 0);
  _M0MPC16buffer6Buffer12write__bytes(out, new _M0TPC15bytes9BytesView(hdr_bytes, 0, hdr_bytes.length));
  const _bind = record.payload;
  _M0MPC16buffer6Buffer12write__bytes(out, new _M0TPC15bytes9BytesView(_bind, 0, _bind.length));
  _M0MPC16buffer6Buffer12write__bytes(out, _M0FP39XinOrigin10moon__warc5codec22encode__record_2einnerN6recordS4078);
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0FP39XinOrigin10moon__warc5codec19encode__all_2einner(records, auto_digest) {
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(1024);
  const _bind = records.len;
  const _bind$2 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const rec = _bind$2[_];
      const _bind$3 = _M0FP39XinOrigin10moon__warc5codec22encode__record_2einner(rec, auto_digest);
      _M0MPC16buffer6Buffer12write__bytes(out, new _M0TPC15bytes9BytesView(_bind$3, 0, _bind$3.length));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0FP39XinOrigin10moon__warc5codec26encode__record__gz_2einner(record, auto_digest, level) {
  const wire = _M0FP39XinOrigin10moon__warc5codec22encode__record_2einner(record, auto_digest);
  return _M0FP39XinOrigin10moon__warc4gzip16compress_2einner(new _M0TPC15bytes9BytesView(wire, 0, wire.length), level);
}
function _M0FP39XinOrigin10moon__warc5codec23encode__all__gz_2einner(records, auto_digest, level) {
  const out = _M0MPC16buffer6Buffer14Buffer_2einner(1024);
  const _bind = records.len;
  const _bind$2 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const rec = _bind$2[_];
      const _bind$3 = _M0FP39XinOrigin10moon__warc5codec26encode__record__gz_2einner(rec, auto_digest, level);
      _M0MPC16buffer6Buffer12write__bytes(out, new _M0TPC15bytes9BytesView(_bind$3, 0, _bind$3.length));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC16buffer6Buffer9to__bytes(out);
}
function _M0FP39XinOrigin10moon__warc5codec17checked__add__i64(a, b) {
  return BigInt.asIntN(64, b) < BigInt.asIntN(64, 0n) || (BigInt.asIntN(64, a) < BigInt.asIntN(64, 0n) || BigInt.asIntN(64, a) > BigInt.asIntN(64, BigInt.asUintN(64, 9223372036854775807n - b))) ? undefined : BigInt.asUintN(64, a + b);
}
function _M0FP39XinOrigin10moon__warc5codec20find__crlfcrlf__view(raw, start, total_len, max_header_bytes) {
  const limit = total_len - 3 | 0;
  let i = start;
  while (true) {
    if (i < limit) {
      if (max_header_bytes >= 0 && (i - start | 0) > max_header_bytes) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "WARC header exceeds max_header_bytes (";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(max_header_bytes, 10));
        const _p$2 = ")";
        _string_builder.val = `${_string_builder.val}${_p$2}`;
        return new _M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded(_string_builder.val));
      }
      let _tmp;
      const _bind = i;
      if (_bind < 0 || _bind >= (raw.end - raw.start | 0)) {
        $panic();
      }
      if (raw.buf[raw.start + _bind | 0] === 13) {
        let _tmp$2;
        const _bind$2 = i + 1 | 0;
        if (_bind$2 < 0 || _bind$2 >= (raw.end - raw.start | 0)) {
          $panic();
        }
        if (raw.buf[raw.start + _bind$2 | 0] === 10) {
          let _tmp$3;
          const _bind$3 = i + 2 | 0;
          if (_bind$3 < 0 || _bind$3 >= (raw.end - raw.start | 0)) {
            $panic();
          }
          if (raw.buf[raw.start + _bind$3 | 0] === 13) {
            const _bind$4 = i + 3 | 0;
            if (_bind$4 < 0 || _bind$4 >= (raw.end - raw.start | 0)) {
              $panic();
            }
            _tmp$3 = raw.buf[raw.start + _bind$4 | 0] === 10;
          } else {
            _tmp$3 = false;
          }
          _tmp$2 = _tmp$3;
        } else {
          _tmp$2 = false;
        }
        _tmp = _tmp$2;
      } else {
        _tmp = false;
      }
      if (_tmp) {
        return new _M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(i);
      }
      i = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGOiRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(undefined);
}
function _M0FP39XinOrigin10moon__warc5codec17scan__all_2einner(raw, limits, on_record) {
  const total_len = raw.end - raw.start | 0;
  let pos = 0;
  let consumed = 0n;
  let count = 0n;
  while (true) {
    if (pos < total_len) {
      const _bind = _M0FP39XinOrigin10moon__warc5codec20find__crlfcrlf__view(raw, pos, total_len, limits.max_header_bytes);
      let end_idx;
      if (_bind.$tag === 0) {
        const _Err = _bind;
        const _e = _Err._0;
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_e);
      } else {
        const _Ok = _bind;
        const _x = _Ok._0;
        if (_x === undefined) {
          const rem = total_len - pos | 0;
          if (limits.max_header_bytes >= 0 && rem > limits.max_header_bytes) {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "unterminated WARC header exceeds max_header_bytes (";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(limits.max_header_bytes, 10));
            const _p$2 = ")";
            _string_builder.val = `${_string_builder.val}${_p$2}`;
            return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded(_string_builder.val));
          }
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "trailing ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(rem, 10));
          const _p$2 = " bytes of incomplete WARC header at EOF";
          _string_builder.val = `${_string_builder.val}${_p$2}`;
          return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13UnexpectedEof(_string_builder.val));
        } else {
          const _Some = _x;
          end_idx = _Some;
        }
      }
      const hdr_body_len = end_idx - pos | 0;
      if (limits.max_header_bytes >= 0 && hdr_body_len > limits.max_header_bytes) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "WARC header exceeds max_header_bytes (";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(limits.max_header_bytes, 10));
        const _p$2 = ")";
        _string_builder.val = `${_string_builder.val}${_p$2}`;
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded(_string_builder.val));
      }
      const hdr_len = BigInt.asUintN(64, BigInt(hdr_body_len + 4 | 0));
      const rec_offset = consumed;
      const _bind$2 = pos;
      const _bind$3 = raw.end - raw.start | 0;
      const _bind$4 = _bind$2 < 0 ? 0 : _bind$2 > _bind$3 ? _bind$3 : _bind$2;
      const _bind$5 = end_idx < 0 ? 0 : end_idx > _bind$3 ? _bind$3 : end_idx;
      const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader5parse(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$4 | 0, raw.start + (_bind$5 > _bind$4 ? _bind$5 : _bind$4) | 0));
      let hdr;
      if (_bind$6.$tag === 1) {
        const _Ok = _bind$6;
        hdr = _Ok._0;
      } else {
        const _Err = _bind$6;
        const _e = _Err._0;
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError11HeaderError(_e));
      }
      const _bind$7 = _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__length(hdr);
      let content_len_i64;
      if (_bind$7.$tag === 1) {
        const _Ok = _bind$7;
        content_len_i64 = _Ok._0;
      } else {
        const _Err = _bind$7;
        const _e = _Err._0;
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError11HeaderError(_e));
      }
      if (limits.max_payload_bytes >= 0 && BigInt.asIntN(64, content_len_i64) > BigInt.asIntN(64, BigInt.asUintN(64, BigInt(limits.max_payload_bytes)))) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "WARC Content-Length ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC15int645Int6418to__string_2einner(content_len_i64, 10));
        const _p$2 = " exceeds max_payload_bytes (";
        _string_builder.val = `${_string_builder.val}${_p$2}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(limits.max_payload_bytes, 10));
        const _p$3 = ")";
        _string_builder.val = `${_string_builder.val}${_p$3}`;
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13LimitExceeded(_string_builder.val));
      }
      if (BigInt.asIntN(64, content_len_i64) > BigInt.asIntN(64, 2147483647n)) {
        return _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4140;
      }
      const content_len = Number(BigInt.asIntN(32, content_len_i64)) | 0;
      const payload_start = end_idx + 4 | 0;
      const avail_after_hdr = total_len - payload_start | 0;
      if (avail_after_hdr < content_len) {
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "truncated WARC payload at EOF: expected ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(content_len, 10));
        const _p$2 = " bytes, got ";
        _string_builder.val = `${_string_builder.val}${_p$2}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(avail_after_hdr, 10));
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError13UnexpectedEof(_string_builder.val));
      }
      const sep_start = payload_start + content_len | 0;
      const avail_after_payload = total_len - sep_start | 0;
      if (avail_after_payload < 4) {
        return _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4142;
      }
      let _tmp;
      if (sep_start < 0 || sep_start >= (raw.end - raw.start | 0)) {
        $panic();
      }
      if (raw.buf[raw.start + sep_start | 0] !== 13) {
        _tmp = true;
      } else {
        let _tmp$2;
        const _bind$8 = sep_start + 1 | 0;
        if (_bind$8 < 0 || _bind$8 >= (raw.end - raw.start | 0)) {
          $panic();
        }
        if (raw.buf[raw.start + _bind$8 | 0] !== 10) {
          _tmp$2 = true;
        } else {
          let _tmp$3;
          const _bind$9 = sep_start + 2 | 0;
          if (_bind$9 < 0 || _bind$9 >= (raw.end - raw.start | 0)) {
            $panic();
          }
          if (raw.buf[raw.start + _bind$9 | 0] !== 13) {
            _tmp$3 = true;
          } else {
            const _bind$10 = sep_start + 3 | 0;
            if (_bind$10 < 0 || _bind$10 >= (raw.end - raw.start | 0)) {
              $panic();
            }
            _tmp$3 = raw.buf[raw.start + _bind$10 | 0] !== 10;
          }
          _tmp$2 = _tmp$3;
        }
        _tmp = _tmp$2;
      }
      if (_tmp) {
        const sep_offset = BigInt.asUintN(64, BigInt.asUintN(64, rec_offset + hdr_len) + content_len_i64);
        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
        const _p = "expected \\r\\n\\r\\n after WARC payload at offset ";
        _string_builder.val = `${_string_builder.val}${_p}`;
        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC15int645Int6418to__string_2einner(sep_offset, 10));
        return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError24InvalidTrailingSeparator(_string_builder.val));
      }
      const _bind$8 = _M0FP39XinOrigin10moon__warc5codec17checked__add__i64(BigInt.asUintN(64, hdr_len + content_len_i64), 4n);
      let total_rec_len;
      if (_bind$8 === undefined) {
        return _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4144;
      } else {
        const _Some = _bind$8;
        total_rec_len = _Some;
      }
      const _bind$9 = _M0FP39XinOrigin10moon__warc5codec17checked__add__i64(consumed, total_rec_len);
      let next_consumed;
      if (_bind$9 === undefined) {
        return _M0FP39XinOrigin10moon__warc5codec17scan__all_2einnerN6constrS4146;
      } else {
        const _Some = _bind$9;
        next_consumed = _Some;
      }
      const _bind$10 = raw.end - raw.start | 0;
      const _bind$11 = payload_start < 0 ? 0 : payload_start > _bind$10 ? _bind$10 : payload_start;
      const _bind$12 = sep_start < 0 ? 0 : sep_start > _bind$10 ? _bind$10 : sep_start;
      const payload = _M0MPC15bytes9BytesView9to__owned(new _M0TPC15bytes9BytesView(raw.buf, raw.start + _bind$11 | 0, raw.start + (_bind$12 > _bind$11 ? _bind$12 : _bind$11) | 0));
      on_record(new _M0TP39XinOrigin10moon__warc5codec10WarcRecord(hdr, payload, rec_offset, total_rec_len));
      pos = sep_start + 4 | 0;
      consumed = next_consumed;
      count = BigInt.asUintN(64, count + 1n);
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGlRP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(count);
}
function _M0FP39XinOrigin10moon__warc5codec18parse__all_2einner(raw, limits) {
  const out = new _M0TPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordE([], 0);
  const _bind = _M0FP39XinOrigin10moon__warc5codec17scan__all_2einner(raw, limits, (rec) => {
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, rec);
  });
  if (_bind.$tag === 1) {
    return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(out);
  } else {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_e);
  }
}
function _M0FP39XinOrigin10moon__warc5codec22parse__all__gz_2einner(raw, limits) {
  let max_member_out;
  if (limits.max_header_bytes >= 0 && limits.max_payload_bytes >= 0) {
    const sum = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, BigInt(limits.max_header_bytes)) + BigInt.asUintN(64, BigInt(limits.max_payload_bytes))) + 1024n);
    max_member_out = BigInt.asIntN(64, sum) > BigInt.asIntN(64, 2147483647n) ? 2147483647 : Number(BigInt.asIntN(32, sum)) | 0;
  } else {
    max_member_out = 67108864;
  }
  const _bind = _M0FP39XinOrigin10moon__warc4gzip27decompress__members_2einner(raw, max_member_out);
  let members;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    members = _Ok._0;
  } else {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE3Err(new _M0DTP39XinOrigin10moon__warc5codec10CodecError9GzipError(_e));
  }
  const out = new _M0TPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordE([], 0);
  const _bind$2 = members.len;
  const _bind$3 = members.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const m = _bind$3[_];
      const _bind$4 = m.uncompressed;
      const _bind$5 = _M0FP39XinOrigin10moon__warc5codec18parse__all_2einner(new _M0TPC15bytes9BytesView(_bind$4, 0, _bind$4.length), limits);
      let recs;
      if (_bind$5.$tag === 1) {
        const _Ok = _bind$5;
        recs = _Ok._0;
      } else {
        const _Err = _bind$5;
        const _e = _Err._0;
        return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE3Err(_e);
      }
      const _bind$6 = recs.len;
      const _bind$7 = recs.buf;
      let _tmp$2 = 0;
      while (true) {
        const _$2 = _tmp$2;
        if (_$2 < _bind$6) {
          const rec = _bind$7[_$2];
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, new _M0TP39XinOrigin10moon__warc5codec10WarcRecord(rec.header, rec.payload, m.compressed_offset, m.compressed_length));
          _tmp$2 = _$2 + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPB6ResultGRPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordERP39XinOrigin10moon__warc5codec10CodecErrorE2Ok(out);
}
function _M0FP39XinOrigin10moon__warc4surt17is__valid__scheme(s) {
  if (s === "") {
    return false;
  }
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      const is_alpha = c >= 97 && c <= 122 || c >= 65 && c <= 90;
      const is_digit = c >= 48 && c <= 57;
      const is_extra = c === 43 || (c === 45 || c === 46);
      if (i === 0) {
        if (!is_alpha) {
          return false;
        }
      } else {
        if (!(is_alpha || (is_digit || is_extra))) {
          return false;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FP39XinOrigin10moon__warc4surt11parse__port(s) {
  if (s === "") {
    return _M0FP39XinOrigin10moon__warc4surt11parse__portN6constrS4247;
  }
  let acc = 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c < 48 || c > 57) {
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(new _M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort(s));
      }
      acc = (Math.imul(acc, 10) | 0) + (c - 48 | 0) | 0;
      if (acc > 65535) {
        return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(new _M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort(s));
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (acc === 0) {
    return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(new _M0DTP39XinOrigin10moon__warc4surt9SurtError11InvalidPort(s));
  }
  return new _M0DTPB6ResultGiRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(acc);
}
function _M0FP39XinOrigin10moon__warc4surt29find__first__authority__delim(s) {
  const len = s.length;
  let idx = len;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      const c = i >>> 0 < s.length ? s.charCodeAt(i) : $oob();
      if (c === 47 || (c === 63 || c === 35)) {
        idx = i;
        break;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return idx;
}
function _M0FP39XinOrigin10moon__warc4surt6substr(s, start, end) {
  return _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(s, start, end));
}
function _M0FP39XinOrigin10moon__warc4surt10parse__uri(raw) {
  const trimmed = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(raw, undefined));
  if (trimmed === "") {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError8EmptyUri__);
  }
  const _bind = _M0MPC16string6String11split__once(trimmed, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4263);
  if (_bind === undefined) {
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme__);
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _s = _x._0;
    const _rest = _x._1;
    const scheme_raw = _M0MPC16string10StringView9to__owned(_s);
    const after_scheme = _M0MPC16string10StringView9to__owned(_rest);
    const scheme = _M0MPC16string6String9to__lower(scheme_raw);
    if (!_M0FP39XinOrigin10moon__warc4surt17is__valid__scheme(scheme)) {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError13MissingScheme__);
    }
    const auth_end = _M0FP39XinOrigin10moon__warc4surt29find__first__authority__delim(after_scheme);
    const authority = _M0FP39XinOrigin10moon__warc4surt6substr(after_scheme, 0, auth_end);
    const tail = _M0FP39XinOrigin10moon__warc4surt6substr(after_scheme, auth_end, after_scheme.length);
    if (authority === "") {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__);
    }
    let userinfo;
    let host_port;
    _L: {
      const _bind$2 = _M0MPC16string6String16rev__split__once(authority, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4268);
      if (_bind$2 === undefined) {
        userinfo = undefined;
        host_port = authority;
        break _L;
      } else {
        const _Some$2 = _bind$2;
        const _x$2 = _Some$2;
        const _u = _x$2._0;
        const _hp = _x$2._1;
        userinfo = _M0MPC16string10StringView9to__owned(_u);
        host_port = _M0MPC16string10StringView9to__owned(_hp);
        break _L;
      }
    }
    if (host_port === "") {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__);
    }
    let host;
    let port;
    _L$2: {
      if ((0 >>> 0 < host_port.length ? host_port.charCodeAt(0) : $oob()) === 91) {
        const _bind$2 = _M0MPC16string6String4find(host_port, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4266);
        if (_bind$2 === undefined) {
          return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__);
        } else {
          const _Some$2 = _bind$2;
          const _rb = _Some$2;
          const h = _M0MPC16string6String9to__lower(_M0FP39XinOrigin10moon__warc4surt6substr(host_port, 0, _rb + 1 | 0));
          const rest_hp = _M0FP39XinOrigin10moon__warc4surt6substr(host_port, _rb + 1 | 0, host_port.length);
          if (rest_hp === "") {
            host = h;
            port = undefined;
            break _L$2;
          } else {
            if ((0 >>> 0 < rest_hp.length ? rest_hp.charCodeAt(0) : $oob()) === 58) {
              const _bind$3 = _M0FP39XinOrigin10moon__warc4surt11parse__port(_M0FP39XinOrigin10moon__warc4surt6substr(rest_hp, 1, rest_hp.length));
              if (_bind$3.$tag === 1) {
                const _Ok = _bind$3;
                const _p = _Ok._0;
                host = h;
                port = _p;
                break _L$2;
              } else {
                const _Err = _bind$3;
                const _e = _Err._0;
                return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_e);
              }
            } else {
              return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__);
            }
          }
        }
      } else {
        const _bind$2 = _M0MPC16string6String16rev__split__once(host_port, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4267);
        if (_bind$2 === undefined) {
          host = _M0MPC16string6String9to__lower(host_port);
          port = undefined;
          break _L$2;
        } else {
          const _Some$2 = _bind$2;
          const _x$2 = _Some$2;
          const _h = _x$2._0;
          const _p_str = _x$2._1;
          const p_owned = _M0MPC16string10StringView9to__owned(_p_str);
          const _bind$3 = _M0FP39XinOrigin10moon__warc4surt11parse__port(p_owned);
          if (_bind$3.$tag === 1) {
            const _Ok = _bind$3;
            const _p = _Ok._0;
            host = _M0MPC16string6String9to__lower(_M0MPC16string10StringView9to__owned(_h));
            port = _p;
            break _L$2;
          } else {
            const _Err = _bind$3;
            const _e = _Err._0;
            return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_e);
          }
        }
      }
    }
    if (host === "") {
      return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_M0DTP39XinOrigin10moon__warc4surt9SurtError11MissingHost__);
    }
    let before_frag;
    let fragment;
    _L$3: {
      const _bind$2 = _M0MPC16string6String11split__once(tail, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4265);
      if (_bind$2 === undefined) {
        before_frag = tail;
        fragment = undefined;
        break _L$3;
      } else {
        const _Some$2 = _bind$2;
        const _x$2 = _Some$2;
        const _bf = _x$2._0;
        const _f = _x$2._1;
        before_frag = _M0MPC16string10StringView9to__owned(_bf);
        fragment = _M0MPC16string10StringView9to__owned(_f);
        break _L$3;
      }
    }
    let path_raw;
    let query;
    _L$4: {
      const _bind$2 = _M0MPC16string6String11split__once(before_frag, _M0FP39XinOrigin10moon__warc4surt10parse__uriN6recordS4264);
      if (_bind$2 === undefined) {
        path_raw = before_frag;
        query = undefined;
        break _L$4;
      } else {
        const _Some$2 = _bind$2;
        const _x$2 = _Some$2;
        const _p = _x$2._0;
        const _q = _x$2._1;
        path_raw = _M0MPC16string10StringView9to__owned(_p);
        query = _M0MPC16string10StringView9to__owned(_q);
        break _L$4;
      }
    }
    const path = path_raw === "" ? "/" : path_raw;
    return new _M0DTPB6ResultGRP39XinOrigin10moon__warc4surt9ParsedUriRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(new _M0TP39XinOrigin10moon__warc4surt9ParsedUri(scheme, userinfo, host, port, path, query, fragment));
  }
}
function _M0FP39XinOrigin10moon__warc4surt8is__ipv4(host) {
  const parts = _M0MPB4Iter9to__arrayGRPC16string10StringViewE(_M0MPC16string6String5split(host, _M0FP39XinOrigin10moon__warc4surt8is__ipv4N6recordS4331));
  if (parts.len !== 4) {
    return false;
  }
  const _bind = parts.len;
  const _bind$2 = parts.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const part_v = _bind$2[_];
      const part = _M0MPC16string10StringView9to__owned(part_v);
      if (part === "" || part.length > 3) {
        return false;
      }
      let val = 0;
      const _bind$3 = part.length;
      let _tmp$2 = 0;
      while (true) {
        const i = _tmp$2;
        if (i < _bind$3) {
          const c = i >>> 0 < part.length ? part.charCodeAt(i) : $oob();
          if (c < 48 || c > 57) {
            return false;
          }
          val = (Math.imul(val, 10) | 0) + (c - 48 | 0) | 0;
          _tmp$2 = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      if (val > 255) {
        return false;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FP39XinOrigin10moon__warc4surt17is__default__port(scheme, port) {
  return scheme === "http" && port === 80 || (scheme === "https" && port === 443 || (scheme === "ftp" && port === 21 || (scheme === "ws" && port === 80 || scheme === "wss" && port === 443)));
}
function _M0FP39XinOrigin10moon__warc4surt15normalize__path(raw_path) {
  const segments = new _M0TPB5ArrayGsE([], 0);
  const trailing_slash = _M0MPC16string6String11has__suffix(raw_path, _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4347);
  const _it = _M0MPC16string6String5split(raw_path, _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4348);
  while (true) {
    const _bind = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _seg_v = _Some;
      const seg = _M0MPC16string10StringView9to__owned(_seg_v);
      if (seg === "" || seg === ".") {
        continue;
      } else {
        if (seg === "..") {
          _M0MPC15array5Array3popGsE(segments);
        } else {
          _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(segments, seg);
        }
      }
      continue;
    }
  }
  if (segments.len === 0) {
    return "/";
  }
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind = segments.len;
  const _bind$2 = segments.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const seg = _bind$2[_];
      _M0IPB13StringBuilderPB6Logger11write__char(sb, 47);
      sb.val = `${sb.val}${seg}`;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (trailing_slash && (!_M0MPC16string6String11has__suffix(raw_path, _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4349) && !_M0MPC16string6String11has__suffix(raw_path, _M0FP39XinOrigin10moon__warc4surt15normalize__pathN6recordS4350))) {
    _M0IPB13StringBuilderPB6Logger11write__char(sb, 47);
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc4surt10surt__host(host) {
  const clean = _M0MPC16string6String11has__suffix(host, _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4366) && host.length > 1 ? _M0FP39XinOrigin10moon__warc4surt6substr(host, 0, host.length - 1 | 0) : host;
  if (_M0MPC16string6String11has__prefix(clean, _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4367) || _M0FP39XinOrigin10moon__warc4surt8is__ipv4(clean)) {
    return clean;
  }
  const labels = new _M0TPB5ArrayGsE([], 0);
  const _it = _M0MPC16string6String5split(clean, _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4368);
  while (true) {
    const _bind = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _lbl = _Some;
      const s = _M0MPC16string10StringView9to__owned(_lbl);
      if (!(s === "")) {
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(labels, s);
      }
      continue;
    }
  }
  _M0MPC15array5Array14rev__in__placeGsE(labels);
  return _M0MPC15array5Array4joinGsE(labels, _M0FP39XinOrigin10moon__warc4surt10surt__hostN6recordS4369);
}
function _M0FP39XinOrigin10moon__warc4surt11sort__query(query) {
  const params = new _M0TPB5ArrayGUsssEE([], 0);
  const _it = _M0MPC16string6String5split(query, _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4379);
  while (true) {
    const _bind = _M0MPB4Iter4nextGUsRPC14json4JsonEE(_it);
    if (_bind === undefined) {
      break;
    } else {
      const _Some = _bind;
      const _part_v = _Some;
      const part = _M0MPC16string10StringView9to__owned(_part_v);
      if (part === "") {
        continue;
      }
      let k;
      let v;
      _L: {
        const _bind$2 = _M0MPC16string6String11split__once(part, _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4380);
        if (_bind$2 === undefined) {
          k = part;
          v = "";
          break _L;
        } else {
          const _Some$2 = _bind$2;
          const _x = _Some$2;
          const _kv = _x._0;
          const _vv = _x._1;
          k = _M0MPC16string10StringView9to__owned(_kv);
          v = _M0MPC16string10StringView9to__owned(_vv);
          break _L;
        }
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(params, { _0: k, _1: v, _2: part });
      continue;
    }
  }
  _M0MPC15array5Array8sort__byGUsssEE(params, (a, b) => {
    const ck = _M0MPC16string6String16lexical__compare(a._0, b._0);
    if (ck !== 0) {
      return ck;
    } else {
      const cv = _M0MPC16string6String16lexical__compare(a._1, b._1);
      return cv !== 0 ? cv : _M0MPC16string6String16lexical__compare(a._2, b._2);
    }
  });
  const rendered = new _M0TPB5ArrayGsE([], 0);
  const _bind = params.len;
  const _bind$2 = params.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const p = _bind$2[_];
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(rendered, p._2);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC15array5Array4joinGsE(rendered, _M0FP39XinOrigin10moon__warc4surt11sort__queryN6recordS4381);
}
function _M0FP39XinOrigin10moon__warc4surt18hex__upper__nibble(n) {
  const v = n & 15;
  if (v < 10) {
    const _p = _M0MPC13int3Int8to__char(48 + v | 0);
    return _p === -1 ? $panic() : _p;
  } else {
    const _p = _M0MPC13int3Int8to__char((65 + v | 0) - 10 | 0);
    return _p === -1 ? $panic() : _p;
  }
}
function _M0FP39XinOrigin10moon__warc4surt32percent__encode__surt__component(s) {
  let needs_escape = false;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = s.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      const code = _decoded_char;
      if (code <= 32 || code === 127) {
        needs_escape = true;
        break;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  if (!needs_escape) {
    return s;
  }
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind$2 = s.length;
  let _tmp$2 = 0;
  while (true) {
    const _string_index = _tmp$2;
    if (_string_index < _bind$2) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$3 = s.charCodeAt(_string_index);
        if (_bind$3 >= 55296 && _bind$3 <= 56319 && (_string_index + 1 | 0) < _bind$2) {
          const _bind$4 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$4 >= 56320 && _bind$4 <= 57343) {
            const _tmp$3 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$3 - 55296 | 0, 1024) | 0) + _bind$4 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$3;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$3 = _string_index + 1 | 0;
            const _p = _bind$3;
            _decoded_next_string_index = _tmp$3;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$3 = _string_index + 1 | 0;
          const _p = _bind$3;
          _decoded_next_string_index = _tmp$3;
          _decoded_char = _p;
          break _L;
        }
      }
      const code = _decoded_char;
      if (code <= 32 || code === 127) {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, 37);
        _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc4surt18hex__upper__nibble(code >> 4 & 15));
        _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc4surt18hex__upper__nibble(code & 15));
      } else {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
      }
      _tmp$2 = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc4surt8to__surt(raw) {
  const _bind = _M0FP39XinOrigin10moon__warc4surt10parse__uri(raw);
  if (_bind.$tag === 0) {
    const _Err = _bind;
    const _e = _Err._0;
    return new _M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE3Err(_e);
  } else {
    const _Ok = _bind;
    const _uri = _Ok._0;
    const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
    const _p = _M0FP39XinOrigin10moon__warc4surt32percent__encode__surt__component(_M0FP39XinOrigin10moon__warc4surt10surt__host(_uri.host));
    sb.val = `${sb.val}${_p}`;
    const _bind$2 = _uri.port;
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _p$2 = _Some;
      if (!_M0FP39XinOrigin10moon__warc4surt17is__default__port(_uri.scheme, _p$2)) {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, 58);
        const _p$3 = _M0MPC13int3Int18to__string_2einner(_p$2, 10);
        sb.val = `${sb.val}${_p$3}`;
      }
    }
    _M0IPB13StringBuilderPB6Logger11write__char(sb, 41);
    const _p$2 = _M0FP39XinOrigin10moon__warc4surt32percent__encode__surt__component(_M0FP39XinOrigin10moon__warc4surt15normalize__path(_uri.path));
    sb.val = `${sb.val}${_p$2}`;
    const _bind$3 = _uri.query;
    if (_bind$3 === undefined) {
    } else {
      const _Some = _bind$3;
      const _q = _Some;
      const sq = _M0FP39XinOrigin10moon__warc4surt11sort__query(_q);
      if (!(sq === "")) {
        _M0IPB13StringBuilderPB6Logger11write__char(sb, 63);
        const _p$3 = _M0FP39XinOrigin10moon__warc4surt32percent__encode__surt__component(sq);
        sb.val = `${sb.val}${_p$3}`;
      }
    }
    return new _M0DTPB6ResultGsRP39XinOrigin10moon__warc4surt9SurtErrorE2Ok(sb.val);
  }
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex7entries(self) {
  return _M0MPC15array5Array4copyGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE(self.entries);
}
function _M0FP39XinOrigin10moon__warc4cdxj19strip__mime__params(ct) {
  const _bind = _M0MPC16string6String11split__once(ct, _M0FP39XinOrigin10moon__warc4cdxj19strip__mime__paramsN6recordS4447);
  let mime;
  if (_bind === undefined) {
    mime = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(ct, undefined));
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _m = _x._0;
    mime = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_m, undefined));
  }
  return mime === "" ? undefined : _M0MPC16string6String9to__lower(mime);
}
function _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(s, start, len) {
  if (start < 0 || (len <= 0 || (start + len | 0) > s.length)) {
    return undefined;
  }
  let acc = 0;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      const _tmp$2 = start + i | 0;
      const c = _tmp$2 >>> 0 < s.length ? s.charCodeAt(_tmp$2) : $oob();
      if (c < 48 || c > 57) {
        return undefined;
      }
      acc = (Math.imul(acc, 10) | 0) + (c - 48 | 0) | 0;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return acc;
}
function _M0FP39XinOrigin10moon__warc4cdxj14is__leap__year(year) {
  return (year % 4 | 0) === 0 && (year % 100 | 0) !== 0 || (year % 400 | 0) === 0;
}
function _M0FP39XinOrigin10moon__warc4cdxj15days__in__month(year, month) {
  switch (month) {
    case 1: {
      return 31;
    }
    case 3: {
      return 31;
    }
    case 5: {
      return 31;
    }
    case 7: {
      return 31;
    }
    case 8: {
      return 31;
    }
    case 10: {
      return 31;
    }
    case 12: {
      return 31;
    }
    case 4: {
      return 30;
    }
    case 6: {
      return 30;
    }
    case 9: {
      return 30;
    }
    case 11: {
      return 30;
    }
    case 2: {
      return _M0FP39XinOrigin10moon__warc4cdxj14is__leap__year(year) ? 29 : 28;
    }
    default: {
      return 0;
    }
  }
}
function _M0FP39XinOrigin10moon__warc4cdxj29timestamp__to__epoch__seconds(ts) {
  if (ts.length !== 14) {
    return undefined;
  }
  const _bind = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 0, 4);
  let year;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    year = _Some;
  }
  const _bind$2 = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 4, 2);
  let month;
  if (_bind$2 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$2;
    month = _Some;
  }
  const _bind$3 = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 6, 2);
  let day;
  if (_bind$3 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$3;
    day = _Some;
  }
  const _bind$4 = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 8, 2);
  let hour;
  if (_bind$4 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$4;
    hour = _Some;
  }
  const _bind$5 = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 10, 2);
  let minute;
  if (_bind$5 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$5;
    minute = _Some;
  }
  const _bind$6 = _M0FP39XinOrigin10moon__warc4cdxj20parse__digits__slice(ts, 12, 2);
  let second;
  if (_bind$6 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$6;
    second = _Some;
  }
  if (year < 1 || (month < 1 || month > 12)) {
    return undefined;
  }
  const max_day = _M0FP39XinOrigin10moon__warc4cdxj15days__in__month(year, month);
  if (day < 1 || (day > max_day || (hour > 23 || (minute > 59 || second > 59)))) {
    return undefined;
  }
  const y = month <= 2 ? BigInt.asUintN(64, BigInt(year - 1 | 0)) : BigInt.asUintN(64, BigInt(year));
  let era;
  if (BigInt.asIntN(64, y) >= BigInt.asIntN(64, 0n)) {
    if (400n === 0n) {
      $panic();
    }
    era = BigInt.asUintN(64, BigInt.asIntN(64, y) / BigInt.asIntN(64, 400n));
  } else {
    if (400n === 0n) {
      $panic();
    }
    era = BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, y - 399n)) / BigInt.asIntN(64, 400n));
  }
  const yoe = BigInt.asUintN(64, y - BigInt.asUintN(64, era * 400n));
  const adj_m = month + (month > 2 ? -3 : 9) | 0;
  if (5n === 0n) {
    $panic();
  }
  const doy = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, BigInt.asUintN(64, 153n * BigInt.asUintN(64, BigInt(adj_m))) + 2n)) / BigInt.asIntN(64, 5n)) + BigInt.asUintN(64, BigInt(day))) - 1n);
  const _tmp = BigInt.asUintN(64, yoe * 365n);
  if (4n === 0n) {
    $panic();
  }
  const _tmp$2 = BigInt.asUintN(64, _tmp + BigInt.asUintN(64, BigInt.asIntN(64, yoe) / BigInt.asIntN(64, 4n)));
  if (100n === 0n) {
    $panic();
  }
  const doe = BigInt.asUintN(64, BigInt.asUintN(64, _tmp$2 - BigInt.asUintN(64, BigInt.asIntN(64, yoe) / BigInt.asIntN(64, 100n))) + doy);
  const days = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, era * 146097n) + doe) - 719468n);
  return BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, days * 86400n) + BigInt.asUintN(64, BigInt.asUintN(64, BigInt(hour)) * 3600n)) + BigInt.asUintN(64, BigInt.asUintN(64, BigInt(minute)) * 60n)) + BigInt.asUintN(64, BigInt(second)));
}
function _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einner(record, filename) {
  const hdr = record.header;
  const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(hdr);
  let wt;
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    wt = _Some;
  }
  let indexable;
  switch (wt.$tag) {
    case 1: {
      indexable = true;
      break;
    }
    case 2: {
      indexable = true;
      break;
    }
    case 5: {
      indexable = true;
      break;
    }
    case 6: {
      indexable = true;
      break;
    }
    default: {
      indexable = false;
    }
  }
  if (!indexable) {
    return undefined;
  }
  const _bind$2 = _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(hdr);
  let url;
  if (_bind$2 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$2;
    url = _Some;
  }
  const _bind$3 = _M0FP39XinOrigin10moon__warc4surt8to__surt(new _M0TPC16string10StringView(url, 0, url.length));
  let surt_key;
  if (_bind$3.$tag === 1) {
    const _Ok = _bind$3;
    surt_key = _Ok._0;
  } else {
    return undefined;
  }
  const _bind$4 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(hdr);
  let raw_date;
  if (_bind$4 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$4;
    raw_date = _Some;
  }
  const _bind$5 = _M0MP39XinOrigin10moon__warc6header8WarcDate5parse(new _M0TPC16string10StringView(raw_date, 0, raw_date.length));
  let timestamp;
  if (_bind$5.$tag === 1) {
    const _Ok = _bind$5;
    const _d = _Ok._0;
    timestamp = _M0MP39XinOrigin10moon__warc6header8WarcDate19to__cdxj__timestamp(_d);
  } else {
    return undefined;
  }
  let mime;
  let status;
  _L: {
    switch (wt.$tag) {
      case 1: {
        const _bind$6 = record.payload;
        const _bind$7 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$6, 0, _bind$6.length));
        if (_bind$7.$tag === 1) {
          const _Ok = _bind$7;
          const _resp = _Ok._0;
          mime = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(_resp);
          status = _resp.status_code;
          break _L;
        } else {
          const _bind$8 = _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__type(hdr);
          let _tmp;
          if (_bind$8 === undefined) {
            _tmp = undefined;
          } else {
            const _Some = _bind$8;
            const _ct = _Some;
            _tmp = _M0FP39XinOrigin10moon__warc4cdxj19strip__mime__params(_ct);
          }
          mime = _tmp;
          status = undefined;
          break _L;
        }
      }
      case 5: {
        const _bind$8 = record.payload;
        const _bind$9 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$8, 0, _bind$8.length));
        if (_bind$9.$tag === 1) {
          const _Ok = _bind$9;
          const _resp = _Ok._0;
          const _bind$10 = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(_resp);
          let _tmp;
          if (_bind$10 === undefined) {
            _tmp = _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einnerN6constrS4491;
          } else {
            const _Some = _bind$10;
            const _m = _Some;
            _tmp = _m;
          }
          mime = _tmp;
          status = _resp.status_code;
          break _L;
        } else {
          mime = _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einnerN6constrS4492;
          status = undefined;
          break _L;
        }
      }
      default: {
        const _bind$10 = _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__type(hdr);
        let _tmp;
        if (_bind$10 === undefined) {
          _tmp = undefined;
        } else {
          const _Some = _bind$10;
          const _ct = _Some;
          _tmp = _M0FP39XinOrigin10moon__warc4cdxj19strip__mime__params(_ct);
        }
        mime = _tmp;
        status = undefined;
        break _L;
      }
    }
  }
  const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(hdr);
  let digest;
  if (_bind$6 === undefined) {
    digest = _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digest(hdr);
  } else {
    const _Some = _bind$6;
    const _d = _Some;
    digest = _d;
  }
  return new _M0TP39XinOrigin10moon__warc4cdxj9CdxjEntry(surt_key, timestamp, url, mime, status, digest, record.record_length, record.offset, filename, _M0MP39XinOrigin10moon__warc6header8WarcType16to__wire__string(wt));
}
function _M0FP39XinOrigin10moon__warc4cdxj12format__line(entry) {
  const _bind = [];
  const obj = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind, 0, 0), undefined);
  const _p = entry.url;
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "url", new _M0DTPC14json4Json6String(_p));
  const _bind$2 = entry.mime;
  if (_bind$2 === undefined) {
  } else {
    const _Some = _bind$2;
    const _m = _Some;
    _M0MPB3Map3setGsRPC14json4JsonE(obj, "mime", new _M0DTPC14json4Json6String(_m));
  }
  const _bind$3 = entry.status;
  if (_bind$3 === undefined) {
  } else {
    const _Some = _bind$3;
    const _st = _Some;
    const _p$2 = _M0MPC13int3Int18to__string_2einner(_st, 10);
    _M0MPB3Map3setGsRPC14json4JsonE(obj, "status", new _M0DTPC14json4Json6String(_p$2));
  }
  const _bind$4 = entry.digest;
  if (_bind$4 === undefined) {
  } else {
    const _Some = _bind$4;
    const _d = _Some;
    _M0MPB3Map3setGsRPC14json4JsonE(obj, "digest", new _M0DTPC14json4Json6String(_d));
  }
  const _p$2 = _M0MPC15int645Int6418to__string_2einner(entry.length, 10);
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "length", new _M0DTPC14json4Json6String(_p$2));
  const _p$3 = _M0MPC15int645Int6418to__string_2einner(entry.offset, 10);
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "offset", new _M0DTPC14json4Json6String(_p$3));
  const _p$4 = entry.filename;
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "filename", new _M0DTPC14json4Json6String(_p$4));
  const _p$5 = entry.warc_type;
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "warc-type", new _M0DTPC14json4Json6String(_p$5));
  const json_str = _M0MPC14json4Json17stringify_2einner(new _M0DTPC14json4Json6Object(obj), false, 0, undefined);
  return `${entry.surt} ${entry.timestamp} ${json_str}`;
}
function _M0FP39XinOrigin10moon__warc4cdxj16compare__entries(a, b) {
  const cs = _M0MPC16string6String16lexical__compare(a.surt, b.surt);
  if (cs !== 0) {
    return cs;
  }
  const ct = _M0MPC16string6String16lexical__compare(a.timestamp, b.timestamp);
  if (ct !== 0) {
    return ct;
  }
  const co = $compare_int64(a.offset, b.offset);
  if (co !== 0) {
    return co;
  }
  const cw = _M0MPC16string6String16lexical__compare(a.warc_type, b.warc_type);
  if (cw !== 0) {
    return cw;
  }
  const cu = _M0MPC16string6String16lexical__compare(a.url, b.url);
  if (cu !== 0) {
    return cu;
  }
  const _bind = a.digest;
  const _bind$2 = b.digest;
  if (_bind === undefined) {
    return _bind$2 === undefined ? 0 : -1;
  } else {
    const _Some = _bind;
    const _da = _Some;
    if (_bind$2 === undefined) {
      return 1;
    } else {
      const _Some$2 = _bind$2;
      const _db = _Some$2;
      return _M0MPC16string6String16lexical__compare(_da, _db);
    }
  }
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex13build_2einner(records, filename) {
  const entries = new _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE([], 0);
  const _bind = records.len;
  const _bind$2 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const rec = _bind$2[_];
      const _bind$3 = _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einner(rec, filename);
      if (_bind$3 === undefined) {
      } else {
        const _Some = _bind$3;
        const _e = _Some;
        _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(entries, _e);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MPC15array5Array8sort__byGUsssEE(entries, _M0FP39XinOrigin10moon__warc4cdxj16compare__entries);
  return new _M0TP39XinOrigin10moon__warc4cdxj9CdxjIndex(entries);
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex11format__all(self) {
  const lines = new _M0TPB5ArrayGsE([], 0);
  const _bind = self.entries;
  const _bind$2 = _bind.len;
  const _bind$3 = _bind.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = _bind$3[_];
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(lines, _M0FP39XinOrigin10moon__warc4cdxj12format__line(e));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC15array5Array4joinGsE(lines, _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex11format__allN6recordS4574);
}
function _M0FP39XinOrigin10moon__warc4cdxj18lower__bound__surt(entries, target) {
  let lo = 0;
  let hi = entries.len;
  while (true) {
    if (lo < hi) {
      const mid = lo + ((hi - lo | 0) / 2 | 0) | 0;
      if (mid < 0 || mid >= entries.len) {
        $panic();
      }
      if (_M0MPC16string6String16lexical__compare(entries.buf[mid].surt, target) < 0) {
        lo = mid + 1 | 0;
      } else {
        hi = mid;
      }
      continue;
    } else {
      break;
    }
  }
  return lo;
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex13lookup__exact(self, url) {
  const _bind = _M0FP39XinOrigin10moon__warc4surt8to__surt(url);
  let key;
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    key = _Ok._0;
  } else {
    return new _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE([], 0);
  }
  const out = new _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE([], 0);
  let idx = _M0FP39XinOrigin10moon__warc4cdxj18lower__bound__surt(self.entries, key);
  while (true) {
    let _tmp;
    if (idx < self.entries.len) {
      const _bind$2 = self.entries;
      const _bind$3 = idx;
      if (_bind$3 < 0 || _bind$3 >= _bind$2.len) {
        $panic();
      }
      _tmp = _bind$2.buf[_bind$3].surt === key;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      const _bind$2 = self.entries;
      const _bind$3 = idx;
      if (_bind$3 < 0 || _bind$3 >= _bind$2.len) {
        $panic();
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, _bind$2.buf[_bind$3]);
      idx = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex14lookup__prefix(self, surt_prefix) {
  const prefix = _M0MPC16string10StringView9to__owned(surt_prefix);
  const out = new _M0TPB5ArrayGRP39XinOrigin10moon__warc4cdxj9CdxjEntryE([], 0);
  let idx = _M0FP39XinOrigin10moon__warc4cdxj18lower__bound__surt(self.entries, prefix);
  while (true) {
    let _tmp;
    if (idx < self.entries.len) {
      const _bind = self.entries;
      const _bind$2 = idx;
      if (_bind$2 < 0 || _bind$2 >= _bind.len) {
        $panic();
      }
      _tmp = _M0MPC16string6String11has__prefix(_bind.buf[_bind$2].surt, new _M0TPC16string10StringView(prefix, 0, prefix.length));
    } else {
      _tmp = false;
    }
    if (_tmp) {
      const _bind = self.entries;
      const _bind$2 = idx;
      if (_bind$2 < 0 || _bind$2 >= _bind.len) {
        $panic();
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, _bind.buf[_bind$2]);
      idx = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex15lookup__closest(self, url, target_timestamp) {
  const matches = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex13lookup__exact(self, url);
  if (matches.len === 0) {
    return undefined;
  }
  const _bind = _M0FP39XinOrigin10moon__warc4cdxj29timestamp__to__epoch__seconds(_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(target_timestamp, undefined)));
  let target_sec;
  if (_bind === undefined) {
    if (0 >= matches.len) {
      $panic();
    }
    return matches.buf[0];
  } else {
    const _Some = _bind;
    target_sec = _Some;
  }
  if (0 >= matches.len) {
    $panic();
  }
  let best = matches.buf[0];
  const _bind$2 = _M0FP39XinOrigin10moon__warc4cdxj29timestamp__to__epoch__seconds(best.timestamp);
  let best_diff;
  if (_bind$2 === undefined) {
    best_diff = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex15lookup__closestN9max__diffS4611;
  } else {
    const _Some = _bind$2;
    const _v = _Some;
    const _p = BigInt.asUintN(64, _v - target_sec);
    best_diff = BigInt.asIntN(64, _p) < BigInt.asIntN(64, 0n) ? BigInt.asUintN(64, -_p) : _p;
  }
  const _bind$3 = matches.len;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      if (i < 0 || i >= matches.len) {
        $panic();
      }
      const cand = matches.buf[i];
      const _bind$4 = _M0FP39XinOrigin10moon__warc4cdxj29timestamp__to__epoch__seconds(cand.timestamp);
      let diff;
      if (_bind$4 === undefined) {
        diff = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex15lookup__closestN9max__diffS4611;
      } else {
        const _Some = _bind$4;
        const _v = _Some;
        const _p = BigInt.asUintN(64, _v - target_sec);
        diff = BigInt.asIntN(64, _p) < BigInt.asIntN(64, 0n) ? BigInt.asUintN(64, -_p) : _p;
      }
      if (BigInt.asIntN(64, diff) < BigInt.asIntN(64, best_diff)) {
        best = cand;
        best_diff = diff;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return best;
}
function _M0FP39XinOrigin10moon__warc8pipeline19strip__mime__params(ct) {
  const _bind = _M0MPC16string6String11split__once(ct, _M0FP39XinOrigin10moon__warc8pipeline19strip__mime__paramsN6recordS4632);
  let mime;
  if (_bind === undefined) {
    mime = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(ct, undefined));
  } else {
    const _Some = _bind;
    const _x = _Some;
    const _m = _x._0;
    mime = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_m, undefined));
  }
  return mime === "" ? undefined : _M0MPC16string6String9to__lower(mime);
}
function _M0FP39XinOrigin10moon__warc8pipeline26extract__mime__and__status(record) {
  const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__type(record.header);
  let warc_mime;
  if (_bind === undefined) {
    warc_mime = undefined;
  } else {
    const _Some = _bind;
    const _ct = _Some;
    warc_mime = _M0FP39XinOrigin10moon__warc8pipeline19strip__mime__params(_ct);
  }
  _L: {
    const _bind$2 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(record.header);
    if (_bind$2 === undefined) {
      break _L;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      switch (_x.$tag) {
        case 1: {
          const _bind$3 = record.payload;
          const _bind$4 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$3, 0, _bind$3.length));
          if (_bind$4.$tag === 1) {
            const _Ok = _bind$4;
            const _resp = _Ok._0;
            const _bind$5 = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(_resp);
            let mime;
            if (_bind$5 === undefined) {
              mime = warc_mime;
            } else {
              const _Some$2 = _bind$5;
              const _m = _Some$2;
              mime = _m;
            }
            return { _0: mime, _1: _resp.status_code };
          } else {
            return { _0: warc_mime, _1: undefined };
          }
        }
        case 5: {
          const _bind$5 = record.payload;
          const _bind$6 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$5, 0, _bind$5.length));
          if (_bind$6.$tag === 1) {
            const _Ok = _bind$6;
            const _resp = _Ok._0;
            const _bind$7 = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(_resp);
            let mime;
            if (_bind$7 === undefined) {
              mime = warc_mime;
            } else {
              const _Some$2 = _bind$7;
              const _m = _Some$2;
              mime = _m;
            }
            return { _0: mime, _1: _resp.status_code };
          } else {
            return { _0: warc_mime, _1: undefined };
          }
        }
        default: {
          break _L;
        }
      }
    }
  }
  return { _0: warc_mime, _1: undefined };
}
function _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(s) {
  if (s === "") {
    return "-";
  }
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = s.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      if (_decoded_char === 32) {
        const _p = "%20";
        sb.val = `${sb.val}${_p}`;
      } else {
        if (_decoded_char === 9) {
          const _p = "%09";
          sb.val = `${sb.val}${_p}`;
        } else {
          if (_decoded_char === 13) {
            const _p = "%0D";
            sb.val = `${sb.val}${_p}`;
          } else {
            if (_decoded_char === 10) {
              const _p = "%0A";
              sb.val = `${sb.val}${_p}`;
            } else {
              _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
            }
          }
        }
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einner(records, filename, include_header) {
  const _bind = [];
  const redirects = _M0MPB3Map3MapGssE(new _M0TPB9ArrayViewGUssEE(_bind, 0, 0), undefined);
  const _bind$2 = records.len;
  const _bind$3 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const rec = _bind$3[_];
      if (_M0IPC16option6OptionPB2Eq5equalGRP39XinOrigin10moon__warc6header8WarcTypeE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(rec.header), _M0DTP39XinOrigin10moon__warc6header8WarcType8Response__)) {
        const _bind$4 = rec.payload;
        const _bind$5 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$4, 0, _bind$4.length));
        if (_bind$5.$tag === 1) {
          const _Ok = _bind$5;
          const _resp = _Ok._0;
          const _bind$6 = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse8location(_resp);
          if (_bind$6 === undefined) {
          } else {
            const _Some = _bind$6;
            const _loc = _Some;
            const _bind$7 = _M0FP39XinOrigin10moon__warc4cdxj20from__record_2einner(rec, filename);
            if (_bind$7 === undefined) {
            } else {
              const _Some$2 = _bind$7;
              const _entry = _Some$2;
              _M0MPB3Map3setGssE(redirects, _M0FP39XinOrigin10moon__warc4cdxj12format__line(_entry), _loc);
            }
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const index = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex13build_2einner(records, filename);
  const lines = new _M0TPB5ArrayGsE([], 0);
  if (include_header) {
    _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(lines, " CDX N b a m s k r M S V g");
  }
  const _bind$4 = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex7entries(index);
  const _bind$5 = _bind$4.len;
  const _bind$6 = _bind$4.buf;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$5) {
      const e = _bind$6[_];
      const surt_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(e.surt);
      const url_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(e.url);
      const mime_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(_M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(e.mime, "-"));
      const _bind$7 = e.status;
      let status_s;
      if (_bind$7 === undefined) {
        status_s = "-";
      } else {
        const _Some = _bind$7;
        const _st = _Some;
        status_s = _M0MPC13int3Int18to__string_2einner(_st, 10);
      }
      const digest_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(_M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(e.digest, "-"));
      const _bind$8 = _M0MPB3Map3getGssE(redirects, _M0FP39XinOrigin10moon__warc4cdxj12format__line(e));
      let redirect_s;
      if (_bind$8 === undefined) {
        redirect_s = "-";
      } else {
        const _Some = _bind$8;
        const _loc = _Some;
        redirect_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(_loc);
      }
      const file_s = _M0FP39XinOrigin10moon__warc8pipeline20sanitize__cdx__field(e.filename);
      const row = new _M0TPB5ArrayGsE([surt_s, e.timestamp, url_s, mime_s, status_s, digest_s, redirect_s, "-", _M0MPC15int645Int6418to__string_2einner(e.length, 10), _M0MPC15int645Int6418to__string_2einner(e.offset, 10), file_s], 11);
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(lines, _M0MPC15array5Array4joinGsE(row, _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einnerN6recordS4675));
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC15array5Array4joinGsE(lines, _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einnerN6recordS4676);
}
function _M0FP39XinOrigin10moon__warc8pipeline11hex__nibble(n) {
  const v = n & 15;
  if (v < 10) {
    const _p = _M0MPC13int3Int8to__char(48 + v | 0);
    return _p === -1 ? $panic() : _p;
  } else {
    const _p = _M0MPC13int3Int8to__char((97 + v | 0) - 10 | 0);
    return _p === -1 ? $panic() : _p;
  }
}
function _M0FP39XinOrigin10moon__warc8pipeline20write__json__escaped(sb, s) {
  _M0IPB13StringBuilderPB6Logger11write__char(sb, 34);
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = s.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      const code = _decoded_char;
      if (_decoded_char === 34) {
        const _p = "\\\"";
        sb.val = `${sb.val}${_p}`;
      } else {
        if (_decoded_char === 92) {
          const _p = "\\\\";
          sb.val = `${sb.val}${_p}`;
        } else {
          if (code === 8) {
            const _p = "\\b";
            sb.val = `${sb.val}${_p}`;
          } else {
            if (code === 12) {
              const _p = "\\f";
              sb.val = `${sb.val}${_p}`;
            } else {
              if (code === 10) {
                const _p = "\\n";
                sb.val = `${sb.val}${_p}`;
              } else {
                if (code === 13) {
                  const _p = "\\r";
                  sb.val = `${sb.val}${_p}`;
                } else {
                  if (code === 9) {
                    const _p = "\\t";
                    sb.val = `${sb.val}${_p}`;
                  } else {
                    if (code >= 0 && code < 32) {
                      const _p = "\\u00";
                      sb.val = `${sb.val}${_p}`;
                      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc8pipeline11hex__nibble(code >> 4 & 15));
                      _M0IPB13StringBuilderPB6Logger11write__char(sb, _M0FP39XinOrigin10moon__warc8pipeline11hex__nibble(code & 15));
                    } else {
                      _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
                    }
                  }
                }
              }
            }
          }
        }
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger11write__char(sb, 34);
}
function _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, key, val) {
  if (!first) {
    _M0IPB13StringBuilderPB6Logger11write__char(sb, 44);
  }
  _M0FP39XinOrigin10moon__warc8pipeline20write__json__escaped(sb, key);
  _M0IPB13StringBuilderPB6Logger11write__char(sb, 58);
  _M0FP39XinOrigin10moon__warc8pipeline20write__json__escaped(sb, val);
  return false;
}
function _M0FP39XinOrigin10moon__warc8pipeline23write__json__int__field(sb, first, key, val) {
  if (!first) {
    _M0IPB13StringBuilderPB6Logger11write__char(sb, 44);
  }
  _M0FP39XinOrigin10moon__warc8pipeline20write__json__escaped(sb, key);
  _M0IPB13StringBuilderPB6Logger11write__char(sb, 58);
  const _p = _M0MPC13int3Int18to__string_2einner(val, 10);
  sb.val = `${sb.val}${_p}`;
  return false;
}
function _M0FP39XinOrigin10moon__warc8pipeline25write__json__int64__field(sb, first, key, val) {
  if (!first) {
    _M0IPB13StringBuilderPB6Logger11write__char(sb, 44);
  }
  _M0FP39XinOrigin10moon__warc8pipeline20write__json__escaped(sb, key);
  _M0IPB13StringBuilderPB6Logger11write__char(sb, 58);
  const _p = _M0MPC15int645Int6418to__string_2einner(val, 10);
  sb.val = `${sb.val}${_p}`;
  return false;
}
function _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mime(mime) {
  return _M0MPC16string6String11has__prefix(mime, _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4744) || (mime === "application/json" || (mime === "application/xml" || (mime === "application/warc-fields" || (mime === "application/xhtml+xml" || (_M0MPC16string6String11has__suffix(mime, _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4745) || _M0MPC16string6String11has__suffix(mime, _M0FP39XinOrigin10moon__warc8pipeline17is__textual__mimeN6recordS4746))))));
}
function _M0FP39XinOrigin10moon__warc8pipeline17try__decode__utf8(raw) {
  let decoded;
  let _try_err;
  _L: {
    _L$2: {
      const _bind = _M0FPC28encoding4utf814decode_2einner(raw, false);
      if (_bind.$tag === 1) {
        const _ok = _bind;
        decoded = _ok._0;
      } else {
        const _err = _bind;
        _try_err = _err._0;
        break _L$2;
      }
      break _L;
    }
    return undefined;
  }
  return decoded;
}
function _M0FP39XinOrigin10moon__warc8pipeline15truncate__chars(s, max_chars) {
  if (max_chars <= 0) {
    return "";
  }
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  let count = 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = s.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      if (count >= max_chars) {
        break;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
      count = count + 1 | 0;
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc8pipeline19extract__body__text(rec, mime_opt, max_chars) {
  if (max_chars <= 0) {
    return undefined;
  }
  let mime;
  if (mime_opt === undefined) {
    return undefined;
  } else {
    const _Some = mime_opt;
    mime = _Some;
  }
  if (!_M0FP39XinOrigin10moon__warc8pipeline17is__textual__mime(mime)) {
    return undefined;
  }
  let body_bytes;
  _L: {
    _L$2: {
      const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(rec.header);
      if (_bind === undefined) {
        break _L$2;
      } else {
        const _Some = _bind;
        const _x = _Some;
        if (_x.$tag === 1) {
          const _bind$2 = rec.payload;
          const _bind$3 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$2, 0, _bind$2.length));
          if (_bind$3.$tag === 1) {
            const _Ok = _bind$3;
            const _resp = _Ok._0;
            const _bind$4 = _M0FP39XinOrigin10moon__warc13http__payload21extract__entity__body(_resp);
            if (_bind$4.$tag === 1) {
              const _Ok$2 = _bind$4;
              body_bytes = _Ok$2._0;
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    }
    body_bytes = rec.payload;
  }
  const _bind = _M0FP39XinOrigin10moon__warc8pipeline17try__decode__utf8(new _M0TPC15bytes9BytesView(body_bytes, 0, body_bytes.length));
  if (_bind === undefined) {
    return undefined;
  } else {
    const _Some = _bind;
    const _text = _Some;
    return _M0FP39XinOrigin10moon__warc8pipeline15truncate__chars(_text, max_chars);
  }
}
function _M0FP39XinOrigin10moon__warc8pipeline21export__jsonl_2einner(records, options) {
  const lines = new _M0TPB5ArrayGsE([], 0);
  const _bind = records.len;
  const _bind$2 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const rec = _bind$2[_];
      const hdr = rec.header;
      let first = true;
      const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
      _M0IPB13StringBuilderPB6Logger11write__char(sb, 123);
      first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "record_id", _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(hdr), ""));
      const _bind$3 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(hdr);
      let wt_str;
      if (_bind$3 === undefined) {
        wt_str = "";
      } else {
        const _Some = _bind$3;
        const _wt = _Some;
        wt_str = _M0MP39XinOrigin10moon__warc6header8WarcType16to__wire__string(_wt);
      }
      first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "warc_type", wt_str);
      first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "date", _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(hdr), ""));
      first = _M0FP39XinOrigin10moon__warc8pipeline25write__json__int64__field(sb, first, "offset", rec.offset);
      first = _M0FP39XinOrigin10moon__warc8pipeline25write__json__int64__field(sb, first, "length", rec.record_length);
      first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__int__field(sb, first, "payload_length", rec.payload.length);
      const _bind$4 = _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(hdr);
      if (_bind$4 === undefined) {
      } else {
        const _Some = _bind$4;
        const _u = _Some;
        first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "target_uri", _u);
        const _bind$5 = _M0FP39XinOrigin10moon__warc4surt8to__surt(new _M0TPC16string10StringView(_u, 0, _u.length));
        if (_bind$5.$tag === 1) {
          const _Ok = _bind$5;
          const _s = _Ok._0;
          first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "surt", _s);
        }
      }
      const _bind$5 = _M0FP39XinOrigin10moon__warc8pipeline26extract__mime__and__status(rec);
      const _mime_opt = _bind$5._0;
      const _status_opt = _bind$5._1;
      if (_mime_opt === undefined) {
      } else {
        const _Some = _mime_opt;
        const _m = _Some;
        first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "mime", _m);
      }
      if (_status_opt === undefined) {
      } else {
        const _Some = _status_opt;
        const _st = _Some;
        first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__int__field(sb, first, "status", _st);
      }
      const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digest(hdr);
      if (_bind$6 === undefined) {
      } else {
        const _Some = _bind$6;
        const _bd = _Some;
        first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "block_digest", _bd);
      }
      const _bind$7 = _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(hdr);
      if (_bind$7 === undefined) {
      } else {
        const _Some = _bind$7;
        const _pd = _Some;
        first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "payload_digest", _pd);
      }
      if (options.include_body_text) {
        const _bind$8 = _M0FP39XinOrigin10moon__warc8pipeline19extract__body__text(rec, _mime_opt, options.max_body_chars);
        if (_bind$8 === undefined) {
        } else {
          const _Some = _bind$8;
          const _text = _Some;
          first = _M0FP39XinOrigin10moon__warc8pipeline23write__json__str__field(sb, first, "text", _text);
        }
      }
      _M0IPB13StringBuilderPB6Logger11write__char(sb, 125);
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(lines, sb.val);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC15array5Array4joinGsE(lines, _M0FP39XinOrigin10moon__warc8pipeline21export__jsonl_2einnerN6recordS4783);
}
function _M0IP39XinOrigin10moon__warc8validate16RevisitMatchKindPC15debug5Debug8to__repr(_x_84) {
  switch (_x_84) {
    case 0: {
      return _M0MPC15debug4Repr4ctor("ByRecordId", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
    }
    case 1: {
      return _M0MPC15debug4Repr4ctor("ByUriAndDigest", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
    }
    default: {
      return _M0MPC15debug4Repr4ctor("Unresolved", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
    }
  }
}
function _M0IP39XinOrigin10moon__warc8validate8SeverityPC15debug5Debug8to__repr(_x_78) {
  if (_x_78 === 0) {
    return _M0MPC15debug4Repr4ctor("Error", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
  } else {
    return _M0MPC15debug4Repr4ctor("Warning", new _M0TPB5ArrayGUOsRPC15debug4ReprEE([], 0));
  }
}
function _M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrapped(s) {
  const clean = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(s, undefined));
  return clean.length >= 3 && (_M0MPC16string6String11has__prefix(clean, _M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrappedN6recordS4824) && _M0MPC16string6String11has__suffix(clean, _M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrappedN6recordS4825));
}
function _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, severity, code, record_index, offset, message) {
  _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(diags, new _M0TP39XinOrigin10moon__warc8validate10Diagnostic(severity, code, record_index, offset, message));
}
function _M0FP39XinOrigin10moon__warc8validate17validate__archive(records) {
  const diags = new _M0TPB5ArrayGRP39XinOrigin10moon__warc8validate10DiagnosticE([], 0);
  const _bind = [];
  const id_counts = _M0MPB3Map3MapGsiE(new _M0TPB9ArrayViewGUsiEE(_bind, 0, 0), undefined);
  const _bind$2 = [];
  const record_by_id = _M0MPB3Map3MapGsRP39XinOrigin10moon__warc5codec10WarcRecordE(new _M0TPB9ArrayViewGUsRP39XinOrigin10moon__warc5codec10WarcRecordEE(_bind$2, 0, 0), undefined);
  const _bind$3 = records.len;
  const _bind$4 = records.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const rec = _bind$4[_];
      const _bind$5 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(rec.header);
      if (_bind$5 === undefined) {
      } else {
        const _Some = _bind$5;
        const _id = _Some;
        const _bind$6 = _M0MPB3Map3getGsiE(id_counts, _id);
        let prev;
        if (_bind$6 === undefined) {
          prev = 0;
        } else {
          const _Some$2 = _bind$6;
          prev = _Some$2;
        }
        _M0MPB3Map3setGsiE(id_counts, _id, prev + 1 | 0);
        if (!_M0MPB3Map8containsGsRP39XinOrigin10moon__warc5codec10WarcRecordE(record_by_id, _id)) {
          _M0MPB3Map3setGsRP39XinOrigin10moon__warc5codec10WarcRecordE(record_by_id, _id, rec);
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$5 = records.len;
  let _tmp$2 = 0;
  while (true) {
    const idx = _tmp$2;
    if (idx < _bind$5) {
      if (idx < 0 || idx >= records.len) {
        $panic();
      }
      const rec = records.buf[idx];
      const hdr = rec.header;
      const off = rec.offset;
      const wt_opt = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(hdr);
      if (wt_opt === undefined) {
        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_WARC_TYPE", idx, off, "missing mandatory WARC-Type header");
      }
      const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(hdr);
      if (_bind$6 === undefined) {
        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_RECORD_ID", idx, off, "missing mandatory WARC-Record-ID header");
      } else {
        const _Some = _bind$6;
        const _id = _Some;
        if (!_M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrapped(_id)) {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "WARC-Record-ID must be enclosed in <...>: ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _id);
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_RECORD_ID", idx, off, _string_builder.val);
        }
        const _bind$7 = _M0MPB3Map3getGsiE(id_counts, _id);
        if (_bind$7 === undefined) {
        } else {
          const _Some$2 = _bind$7;
          const _cnt = _Some$2;
          if (_cnt > 1) {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "duplicate WARC-Record-ID: ";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGsE(_string_builder, _id);
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "DUPLICATE_RECORD_ID", idx, off, _string_builder.val);
          }
        }
      }
      const _bind$7 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(hdr);
      if (_bind$7 === undefined) {
        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_WARC_DATE", idx, off, "missing mandatory WARC-Date header");
      } else {
        const _Some = _bind$7;
        const _d = _Some;
        const _bind$8 = _M0MP39XinOrigin10moon__warc6header8WarcDate5parse(new _M0TPC16string10StringView(_d, 0, _d.length));
        if (_bind$8.$tag === 1) {
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "invalid ISO 28500 UTC WARC-Date: ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _d);
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_WARC_DATE", idx, off, _string_builder.val);
        }
      }
      const _bind$8 = _M0MP39XinOrigin10moon__warc6header10WarcHeader22parse__content__length(hdr);
      if (_bind$8.$tag === 0) {
        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_CONTENT_LENGTH", idx, off, "missing or invalid Content-Length header");
      } else {
        const _Ok = _bind$8;
        const _cl = _Ok._0;
        if (BigInt.asUintN(64, _cl) !== BigInt.asUintN(64, BigInt.asUintN(64, BigInt(rec.payload.length)))) {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "Content-Length ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC15int645Int6418to__string_2einner(_cl, 10));
          const _p$2 = " != payload length ";
          _string_builder.val = `${_string_builder.val}${_p$2}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _M0MPC13int3Int18to__string_2einner(rec.payload.length, 10));
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "CONTENT_LENGTH_MISMATCH", idx, off, _string_builder.val);
        }
      }
      _L: {
        _L$2: {
          if (wt_opt === undefined) {
          } else {
            const _Some = wt_opt;
            const _x = _Some;
            switch (_x.$tag) {
              case 1: {
                break _L$2;
              }
              case 3: {
                break _L$2;
              }
              case 2: {
                break _L$2;
              }
              case 5: {
                break _L$2;
              }
              case 6: {
                break _L$2;
              }
            }
          }
          break _L;
        }
        const _bind$9 = _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(hdr);
        if (_bind$9 === undefined) {
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_TARGET_URI", idx, off, "missing mandatory WARC-Target-URI header");
        } else {
          const _Some = _bind$9;
          const _u = _Some;
          const _p = _M0MPC16string6String4trim(_u, undefined);
          if ((_p.end - _p.start | 0) === 0) {
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_TARGET_URI", idx, off, "WARC-Target-URI cannot be empty");
          }
        }
      }
      _L$2: {
        _L$3: {
          if (wt_opt === undefined) {
            break _L$3;
          } else {
            const _Some = wt_opt;
            const _x = _Some;
            switch (_x.$tag) {
              case 5: {
                const _bind$9 = _M0MP39XinOrigin10moon__warc6header10WarcHeader7profile(hdr);
                if (_bind$9 === undefined) {
                  _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_WARC_PROFILE", idx, off, "missing mandatory WARC-Profile for revisit record");
                } else {
                  const _Some$2 = _bind$9;
                  const _p = _Some$2;
                  const _p$2 = _M0MPC16string6String4trim(_p, undefined);
                  if ((_p$2.end - _p$2.start | 0) === 0) {
                    _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_WARC_PROFILE", idx, off, "WARC-Profile cannot be empty for revisit record");
                  }
                }
                break;
              }
              case 7: {
                const _bind$10 = _M0MP39XinOrigin10moon__warc6header10WarcHeader19segment__origin__id(hdr);
                if (_bind$10 === undefined) {
                  _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_SEGMENT_ORIGIN_ID", idx, off, "missing mandatory WARC-Segment-Origin-ID for continuation record");
                } else {
                  const _Some$2 = _bind$10;
                  const _oid = _Some$2;
                  const _p = _M0MPC16string6String4trim(_oid, undefined);
                  if ((_p.end - _p.start | 0) === 0) {
                    _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "MISSING_SEGMENT_ORIGIN_ID", idx, off, "WARC-Segment-Origin-ID cannot be empty for continuation record");
                  } else {
                    if (!_M0FP39XinOrigin10moon__warc8validate23is__uri__angle__wrapped(_oid)) {
                      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                      const _p$2 = "WARC-Segment-Origin-ID must be enclosed in <...>: ";
                      _string_builder.val = `${_string_builder.val}${_p$2}`;
                      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _oid);
                      _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_SEGMENT_ORIGIN_ID", idx, off, _string_builder.val);
                    } else {
                      const _bind$11 = _M0MPB3Map3getGsRP39XinOrigin10moon__warc5codec10WarcRecordE(record_by_id, _oid);
                      if (_bind$11 === undefined) {
                        const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                        const _p$2 = "WARC-Segment-Origin-ID target not found in archive: ";
                        _string_builder.val = `${_string_builder.val}${_p$2}`;
                        _M0MPB13StringBuilder13write__objectGsE(_string_builder, _oid);
                        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 1, "UNRESOLVED_SEGMENT_ORIGIN_ID", idx, off, _string_builder.val);
                      } else {
                        const _Some$3 = _bind$11;
                        const _origin_rec = _Some$3;
                        const origin_wt = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(_origin_rec.header);
                        const origin_sn = _M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__number(_origin_rec.header);
                        if (_M0IPC16option6OptionPB2Eq5equalGRP39XinOrigin10moon__warc6header8WarcTypeE(origin_wt, _M0DTP39XinOrigin10moon__warc6header8WarcType12Continuation__) || _M0IP016_24default__implPB2Eq10not__equalGOiE(origin_sn, _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4836)) {
                          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                          const _p$2 = "WARC-Segment-Origin-ID target must be an origin record with WARC-Segment-Number: 1: ";
                          _string_builder.val = `${_string_builder.val}${_p$2}`;
                          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _oid);
                          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_SEGMENT_ORIGIN_ID", idx, off, _string_builder.val);
                        }
                      }
                    }
                  }
                }
                const _bind$11 = _M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__number(hdr);
                if (_bind$11 === undefined) {
                  _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_SEGMENT_NUMBER", idx, off, "missing or invalid WARC-Segment-Number for continuation record");
                } else {
                  const _Some$2 = _bind$11;
                  const _n = _Some$2;
                  if (_n < 2) {
                    _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_SEGMENT_NUMBER", idx, off, "WARC-Segment-Number must be >= 2 for continuation record");
                  }
                }
                break;
              }
              default: {
                break _L$3;
              }
            }
          }
          break _L$2;
        }
        const _bind$9 = _M0MP39XinOrigin10moon__warc6header10WarcHeader3get(hdr, _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6recordS4834);
        if (_bind$9 === undefined) {
        } else {
          if (_M0IP016_24default__implPB2Eq10not__equalGOiE(_M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__number(hdr), _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4835)) {
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_SEGMENT_NUMBER", idx, off, "non-continuation segmented origin record must have WARC-Segment-Number: 1");
          }
        }
      }
      const _bind$9 = _M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digest(hdr);
      if (_bind$9 === undefined) {
      } else {
        const _Some = _bind$9;
        const _bd = _Some;
        const _tmp$3 = new _M0TPC16string10StringView(_bd, 0, _bd.length);
        const _bind$10 = rec.payload;
        const _bind$11 = _M0FP39XinOrigin10moon__warc6digest20verify__warc__digest(_tmp$3, new _M0TPC15bytes9BytesView(_bind$10, 0, _bind$10.length));
        if (_bind$11.$tag === 1) {
          const _Ok = _bind$11;
          const _x = _Ok._0;
          if (_x === true) {
          } else {
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "BLOCK_DIGEST_MISMATCH", idx, off, "WARC-Block-Digest verification failed");
          }
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "invalid WARC-Block-Digest header: ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _bd);
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_BLOCK_DIGEST", idx, off, _string_builder.val);
        }
      }
      const _bind$10 = _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(hdr);
      if (_bind$10 === undefined) {
      } else {
        const _Some = _bind$10;
        const _pd = _Some;
        if (_M0IPC16option6OptionPB2Eq5equalGiE(_M0MP39XinOrigin10moon__warc6header10WarcHeader15segment__number(hdr), _M0FP39XinOrigin10moon__warc8validate17validate__archiveN6constrS4837)) {
          const _bind$11 = _M0FP39XinOrigin10moon__warc6digest19parse__warc__digest(new _M0TPC16string10StringView(_pd, 0, _pd.length));
          if (_bind$11.$tag === 1) {
          } else {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "invalid WARC-Payload-Digest header: ";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGsE(_string_builder, _pd);
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_PAYLOAD_DIGEST", idx, off, _string_builder.val);
          }
        } else {
          _L$3: {
            _L$4: {
              if (wt_opt === undefined) {
                break _L$4;
              } else {
                const _Some$2 = wt_opt;
                const _x = _Some$2;
                switch (_x.$tag) {
                  case 5: {
                    const _bind$11 = _M0FP39XinOrigin10moon__warc6digest19parse__warc__digest(new _M0TPC16string10StringView(_pd, 0, _pd.length));
                    if (_bind$11.$tag === 1) {
                    } else {
                      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                      const _p = "invalid WARC-Payload-Digest header: ";
                      _string_builder.val = `${_string_builder.val}${_p}`;
                      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _pd);
                      _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_PAYLOAD_DIGEST", idx, off, _string_builder.val);
                    }
                    break;
                  }
                  case 1: {
                    const _bind$12 = rec.payload;
                    const _bind$13 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$12, 0, _bind$12.length));
                    if (_bind$13.$tag === 0) {
                      _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_HTTP_PAYLOAD", idx, off, "failed to parse HTTP response for WARC-Payload-Digest verification");
                    } else {
                      const _Ok = _bind$13;
                      const _resp = _Ok._0;
                      const _bind$14 = _M0FP39XinOrigin10moon__warc13http__payload21extract__entity__body(_resp);
                      if (_bind$14.$tag === 0) {
                        _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_HTTP_CHUNKED_BODY", idx, off, "failed to decode chunked HTTP body for WARC-Payload-Digest verification");
                      } else {
                        const _Ok$2 = _bind$14;
                        const _entity = _Ok$2._0;
                        const _bind$15 = _M0FP39XinOrigin10moon__warc6digest20verify__warc__digest(new _M0TPC16string10StringView(_pd, 0, _pd.length), new _M0TPC15bytes9BytesView(_entity, 0, _entity.length));
                        if (_bind$15.$tag === 1) {
                          const _Ok$3 = _bind$15;
                          const _x$2 = _Ok$3._0;
                          if (_x$2 === true) {
                          } else {
                            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "PAYLOAD_DIGEST_MISMATCH", idx, off, "WARC-Payload-Digest verification failed");
                          }
                        } else {
                          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
                          const _p = "invalid WARC-Payload-Digest header: ";
                          _string_builder.val = `${_string_builder.val}${_p}`;
                          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _pd);
                          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_PAYLOAD_DIGEST", idx, off, _string_builder.val);
                        }
                      }
                    }
                    break;
                  }
                  default: {
                    break _L$4;
                  }
                }
              }
              break _L$3;
            }
            const _tmp$3 = new _M0TPC16string10StringView(_pd, 0, _pd.length);
            const _bind$11 = rec.payload;
            const _bind$12 = _M0FP39XinOrigin10moon__warc6digest20verify__warc__digest(_tmp$3, new _M0TPC15bytes9BytesView(_bind$11, 0, _bind$11.length));
            if (_bind$12.$tag === 1) {
              const _Ok = _bind$12;
              const _x = _Ok._0;
              if (_x === true) {
              } else {
                _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "PAYLOAD_DIGEST_MISMATCH", idx, off, "WARC-Payload-Digest verification failed");
              }
            } else {
              const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
              const _p = "invalid WARC-Payload-Digest header: ";
              _string_builder.val = `${_string_builder.val}${_p}`;
              _M0MPB13StringBuilder13write__objectGsE(_string_builder, _pd);
              _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 0, "INVALID_PAYLOAD_DIGEST", idx, off, _string_builder.val);
            }
          }
        }
      }
      const _bind$11 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10refers__to(hdr);
      if (_bind$11 === undefined) {
      } else {
        const _Some = _bind$11;
        const _ref_id = _Some;
        if (!_M0MPB3Map8containsGsiE(id_counts, _ref_id)) {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
          const _p = "WARC-Refers-To target not found in archive: ";
          _string_builder.val = `${_string_builder.val}${_p}`;
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _ref_id);
          _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 1, "UNRESOLVED_REFERS_TO", idx, off, _string_builder.val);
        }
      }
      const _bind$12 = _M0MP39XinOrigin10moon__warc6header10WarcHeader14concurrent__to(hdr);
      const _bind$13 = _bind$12.len;
      const _bind$14 = _bind$12.buf;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$13) {
          const cid = _bind$14[_];
          if (!_M0MPB3Map8containsGsiE(id_counts, cid)) {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(8);
            const _p = "WARC-Concurrent-To target not found in archive: ";
            _string_builder.val = `${_string_builder.val}${_p}`;
            _M0MPB13StringBuilder13write__objectGsE(_string_builder, cid);
            _M0FP39XinOrigin10moon__warc8validate10push__diag(diags, 1, "UNRESOLVED_CONCURRENT_TO", idx, off, _string_builder.val);
          }
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _tmp$2 = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let error_count = 0;
  let warning_count = 0;
  const _bind$6 = diags.len;
  const _bind$7 = diags.buf;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$6) {
      const d = _bind$7[_];
      const _bind$8 = d.severity;
      if (_bind$8 === 0) {
        error_count = error_count + 1 | 0;
      } else {
        warning_count = warning_count + 1 | 0;
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0TP39XinOrigin10moon__warc8validate16ValidationReport(records.len, error_count, warning_count, diags);
}
function _M0FP39XinOrigin10moon__warc8validate17resolve__revisits(records) {
  const _bind = [];
  const id_to_index = _M0MPB3Map3MapGsiE(new _M0TPB9ArrayViewGUsiEE(_bind, 0, 0), undefined);
  const _bind$2 = [];
  const uri_digest_to_index = _M0MPB3Map3MapGsiE(new _M0TPB9ArrayViewGUsiEE(_bind$2, 0, 0), undefined);
  const _bind$3 = records.len;
  let _tmp = 0;
  while (true) {
    const idx = _tmp;
    if (idx < _bind$3) {
      if (idx < 0 || idx >= records.len) {
        $panic();
      }
      const hdr = records.buf[idx].header;
      const _bind$4 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(hdr);
      if (_bind$4 === undefined) {
      } else {
        const _Some = _bind$4;
        const _rid = _Some;
        _M0MPB3Map3setGsiE(id_to_index, _rid, idx);
      }
      const _bind$5 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(hdr);
      let is_original_payload;
      if (_bind$5 === undefined) {
        is_original_payload = false;
      } else {
        const _Some = _bind$5;
        const _x = _Some;
        switch (_x.$tag) {
          case 1: {
            is_original_payload = true;
            break;
          }
          case 2: {
            is_original_payload = true;
            break;
          }
          default: {
            is_original_payload = false;
          }
        }
      }
      if (is_original_payload) {
        const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(hdr);
        const _bind$7 = _M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(hdr);
        if (_bind$6 === undefined) {
        } else {
          const _Some = _bind$6;
          const _u = _Some;
          if (_bind$7 === undefined) {
          } else {
            const _Some$2 = _bind$7;
            const _d = _Some$2;
            const key = `${_u}\u0000${_d}`;
            if (!_M0MPB3Map8containsGsiE(uri_digest_to_index, key)) {
              _M0MPB3Map3setGsiE(uri_digest_to_index, key, idx);
            }
          }
        }
      }
      _tmp = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const out = new _M0TPB5ArrayGRP39XinOrigin10moon__warc8validate15ResolvedRevisitE([], 0);
  const _bind$4 = records.len;
  let _tmp$2 = 0;
  while (true) {
    const idx = _tmp$2;
    if (idx < _bind$4) {
      if (idx < 0 || idx >= records.len) {
        $panic();
      }
      const hdr = records.buf[idx].header;
      const _bind$5 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(hdr);
      if (_bind$5 === undefined) {
      } else {
        const _Some = _bind$5;
        const _x = _Some;
        if (_x.$tag === 5) {
          const rev_id = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(hdr), "");
          const uri = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(hdr), "");
          const date = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(hdr), "");
          const _bind$6 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10refers__to(hdr);
          let by_id;
          if (_bind$6 === undefined) {
            by_id = undefined;
          } else {
            const _Some$2 = _bind$6;
            const _ref_id = _Some$2;
            const _bind$7 = _M0MPB3Map3getGsiE(id_to_index, _ref_id);
            if (_bind$7 === undefined) {
              by_id = undefined;
            } else {
              const _Some$3 = _bind$7;
              const _t_idx = _Some$3;
              if (_t_idx !== idx) {
                if (_t_idx < 0 || _t_idx >= records.len) {
                  $panic();
                }
                by_id = { _0: _t_idx, _1: _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(records.buf[_t_idx].header) };
              } else {
                by_id = undefined;
              }
            }
          }
          if (by_id === undefined) {
            const key = `${uri}\u0000${_M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(hdr), "")}`;
            const _bind$7 = _M0MPB3Map3getGsiE(uri_digest_to_index, key);
            if (_bind$7 === undefined) {
              _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, new _M0TP39XinOrigin10moon__warc8validate15ResolvedRevisit(idx, rev_id, uri, date, 2, undefined, undefined));
            } else {
              const _Some$2 = _bind$7;
              const _t_idx = _Some$2;
              if (_t_idx < 0 || _t_idx >= records.len) {
                $panic();
              }
              _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, new _M0TP39XinOrigin10moon__warc8validate15ResolvedRevisit(idx, rev_id, uri, date, 1, _t_idx, _M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(records.buf[_t_idx].header)));
            }
          } else {
            const _Some$2 = by_id;
            const _x$2 = _Some$2;
            const _t_idx = _x$2._0;
            const _t_rid = _x$2._1;
            _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(out, new _M0TP39XinOrigin10moon__warc8validate15ResolvedRevisit(idx, rev_id, uri, date, 0, _t_idx, _t_rid));
          }
        }
      }
      _tmp$2 = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return out;
}
function _M0FP29XinOrigin10moon__warc22parse__archive_2einner(raw, limits) {
  return _M0FP39XinOrigin10moon__warc5codec18parse__all_2einner(raw, limits);
}
function _M0FP29XinOrigin10moon__warc14parse__archive(raw, limits$46$opt) {
  let limits;
  if (limits$46$opt === undefined) {
    limits = _M0MP39XinOrigin10moon__warc5codec12ReaderLimits7defaultN6recordS4124;
  } else {
    const _Some = limits$46$opt;
    limits = _Some;
  }
  return _M0FP29XinOrigin10moon__warc22parse__archive_2einner(raw, limits);
}
function _M0FP29XinOrigin10moon__warc27encode__archive__gz_2einner(records, auto_digest, level) {
  return _M0FP39XinOrigin10moon__warc5codec23encode__all__gz_2einner(records, auto_digest, level);
}
function _M0FP29XinOrigin10moon__warc26parse__archive__gz_2einner(raw, limits) {
  return _M0FP39XinOrigin10moon__warc5codec22parse__all__gz_2einner(raw, limits);
}
function _M0FP29XinOrigin10moon__warc18parse__archive__gz(raw, limits$46$opt) {
  let limits;
  if (limits$46$opt === undefined) {
    limits = _M0MP39XinOrigin10moon__warc5codec12ReaderLimits7defaultN6recordS4124;
  } else {
    const _Some = limits$46$opt;
    limits = _Some;
  }
  return _M0FP29XinOrigin10moon__warc26parse__archive__gz_2einner(raw, limits);
}
function _M0FP29XinOrigin10moon__warc26build__cdxj__index_2einner(records, filename) {
  return _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex13build_2einner(records, filename);
}
function _M0FP29XinOrigin10moon__warc17validate__archive(records) {
  return _M0FP39XinOrigin10moon__warc8validate17validate__archive(records);
}
function _M0FP29XinOrigin10moon__warc17resolve__revisits(records) {
  return _M0FP39XinOrigin10moon__warc8validate17resolve__revisits(records);
}
function _M0FP29XinOrigin10moon__warc21export__cdx11_2einner(records, filename, include_header) {
  return _M0FP39XinOrigin10moon__warc8pipeline21export__cdx11_2einner(records, filename, include_header);
}
function _M0FP29XinOrigin10moon__warc21export__jsonl_2einner(records, options) {
  return _M0FP39XinOrigin10moon__warc8pipeline21export__jsonl_2einner(records, options);
}
function _M0FP29XinOrigin10moon__warc13export__jsonl(records, options$46$opt) {
  let options;
  if (options$46$opt === undefined) {
    options = _M0MP39XinOrigin10moon__warc8pipeline12JsonlOptions7defaultN6recordS4664;
  } else {
    const _Some = options$46$opt;
    options = _Some;
  }
  return _M0FP29XinOrigin10moon__warc21export__jsonl_2einner(records, options);
}
function _M0FP29XinOrigin10moon__warc22sample__archive__bytes() {
  const warcinfo_rec = _M0FP39XinOrigin10moon__warc5codec23build__warcinfo_2einner("<urn:uuid:00000000-0000-4000-8000-000000000001>", "2026-11-25T12:00:00Z", $bytes_literal$7, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5036, 1);
  const req_rec = _M0FP39XinOrigin10moon__warc5codec22build__request_2einner("<urn:uuid:00000000-0000-4000-8000-000000000002>", "2026-11-25T12:00:01Z", "https://example.org/index.html", $bytes_literal$8, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5037, 1);
  const resp_rec = _M0FP39XinOrigin10moon__warc5codec23build__response_2einner("<urn:uuid:00000000-0000-4000-8000-000000000003>", "2026-11-25T12:00:01Z", "https://example.org/index.html", _M0FP29XinOrigin10moon__warc22sample__archive__bytesN13resp__payloadS5044, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5038, 1);
  const meta_rec = _M0FP39XinOrigin10moon__warc5codec23build__metadata_2einner("<urn:uuid:00000000-0000-4000-8000-000000000004>", "2026-11-25T12:00:01Z", "https://example.org/index.html", $bytes_literal$9, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5039, 1);
  const resource_base = _M0FP39XinOrigin10moon__warc5codec23build__resource_2einner("<urn:uuid:00000000-0000-4000-8000-000000000005>", "2026-11-25T12:00:05Z", "https://cdn.example.org/app.json", "application/json", _M0FP29XinOrigin10moon__warc22sample__archive__bytesN17resource__payloadS5045, 1);
  const resource_rec = new _M0TP39XinOrigin10moon__warc5codec10WarcRecord(_M0MP39XinOrigin10moon__warc6header10WarcHeader11with__field(resource_base.header, "WARC-Payload-Digest", _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(new _M0TPC15bytes9BytesView(_M0FP29XinOrigin10moon__warc22sample__archive__bytesN17resource__payloadS5045, 0, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN17resource__payloadS5045.length))), resource_base.payload, resource_base.offset, resource_base.record_length);
  const revisit_rec = _M0FP39XinOrigin10moon__warc5codec22build__revisit_2einner("<urn:uuid:00000000-0000-4000-8000-000000000006>", "2026-11-25T12:15:00Z", "https://example.org/index.html", "http://netpreserve.org/warc/1.1/revisit/identical-payload-digest", _M0FP39XinOrigin10moon__warc6digest28format__warc__digest__sha256(new _M0TPC15bytes9BytesView(_M0FP29XinOrigin10moon__warc22sample__archive__bytesN12html__entityS5043, 0, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN12html__entityS5043.length)), _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5040, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5041, _M0FP29XinOrigin10moon__warc22sample__archive__bytesN6constrS5042, $bytes_literal$6, 1);
  return _M0FP39XinOrigin10moon__warc5codec19encode__all_2einner(new _M0TPB5ArrayGRP39XinOrigin10moon__warc5codec10WarcRecordE([warcinfo_rec, req_rec, resp_rec, meta_rec, resource_rec, revisit_rec], 6), true);
}
function _M0FP39XinOrigin10moon__warc17__web__build__tmp13truncate__str(s, max_chars) {
  const sb = _M0MPB13StringBuilder21StringBuilder_2einner(8);
  let count = 0;
  const _bind = s.length;
  let _tmp = 0;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$2 = s.charCodeAt(_string_index);
        if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
          const _bind$3 = s.charCodeAt(_string_index + 1 | 0);
          if (_bind$3 >= 56320 && _bind$3 <= 57343) {
            const _tmp$2 = _string_index + 2 | 0;
            const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        } else {
          const _tmp$2 = _string_index + 1 | 0;
          const _p = _bind$2;
          _decoded_next_string_index = _tmp$2;
          _decoded_char = _p;
          break _L;
        }
      }
      if (count >= max_chars) {
        const _p = "\n... (truncated)";
        sb.val = `${sb.val}${_p}`;
        break;
      }
      _M0IPB13StringBuilderPB6Logger11write__char(sb, _decoded_char);
      count = count + 1 | 0;
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return sb.val;
}
function _M0FP39XinOrigin10moon__warc17__web__build__tmp16extract__preview(rec) {
  _L: {
    const _bind = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(rec.header);
    if (_bind === undefined) {
      break _L;
    } else {
      const _Some = _bind;
      const _x = _Some;
      if (_x.$tag === 1) {
        const _bind$2 = rec.payload;
        const _bind$3 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$2, 0, _bind$2.length));
        if (_bind$3.$tag === 1) {
          const _Ok = _bind$3;
          const _resp = _Ok._0;
          const _bind$4 = _M0FP39XinOrigin10moon__warc13http__payload21extract__entity__body(_resp);
          if (_bind$4.$tag === 1) {
            const _Ok$2 = _bind$4;
            const _ent = _Ok$2._0;
            let decoded;
            let _try_err;
            _L$2: {
              _L$3: {
                const _bind$5 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(_ent, 0, _ent.length), false);
                if (_bind$5.$tag === 1) {
                  const _ok = _bind$5;
                  decoded = _ok._0;
                } else {
                  const _err = _bind$5;
                  _try_err = _err._0;
                  break _L$3;
                }
                break _L$2;
              }
              return `<binary HTTP body: ${_M0MPC13int3Int18to__string_2einner(_ent.length, 10)} bytes>`;
            }
            return _M0FP39XinOrigin10moon__warc17__web__build__tmp13truncate__str(decoded, 1200);
          } else {
            const _bind$5 = rec.payload;
            return _M0FP39XinOrigin10moon__warc17__web__build__tmp13truncate__str(_M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(_bind$5, 0, _bind$5.length), false), 1200);
          }
        } else {
          const _bind$4 = rec.payload;
          return _M0FP39XinOrigin10moon__warc17__web__build__tmp13truncate__str(_M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(_bind$4, 0, _bind$4.length), false), 1200);
        }
      } else {
        break _L;
      }
    }
  }
  let decoded;
  let _try_err;
  _L$2: {
    _L$3: {
      const _bind = rec.payload;
      const _bind$2 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(_bind, 0, _bind.length), false);
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        decoded = _ok._0;
      } else {
        const _err = _bind$2;
        _try_err = _err._0;
        break _L$3;
      }
      break _L$2;
    }
    return `<binary payload: ${_M0MPC13int3Int18to__string_2einner(rec.payload.length, 10)} bytes>`;
  }
  return _M0FP39XinOrigin10moon__warc17__web__build__tmp13truncate__str(decoded, 1200);
}
function _M0FP39XinOrigin10moon__warc17__web__build__tmp11error__json(msg) {
  const _bind = [];
  const obj = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind, 0, 0), undefined);
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "ok", _M0DTPC14json4Json5False__);
  _M0MPB3Map3setGsRPC14json4JsonE(obj, "error", new _M0DTPC14json4Json6String(msg));
  return _M0MPC14json4Json17stringify_2einner(new _M0DTPC14json4Json6Object(obj), false, 0, undefined);
}
function _M0FP39XinOrigin10moon__warc17__web__build__tmp21sample__warc__gz__hex() {
  const raw = _M0FP29XinOrigin10moon__warc22sample__archive__bytes();
  const _bind = _M0FP29XinOrigin10moon__warc14parse__archive(new _M0TPC15bytes9BytesView(raw, 0, raw.length), undefined);
  if (_bind.$tag === 1) {
    const _Ok = _bind;
    const _recs = _Ok._0;
    const _bind$2 = _M0FP29XinOrigin10moon__warc27encode__archive__gz_2einner(_recs, true, 6);
    return _M0FP39XinOrigin10moon__warc6digest11hex__encode(new _M0TPC15bytes9BytesView(_bind$2, 0, _bind$2.length));
  } else {
    return "";
  }
}
function _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hex(hex_bytes, filename, surt_prefix, closest_url, closest_ts) {
  const _bind = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(hex_bytes, undefined));
  const _bind$2 = _M0FP39XinOrigin10moon__warc6digest11hex__decode(new _M0TPC16string10StringView(_bind, 0, _bind.length));
  let raw;
  if (_bind$2.$tag === 1) {
    const _Ok = _bind$2;
    raw = _Ok._0;
  } else {
    const _Err = _bind$2;
    const _e = _Err._0;
    return _M0FP39XinOrigin10moon__warc17__web__build__tmp11error__json(`Invalid hex bytes: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0IP39XinOrigin10moon__warc6digest11DigestErrorPC15debug5Debug8to__repr(_e))}`);
  }
  const is_gz = raw.length >= 2 && ((0 >>> 0 < raw.length ? raw[0] : $oob()) === 31 && (1 >>> 0 < raw.length ? raw[1] : $oob()) === 139);
  const format_str = is_gz ? "Multi-Member .warc.gz (RFC 1952)" : "Uncompressed WARC (ISO 28500)";
  let records;
  if (is_gz) {
    const _bind$3 = _M0FP29XinOrigin10moon__warc18parse__archive__gz(new _M0TPC15bytes9BytesView(raw, 0, raw.length), undefined);
    if (_bind$3.$tag === 1) {
      const _Ok = _bind$3;
      records = _Ok._0;
    } else {
      const _Err = _bind$3;
      const _e = _Err._0;
      return _M0FP39XinOrigin10moon__warc17__web__build__tmp11error__json(`WARC.GZ parse failed: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0IP39XinOrigin10moon__warc5codec10CodecErrorPC15debug5Debug8to__repr(_e))}`);
    }
  } else {
    const _bind$3 = _M0FP29XinOrigin10moon__warc14parse__archive(new _M0TPC15bytes9BytesView(raw, 0, raw.length), undefined);
    if (_bind$3.$tag === 1) {
      const _Ok = _bind$3;
      records = _Ok._0;
    } else {
      const _Err = _bind$3;
      const _e = _Err._0;
      return _M0FP39XinOrigin10moon__warc17__web__build__tmp11error__json(`WARC parse failed: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0IP39XinOrigin10moon__warc5codec10CodecErrorPC15debug5Debug8to__repr(_e))}`);
    }
  }
  let fname;
  const _p = _M0MPC16string6String4trim(filename, undefined);
  if ((_p.end - _p.start | 0) === 0) {
    fname = is_gz ? "archive.warc.gz" : "archive.warc";
  } else {
    fname = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(filename, undefined));
  }
  const report = _M0FP29XinOrigin10moon__warc17validate__archive(records);
  const revisits = _M0FP29XinOrigin10moon__warc17resolve__revisits(records);
  const index = _M0FP29XinOrigin10moon__warc26build__cdxj__index_2einner(records, fname);
  const diags_arr = new _M0TPB5ArrayGRPC14json4JsonE([], 0);
  const _bind$3 = report.diagnostics;
  const _bind$4 = _bind$3.len;
  const _bind$5 = _bind$3.buf;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const d = _bind$5[_];
      const _bind$6 = [];
      const do_obj = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$6, 0, 0), undefined);
      const _p$2 = _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0IP39XinOrigin10moon__warc8validate8SeverityPC15debug5Debug8to__repr(d.severity));
      _M0MPB3Map3setGsRPC14json4JsonE(do_obj, "severity", new _M0DTPC14json4Json6String(_p$2));
      const _p$3 = d.code;
      _M0MPB3Map3setGsRPC14json4JsonE(do_obj, "code", new _M0DTPC14json4Json6String(_p$3));
      const _p$4 = d.record_index + 0;
      const _p$5 = undefined;
      _M0MPB3Map3setGsRPC14json4JsonE(do_obj, "record_index", new _M0DTPC14json4Json6Number(_p$4, _p$5));
      const _p$6 = _M0MPC15int645Int6418to__string_2einner(d.offset, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(do_obj, "offset", new _M0DTPC14json4Json6String(_p$6));
      const _p$7 = d.message;
      _M0MPB3Map3setGsRPC14json4JsonE(do_obj, "message", new _M0DTPC14json4Json6String(_p$7));
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(diags_arr, new _M0DTPC14json4Json6Object(do_obj));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const recs_arr = new _M0TPB5ArrayGRPC14json4JsonE([], 0);
  const _bind$6 = records.len;
  let _tmp$2 = 0;
  while (true) {
    const idx = _tmp$2;
    if (idx < _bind$6) {
      if (idx < 0 || idx >= records.len) {
        $panic();
      }
      const r = records.buf[idx];
      const h = r.header;
      const _bind$7 = [];
      const ro = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$7, 0, 0), undefined);
      const _p$2 = idx + 0;
      const _p$3 = undefined;
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "index", new _M0DTPC14json4Json6Number(_p$2, _p$3));
      const _p$4 = _M0MP39XinOrigin10moon__warc6header11WarcVersion16to__wire__string(h.version);
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "version", new _M0DTPC14json4Json6String(_p$4));
      const _bind$8 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(h);
      let _p$5;
      if (_bind$8 === undefined) {
        _p$5 = "unknown";
      } else {
        const _Some = _bind$8;
        const _t = _Some;
        _p$5 = _M0MP39XinOrigin10moon__warc6header8WarcType16to__wire__string(_t);
      }
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "warc_type", new _M0DTPC14json4Json6String(_p$5));
      const _p$6 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10record__id(h), "-");
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "record_id", new _M0DTPC14json4Json6String(_p$6));
      const _p$7 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader11target__uri(h), "-");
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "target_uri", new _M0DTPC14json4Json6String(_p$7));
      const _p$8 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__date(h), "-");
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "date", new _M0DTPC14json4Json6String(_p$8));
      const _p$9 = _M0MPC15int645Int6418to__string_2einner(r.offset, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "offset", new _M0DTPC14json4Json6String(_p$9));
      const _p$10 = _M0MPC15int645Int6418to__string_2einner(r.record_length, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "length", new _M0DTPC14json4Json6String(_p$10));
      const _p$11 = r.payload.length + 0;
      const _p$12 = undefined;
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "payload_bytes", new _M0DTPC14json4Json6Number(_p$11, _p$12));
      const _p$13 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader13block__digest(h), "-");
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "block_digest", new _M0DTPC14json4Json6String(_p$13));
      const _p$14 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MP39XinOrigin10moon__warc6header10WarcHeader15payload__digest(h), "-");
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "payload_digest", new _M0DTPC14json4Json6String(_p$14));
      const _bind$9 = _M0MP39XinOrigin10moon__warc6header10WarcHeader9serialize(h);
      const _p$15 = _M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(_bind$9, 0, _bind$9.length), false);
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "headers_text", new _M0DTPC14json4Json6String(_p$15));
      const _p$16 = _M0FP39XinOrigin10moon__warc17__web__build__tmp16extract__preview(r);
      _M0MPB3Map3setGsRPC14json4JsonE(ro, "body_preview", new _M0DTPC14json4Json6String(_p$16));
      _L: {
        _L$2: {
          const _bind$10 = _M0MP39XinOrigin10moon__warc6header10WarcHeader10warc__type(h);
          if (_bind$10 === undefined) {
            break _L$2;
          } else {
            const _Some = _bind$10;
            const _x = _Some;
            if (_x.$tag === 1) {
              const _bind$11 = r.payload;
              const _bind$12 = _M0FP39XinOrigin10moon__warc13http__payload21parse__http__response(new _M0TPC15bytes9BytesView(_bind$11, 0, _bind$11.length));
              if (_bind$12.$tag === 1) {
                const _Ok = _bind$12;
                const _resp = _Ok._0;
                const _p$17 = _resp.status_code + 0;
                const _p$18 = undefined;
                _M0MPB3Map3setGsRPC14json4JsonE(ro, "http_status", new _M0DTPC14json4Json6Number(_p$17, _p$18));
                const _bind$13 = _M0MP39XinOrigin10moon__warc13http__payload12HttpResponse19content__type__mime(_resp);
                if (_bind$13 === undefined) {
                } else {
                  const _Some$2 = _bind$13;
                  const _m = _Some$2;
                  _M0MPB3Map3setGsRPC14json4JsonE(ro, "mime", new _M0DTPC14json4Json6String(_m));
                }
              }
            } else {
              break _L$2;
            }
          }
          break _L;
        }
        const _bind$10 = _M0MP39XinOrigin10moon__warc6header10WarcHeader13content__type(h);
        if (_bind$10 === undefined) {
        } else {
          const _Some = _bind$10;
          const _ct = _Some;
          _M0MPB3Map3setGsRPC14json4JsonE(ro, "mime", new _M0DTPC14json4Json6String(_ct));
        }
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(recs_arr, new _M0DTPC14json4Json6Object(ro));
      _tmp$2 = idx + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const rev_arr = new _M0TPB5ArrayGRPC14json4JsonE([], 0);
  const _bind$7 = revisits.len;
  const _bind$8 = revisits.buf;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$7) {
      const rv = _bind$8[_];
      const _bind$9 = [];
      const rvo = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$9, 0, 0), undefined);
      const _p$2 = rv.revisit_index + 0;
      const _p$3 = undefined;
      _M0MPB3Map3setGsRPC14json4JsonE(rvo, "revisit_index", new _M0DTPC14json4Json6Number(_p$2, _p$3));
      const _p$4 = rv.revisit_id;
      _M0MPB3Map3setGsRPC14json4JsonE(rvo, "revisit_id", new _M0DTPC14json4Json6String(_p$4));
      const _p$5 = _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0IP39XinOrigin10moon__warc8validate16RevisitMatchKindPC15debug5Debug8to__repr(rv.match_kind));
      _M0MPB3Map3setGsRPC14json4JsonE(rvo, "match_kind", new _M0DTPC14json4Json6String(_p$5));
      const _bind$10 = rv.target_index;
      if (_bind$10 === undefined) {
      } else {
        const _Some = _bind$10;
        const _ti = _Some;
        const _p$6 = _ti + 0;
        const _p$7 = undefined;
        _M0MPB3Map3setGsRPC14json4JsonE(rvo, "target_index", new _M0DTPC14json4Json6Number(_p$6, _p$7));
      }
      const _bind$11 = rv.target_record_id;
      if (_bind$11 === undefined) {
      } else {
        const _Some = _bind$11;
        const _tid = _Some;
        _M0MPB3Map3setGsRPC14json4JsonE(rvo, "target_record_id", new _M0DTPC14json4Json6String(_tid));
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(rev_arr, new _M0DTPC14json4Json6Object(rvo));
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const prefix_clean = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(surt_prefix, undefined));
  let cdxj_list;
  if (prefix_clean === "") {
    cdxj_list = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex7entries(index);
  } else {
    if (_M0MPC16string6String11has__prefix(prefix_clean, _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5094) || (_M0MPC16string6String11has__prefix(prefix_clean, _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5095) || _M0MPC16string6String11has__prefix(prefix_clean, _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hexN6recordS5096))) {
      const _bind$9 = _M0FP39XinOrigin10moon__warc4surt8to__surt(new _M0TPC16string10StringView(prefix_clean, 0, prefix_clean.length));
      if (_bind$9.$tag === 1) {
        const _Ok = _bind$9;
        const _s = _Ok._0;
        cdxj_list = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex14lookup__prefix(index, new _M0TPC16string10StringView(_s, 0, _s.length));
      } else {
        cdxj_list = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex14lookup__prefix(index, new _M0TPC16string10StringView(prefix_clean, 0, prefix_clean.length));
      }
    } else {
      cdxj_list = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex14lookup__prefix(index, new _M0TPC16string10StringView(prefix_clean, 0, prefix_clean.length));
    }
  }
  const cdxj_arr = new _M0TPB5ArrayGRPC14json4JsonE([], 0);
  const _bind$9 = cdxj_list.len;
  const _bind$10 = cdxj_list.buf;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$9) {
      const e = _bind$10[_];
      const _bind$11 = [];
      const co = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$11, 0, 0), undefined);
      const _p$2 = e.surt;
      _M0MPB3Map3setGsRPC14json4JsonE(co, "surt", new _M0DTPC14json4Json6String(_p$2));
      const _p$3 = e.timestamp;
      _M0MPB3Map3setGsRPC14json4JsonE(co, "timestamp", new _M0DTPC14json4Json6String(_p$3));
      const _p$4 = e.url;
      _M0MPB3Map3setGsRPC14json4JsonE(co, "url", new _M0DTPC14json4Json6String(_p$4));
      const _p$5 = e.warc_type;
      _M0MPB3Map3setGsRPC14json4JsonE(co, "warc_type", new _M0DTPC14json4Json6String(_p$5));
      const _p$6 = _M0MPC15int645Int6418to__string_2einner(e.offset, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(co, "offset", new _M0DTPC14json4Json6String(_p$6));
      const _p$7 = _M0MPC15int645Int6418to__string_2einner(e.length, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(co, "length", new _M0DTPC14json4Json6String(_p$7));
      const _p$8 = _M0FP39XinOrigin10moon__warc4cdxj12format__line(e);
      _M0MPB3Map3setGsRPC14json4JsonE(co, "line", new _M0DTPC14json4Json6String(_p$8));
      const _bind$12 = e.mime;
      if (_bind$12 === undefined) {
      } else {
        const _Some = _bind$12;
        const _m = _Some;
        _M0MPB3Map3setGsRPC14json4JsonE(co, "mime", new _M0DTPC14json4Json6String(_m));
      }
      const _bind$13 = e.status;
      if (_bind$13 === undefined) {
      } else {
        const _Some = _bind$13;
        const _st = _Some;
        const _p$9 = _st + 0;
        const _p$10 = undefined;
        _M0MPB3Map3setGsRPC14json4JsonE(co, "status", new _M0DTPC14json4Json6Number(_p$9, _p$10));
      }
      const _bind$14 = e.digest;
      if (_bind$14 === undefined) {
      } else {
        const _Some = _bind$14;
        const _dg = _Some;
        _M0MPB3Map3setGsRPC14json4JsonE(co, "digest", new _M0DTPC14json4Json6String(_dg));
      }
      _M0MPC15array5Array4pushGRP39XinOrigin10moon__warc8validate10DiagnosticE(cdxj_arr, new _M0DTPC14json4Json6Object(co));
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$11 = [];
  const out = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$11, 0, 0), undefined);
  _M0MPB3Map3setGsRPC14json4JsonE(out, "ok", _M0DTPC14json4Json4True__);
  const _p$2 = "0.3.1";
  _M0MPB3Map3setGsRPC14json4JsonE(out, "version", new _M0DTPC14json4Json6String(_p$2));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "format", new _M0DTPC14json4Json6String(format_str));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "is_gz", is_gz ? _M0DTPC14json4Json4True__ : _M0DTPC14json4Json5False__);
  const _p$3 = raw.length + 0;
  const _p$4 = undefined;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "input_bytes", new _M0DTPC14json4Json6Number(_p$3, _p$4));
  const _p$5 = report.record_count + 0;
  const _p$6 = undefined;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "record_count", new _M0DTPC14json4Json6Number(_p$5, _p$6));
  const _p$7 = report.error_count === 0;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "valid", _p$7 ? _M0DTPC14json4Json4True__ : _M0DTPC14json4Json5False__);
  const _p$8 = report.error_count + 0;
  const _p$9 = undefined;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "error_count", new _M0DTPC14json4Json6Number(_p$8, _p$9));
  const _p$10 = report.warning_count + 0;
  const _p$11 = undefined;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "warning_count", new _M0DTPC14json4Json6Number(_p$10, _p$11));
  const _p$12 = index.entries.len + 0;
  const _p$13 = undefined;
  _M0MPB3Map3setGsRPC14json4JsonE(out, "cdxj_total", new _M0DTPC14json4Json6Number(_p$12, _p$13));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "diagnostics", new _M0DTPC14json4Json5Array(diags_arr));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "records", new _M0DTPC14json4Json5Array(recs_arr));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "revisits", new _M0DTPC14json4Json5Array(rev_arr));
  _M0MPB3Map3setGsRPC14json4JsonE(out, "cdxj_entries", new _M0DTPC14json4Json5Array(cdxj_arr));
  const _p$14 = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex11format__all(index);
  _M0MPB3Map3setGsRPC14json4JsonE(out, "cdxj_text", new _M0DTPC14json4Json6String(_p$14));
  const _p$15 = _M0FP29XinOrigin10moon__warc21export__cdx11_2einner(records, fname, true);
  _M0MPB3Map3setGsRPC14json4JsonE(out, "cdx11", new _M0DTPC14json4Json6String(_p$15));
  const _p$16 = _M0FP29XinOrigin10moon__warc13export__jsonl(records, undefined);
  _M0MPB3Map3setGsRPC14json4JsonE(out, "jsonl", new _M0DTPC14json4Json6String(_p$16));
  const cu = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(closest_url, undefined));
  const ct = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(closest_ts, undefined));
  if (!(cu === "")) {
    const _bind$12 = _M0MP39XinOrigin10moon__warc4cdxj9CdxjIndex15lookup__closest(index, new _M0TPC16string10StringView(cu, 0, cu.length), new _M0TPC16string10StringView(ct, 0, ct.length));
    if (_bind$12 === undefined) {
    } else {
      const _Some = _bind$12;
      const _hit = _Some;
      const _bind$13 = [];
      const ho = _M0MPB3Map3MapGsRPC14json4JsonE(new _M0TPB9ArrayViewGUsRPC14json4JsonEE(_bind$13, 0, 0), undefined);
      const _p$17 = _hit.surt;
      _M0MPB3Map3setGsRPC14json4JsonE(ho, "surt", new _M0DTPC14json4Json6String(_p$17));
      const _p$18 = _hit.timestamp;
      _M0MPB3Map3setGsRPC14json4JsonE(ho, "timestamp", new _M0DTPC14json4Json6String(_p$18));
      const _p$19 = _hit.warc_type;
      _M0MPB3Map3setGsRPC14json4JsonE(ho, "warc_type", new _M0DTPC14json4Json6String(_p$19));
      const _p$20 = _M0MPC15int645Int6418to__string_2einner(_hit.offset, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(ho, "offset", new _M0DTPC14json4Json6String(_p$20));
      const _p$21 = _M0MPC15int645Int6418to__string_2einner(_hit.length, 10);
      _M0MPB3Map3setGsRPC14json4JsonE(ho, "length", new _M0DTPC14json4Json6String(_p$21));
      const _bind$14 = _hit.digest;
      if (_bind$14 === undefined) {
      } else {
        const _Some$2 = _bind$14;
        const _dg = _Some$2;
        _M0MPB3Map3setGsRPC14json4JsonE(ho, "digest", new _M0DTPC14json4Json6String(_dg));
      }
      _M0MPB3Map3setGsRPC14json4JsonE(out, "closest_hit", new _M0DTPC14json4Json6Object(ho));
    }
  }
  return _M0MPC14json4Json17stringify_2einner(new _M0DTPC14json4Json6Object(out), false, 0, undefined);
}
const api = { sampleWarcGzHex: _M0FP39XinOrigin10moon__warc17__web__build__tmp21sample__warc__gz__hex, inspectArchiveHex: _M0FP39XinOrigin10moon__warc17__web__build__tmp21inspect__archive__hex };
if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
if (globalScope) { globalScope.MoonWarcWeb = api; }
})(typeof window !== 'undefined' ? window : globalThis);
