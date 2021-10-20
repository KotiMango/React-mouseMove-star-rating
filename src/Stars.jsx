import React, { useState } from 'react';
import { getAvgRating, renderStars } from './stars-service';

export default function Stars() {
  const [ratingArr, setRatingArr] = useState([]);
  const [isRenderAvg, setIsRenderAvg] = useState(false);
  const [starRate, setStarRate] = useState(0);

  const avgRating = getAvgRating(ratingArr);

  const onMouseStar = (ev, idx) => {
    const starCursorPos = ev.nativeEvent.offsetX;
    if (starCursorPos > 34) {
      setStarRate(idx + 1);
    } else if (starCursorPos < 25) {
      setStarRate(idx);
    } else {
      setStarRate(idx + 0.5);
    }
  };

  const submitRate = () => {
    if (isRenderAvg) {
      setStarRate(0);
      return setIsRenderAvg(false);
    }
    setRatingArr((prevState) => [...prevState, starRate]);
    setIsRenderAvg(true);
  };

  let ratingStars = renderStars(starRate, onMouseStar);
  let averageRatingStars = renderStars(avgRating);

  return (
    <div className='stars-container'>
      <div className='stars'>
        <h1>Avg Rating:{avgRating.toFixed(2)}</h1>
        {isRenderAvg ? averageRatingStars : ratingStars}
        <div>
          Current Rating:
          {isRenderAvg ? ' AVG' : starRate}
        </div>
        <button className='button' onClick={submitRate}>
          {isRenderAvg ? 'Rate' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
