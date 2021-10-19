export function roundToHalf(rawAvgFloat) {
  let roundedNum = Math.floor(rawAvgFloat);
  if (rawAvgFloat - roundedNum < 0.5) {
    return roundedNum;
  }
  return roundedNum + 0.5;
}
