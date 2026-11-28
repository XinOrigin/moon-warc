///|
test "wbtest next_segment_end avoids Int32 overflow near Int32::MAX" {
  assert_eq(
    next_segment_end(1_200_000_000, 1_200_000_000, 1_500_000_000),
    1_500_000_000,
  )
  assert_eq(
    next_segment_end(2_000_000_000, 500_000_000, 2_147_483_647),
    2_147_483_647,
  )
  assert_eq(next_segment_end(100, 50, 200), 150)
}
