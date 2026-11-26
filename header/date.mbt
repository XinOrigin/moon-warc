///|
/// Errors returned while parsing or validating WARC headers and dates.
#derive(Eq, Debug)
pub(all) enum HeaderError {
  InvalidVersion(String)
  InvalidHeaderLine(String)
  MissingRequiredHeader(String)
  InvalidDate(String)
  InvalidContentLength(String)
  MissingTerminator
}

///|
/// Parsed ISO 28500 UTC timestamp (`YYYY-MM-DDThh:mm:ss[.frac]Z`).
#derive(Eq, Debug)
pub(all) struct WarcDate {
  year : Int32
  month : Int32
  day : Int32
  hour : Int32
  minute : Int32
  second : Int32
  fraction : String?
  raw : String
}

///|
fn parse_fixed_digits(s : String, start : Int32, len : Int32) -> Int32? {
  if start + len > s.length() {
    return None
  }
  let mut acc = 0
  for i in start..<(start + len) {
    let c = s[i].to_int()
    if c < 48 || c > 57 {
      return None
    }
    acc = acc * 10 + (c - 48)
  }
  Some(acc)
}

///|
fn is_leap_year(year : Int32) -> Bool {
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}

///|
fn days_in_month(year : Int32, month : Int32) -> Int32 {
  match month {
    1 | 3 | 5 | 7 | 8 | 10 | 12 => 31
    4 | 6 | 9 | 11 => 30
    2 => if is_leap_year(year) { 29 } else { 28 }
    _ => 0
  }
}

///|
fn pad2(v : Int32) -> String {
  if v < 10 {
    "0" + v.to_string()
  } else {
    v.to_string()
  }
}

///|
fn pad4(v : Int32) -> String {
  if v < 10 {
    "000" + v.to_string()
  } else if v < 100 {
    "00" + v.to_string()
  } else if v < 1000 {
    "0" + v.to_string()
  } else {
    v.to_string()
  }
}

///|
/// Validates calendar components for a canonical UTC timestamp.
fn build_validated_warc_date(
  year : Int32,
  month : Int32,
  day : Int32,
  hour : Int32,
  minute : Int32,
  second : Int32,
  fraction : String?,
  raw : String,
) -> Result[WarcDate, HeaderError] {
  if year < 1 || month < 1 || month > 12 {
    return Err(InvalidDate(raw))
  }
  if day < 1 || day > days_in_month(year, month) {
    return Err(InvalidDate(raw))
  }
  if hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59 {
    return Err(InvalidDate(raw))
  }
  Ok({ year, month, day, hour, minute, second, fraction, raw, })
}

///|
/// Parses a strict ISO 28500 UTC timestamp (`YYYY-MM-DDThh:mm:ssZ` or WARC 1.1 fractional seconds).
pub fn WarcDate::parse(raw_view : StringView) -> Result[WarcDate, HeaderError] {
  let raw = raw_view.trim().to_owned()
  let len = raw.length()
  if len < 20 {
    return Err(InvalidDate(raw))
  }
  if raw[4].to_int() != 45 ||
    raw[7].to_int() != 45 ||
    raw[10].to_int() != 84 ||
    raw[13].to_int() != 58 ||
    raw[16].to_int() != 58 ||
    raw[len - 1].to_int() != 90 {
    return Err(InvalidDate(raw))
  }
  let year = match parse_fixed_digits(raw, 0, 4) {
    Some(y) => y
    None => return Err(InvalidDate(raw))
  }
  let month = match parse_fixed_digits(raw, 5, 2) {
    Some(m) => m
    None => return Err(InvalidDate(raw))
  }
  let day = match parse_fixed_digits(raw, 8, 2) {
    Some(d) => d
    None => return Err(InvalidDate(raw))
  }
  let hour = match parse_fixed_digits(raw, 11, 2) {
    Some(h) => h
    None => return Err(InvalidDate(raw))
  }
  let minute = match parse_fixed_digits(raw, 14, 2) {
    Some(m) => m
    None => return Err(InvalidDate(raw))
  }
  let second = match parse_fixed_digits(raw, 17, 2) {
    Some(s) => s
    None => return Err(InvalidDate(raw))
  }
  let fraction = if len == 20 {
    None
  } else {
    if raw[19].to_int() != 46 || len == 21 {
      return Err(InvalidDate(raw))
    }
    for i in 20..<(len - 1) {
      let c = raw[i].to_int()
      if c < 48 || c > 57 {
        return Err(InvalidDate(raw))
      }
    }
    Some(raw[20:len - 1].to_owned())
  }
  build_validated_warc_date(
    year, month, day, hour, minute, second, fraction, raw,
  )
}

///|
/// Parses a strict 14-digit CDXJ UTC timestamp (`YYYYMMDDhhmmss`) with full calendar checks.
pub fn WarcDate::parse_cdxj_timestamp(
  raw_view : StringView,
) -> Result[WarcDate, HeaderError] {
  let raw = raw_view.trim().to_owned()
  if raw.length() != 14 {
    return Err(InvalidDate(raw))
  }
  let year = match parse_fixed_digits(raw, 0, 4) {
    Some(y) => y
    None => return Err(InvalidDate(raw))
  }
  let month = match parse_fixed_digits(raw, 4, 2) {
    Some(m) => m
    None => return Err(InvalidDate(raw))
  }
  let day = match parse_fixed_digits(raw, 6, 2) {
    Some(d) => d
    None => return Err(InvalidDate(raw))
  }
  let hour = match parse_fixed_digits(raw, 8, 2) {
    Some(h) => h
    None => return Err(InvalidDate(raw))
  }
  let minute = match parse_fixed_digits(raw, 10, 2) {
    Some(m) => m
    None => return Err(InvalidDate(raw))
  }
  let second = match parse_fixed_digits(raw, 12, 2) {
    Some(s) => s
    None => return Err(InvalidDate(raw))
  }
  build_validated_warc_date(year, month, day, hour, minute, second, None, raw)
}

///|
/// Formats the timestamp in 14-digit CDXJ format (`YYYYMMDDhhmmss`).
pub fn WarcDate::to_cdxj_timestamp(self : WarcDate) -> String {
  pad4(self.year) +
  pad2(self.month) +
  pad2(self.day) +
  pad2(self.hour) +
  pad2(self.minute) +
  pad2(self.second)
}

///|
/// Formats the timestamp in canonical ISO 8601 UTC format.
pub fn WarcDate::to_iso_string(self : WarcDate) -> String {
  let base = pad4(self.year) +
    "-" +
    pad2(self.month) +
    "-" +
    pad2(self.day) +
    "T" +
    pad2(self.hour) +
    ":" +
    pad2(self.minute) +
    ":" +
    pad2(self.second)
  match self.fraction {
    Some(f) => base + "." + f + "Z"
    None => base + "Z"
  }
}
