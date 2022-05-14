import React, { useState, useEffect } from 'react';

function Solution() {
  const [minutesToShow, setMinutesToShow] = useState(0);
  const [secondsToShow, setSecondsToShow] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  let myInterval
  useEffect(() => {
    if (isStarted) {
      myInterval = setInterval(() => {
        if (secondsToShow > 0) {
          setSecondsToShow(secondsToShow - 1);
        }
        if (secondsToShow === 0) {
          if (minutesToShow === 0) {
            clearInterval(myInterval)
          } else {
            setMinutesToShow(minutesToShow - 1);
            setSecondsToShow(59);
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const pauseResume = () => {
    if (isStarted) {
      clearInterval(myInterval);
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  }

  const startFunction = () => {
    if (myInterval) clearInterval(myInterval);
    let minutesFormatted = inputMinutes ? parseInt(inputMinutes) : 0;
    let secondsFormatted = inputSeconds ? parseInt(inputSeconds) : 0;
    if (secondsFormatted > 59) {
      minutesFormatted = minutesFormatted + Math.floor(secondsFormatted / 60);
      secondsFormatted = secondsFormatted % 60;
    }
    setMinutesToShow(minutesFormatted);
    setSecondsToShow(secondsFormatted);
    setIsStarted(true);
  }

  const resetFunction = () => {
    setIsStarted(false);
    if (myInterval) clearInterval(myInterval);
    setMinutesToShow(0);
    setSecondsToShow(0);
    setInputSeconds(0);
    setInputMinutes(0);
  }
  console.log(inputSeconds)
  return (
    <div>
      <label>
        <input value={inputMinutes} onChange={(e) => setInputMinutes(e.target.value)} type="number" />
        Minutes
      </label>
      <label  >
        <input value={inputSeconds} onChange={(e) => setInputSeconds(e.target.value)} type="number" />
        Seconds
      </label>
      <button onClick={() => startFunction()} >START</button>
      <button onClick={() => pauseResume()} >PAUSE / RESUME</button>
      <button onClick={() => resetFunction()} >RESET</button>
      <h1 data-testid="running-clock">{minutesToShow < 10 ? `0${minutesToShow}` : minutesToShow}:{secondsToShow < 10 ? `0${secondsToShow}` : secondsToShow}</h1>
    </div>
  );
}

export default Solution;
