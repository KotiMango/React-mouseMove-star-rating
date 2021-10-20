import React, { useState } from 'react';
import {
  getWorkIdx,
  renderAvg,
  getRatingStars,
  getAvgRating,
  getStarRating,
} from './stars-service';

export default function Stars() {
  const [starArray, setStarArray] = useState(new Array(5).fill(0));
  const [ratingArr, setRatingArr] = useState([]);
  const [isRenderAvg, setIsRenderAvg] = useState(false);

  const currStarRating = getStarRating(starArray);
  const avgRating = getAvgRating(ratingArr);

  const updateStarArr = (idx, rate) => {
    const fractionRateFlag = starArray.some((star) => star === 0.5);
    const workIdx = getWorkIdx(starArray, idx);
    if (
      idx !== starArray.lastIndexOf(fractionRateFlag ? 0.5 : 1) &&
      idx !== workIdx
    )
      return undefined;
    const starArrCpy = [...starArray];
    starArrCpy[idx] = rate;
    if (
      (idx > 0 && !starArrCpy[idx - 1]) ||
      starArrCpy[idx + 1] > 0
    ) {
      return undefined;
    } else {
      setStarArray(starArrCpy);
      return starArray;
    }
  };

  const onMouseStar = (ev, idx) => {
    const starCursorPos = ev.nativeEvent.offsetX;
    if (starCursorPos > 34 && updateStarArr(idx, 1)) {
      ev.target.classList.remove('half');
      ev.target.classList.add('on');
    } else if (starCursorPos < 25 && updateStarArr(idx, 0)) {
      ev.target.classList.remove('on', 'half');
    } else {
      const starArr = updateStarArr(idx, 0.5);
      if (starArr) {
        ev.target.classList.add('half');
        ev.target.classList.remove('on');
      }
    }
  };

  const submitRate = () => {
    if (isRenderAvg) return setIsRenderAvg(false);
    setRatingArr((prevState) => [...prevState, currStarRating]);
    setIsRenderAvg(true);
    setStarArray(new Array(5).fill(0));
  };

  let ratingStars = getRatingStars(onMouseStar);
  let averageRatingStars = renderAvg(avgRating);

  return (
    <div className='stars-container'>
      <h1>Avg Rating:{avgRating.toFixed(2)}</h1>
      {isRenderAvg ? averageRatingStars : ratingStars}
      <div>
        Current Rating:
        {isRenderAvg ? ' AVG' : currStarRating}
      </div>
      <button className='button' onClick={submitRate}>
        {isRenderAvg ? 'Rate' : 'Submit'}
      </button>
    </div>
  );
}
