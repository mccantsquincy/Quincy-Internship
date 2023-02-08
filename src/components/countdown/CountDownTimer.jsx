import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const CountDownTimer = ({ expiryDate }) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
        updateTimer(expiryDate);
    }, 1000)
    return () => clearInterval(intervalId)
  },[expiryDate])

  const updateTimer = (expiryDate) => {
    let millisElapsed = expiryDate - Date.now();

    let secondsLeft = millisElapsed / 1000;
    let minutesLeft = secondsLeft / 60;
    let hoursLeft = minutesLeft / 24;

    let secondsText = Math.floor(secondsLeft) % 60;
    let minutesText = Math.floor(minutesLeft) % 60;
    let hoursText = Math.floor(hoursLeft);

    if(secondsLeft.toString().length < 2) {
        secondsLeft = secondsLeft.toString().padStart(2, "0");
    }

    if(minutesText.toString().length < 2) {
        minutesText = minutesText.toString().padStart(2, "0");
    }

    if(hoursText.toString().length < 2) {
        hoursText = hoursText.toString().padStart(2, "0");
    }

    setHours((hoursText) + "h");
    setMinutes((minutesText) + "m");
    setSeconds((secondsText) + "s");
  };  

  return (
    <div className="de_countdown">
      <span>{hours} </span>
      <span>{minutes} </span>
      <span>{seconds}</span>
    </div>
  );
};

export default CountDownTimer;
