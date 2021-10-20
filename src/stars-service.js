export function roundToHalf(rawAvgFloat) {
  let roundedNum = Math.floor(rawAvgFloat);
  if (rawAvgFloat - roundedNum < 0.5) {
    return roundedNum;
  }
  return roundedNum + 0.5;
}
export const getWorkIdx = (starArr, idx) =>
  starArr.findIndex((star) => star === 0.5) !== -1
    ? starArr.findIndex((star) => star === 0.5)
    : starArr.findIndex((star) => star === 0) !== -1
    ? starArr.findIndex((star) => star === 0)
    : idx;

export const renderAvg = (avgRating) => {
  const roundedAvg = roundToHalf(avgRating);
  const avgStarBois = new Array(5).fill(0).map((star, idx) => {
    const starPos = idx;
    if (roundedAvg > starPos) {
      if (roundedAvg - starPos === 0.5)
        return (
          <span
            className='star half'
            aria-hidden='true'
            key={idx + 10}
          ></span>
        );
      return (
        <span
          className='star on'
          aria-hidden='true'
          key={idx + 10}
        ></span>
      );
    } else {
      return (
        <span
          className='star'
          aria-hidden='true'
          key={idx + 10}
        ></span>
      );
    }
  });
  return avgStarBois;
};

export const getRatingStars = (func) =>
  new Array(5)
    .fill(0)
    .map((star, idx) => (
      <span
        onMouseMove={(ev) => func(ev, idx)}
        className='star'
        aria-hidden='true'
        key={idx}
      ></span>
    ));

export const getAvgRating = (ratingArr) =>
  Array.isArray(ratingArr) && ratingArr.length
    ? ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length
    : 0;

export const getStarRating = (starArr) =>
  starArr.reduce((a, b) => a + b, 0);
