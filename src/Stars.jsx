import React, { useState } from 'react';

export default function Stars() {
  const [starArray, setStarArray] = useState(new Array(5).fill(0));
  const [ratingArr, setRatingArr] = useState([]);
  const updateStarArr = (idx, rate) => {
    const fractionRateFlag = starArray.some((star) => star === 0.5);
    const workIdx =
      starArray.findIndex((star) => star === 0.5) !== -1
        ? starArray.findIndex((star) => star === 0.5)
        : starArray.findIndex((star) => star === 0) !== -1
        ? starArray.findIndex((star) => star === 0)
        : idx;
    console.log(workIdx);
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

  const mauser = (ev, idx) => {
    const starCursorPos = ev.nativeEvent.offsetX;
    if (starCursorPos > 15 && updateStarArr(idx, 1)) {
      ev.target.classList.remove('half');
      ev.target.classList.add('on');
    } else if (starCursorPos < 5 && updateStarArr(idx, 0)) {
      ev.target.classList.remove('on', 'half');
    } else {
      const starArr = updateStarArr(idx, 0.5);
      if (starArr) {
        ev.target.classList.add('half');
        ev.target.classList.remove('on');
      }
    }
  };
  const currStarRating = starArray.reduce((a, b) => a + b, 0);
  const avgRating =
    Array.isArray(ratingArr) && ratingArr.length
      ? ratingArr.reduce((a, b) => a + b, 0) / ratingArr.length
      : 0;
  const submitRate = () => {
    setRatingArr((prevState) => [...prevState, currStarRating]);
  };

  const starBois = new Array(5)
    .fill(0)
    .map((star, idx) => (
      <span
        onMouseMove={(ev) => mauser(ev, idx)}
        className='star'
        aria-hidden='true'
        key={idx}
      ></span>
    ));
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)',
        transform: 'scale(2)',
        textAlign: 'center',
      }}
    >
      <h1>Avg Rating:{avgRating}</h1>
      {starBois}
      <div>Rating:{currStarRating}</div>
      <button className='button' onClick={submitRate}>
        submit
      </button>
    </div>
  );
}