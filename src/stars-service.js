import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export function roundToHalf(rawAvgFloat) {
  let roundedNum = Math.floor(rawAvgFloat);
  if (rawAvgFloat - roundedNum < 0.5) {
    return roundedNum;
  }
  return roundedNum + 0.5;
}

export const renderStars = (avgRating, submitRate, func = null) => {
  const roundedAvg = roundToHalf(avgRating);
  const elStarArr = new Array(5).fill(0).map((star, idx) => (
    <span
      onClick={submitRate}
      onMouseMove={(ev) => (func ? func(ev, idx) : '')}
      className='star'
      aria-hidden='true'
      key={func ? idx : idx + 10}
    >
      {roundedAvg > idx ? (
        roundedAvg - idx === 0.5 ? (
          <BsStarHalf color='gold' />
        ) : (
          <BsStarFill color='gold' />
        )
      ) : (
        <BsStar color='gold' />
      )}
    </span>
  ));
  return elStarArr;
};

export const getAvgRating = (ratingArr) =>
  Array.isArray(ratingArr) && ratingArr.length
    ? ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length
    : 0;
