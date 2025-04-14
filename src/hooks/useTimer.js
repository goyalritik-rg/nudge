import { useState, useEffect, useCallback, useRef } from "react";

const useTimer = ({ durationInSeconds = 0 }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const timerIntervalRef = useRef();

  useEffect(() => setSeconds(durationInSeconds), [durationInSeconds]);

  useEffect(() => {
    if (seconds === 0) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

      setIsActive(false);
    }

    if (isActive && seconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setSeconds((previousState) => previousState - 1);
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, seconds]);

  const start = useCallback(() => {
    setSeconds((previousState) =>
      previousState === 0 ? durationInSeconds : previousState
    );
    setIsActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const restart = useCallback(() => {
    setSeconds(durationInSeconds);
    setIsActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    setSeconds(durationInSeconds);
    setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRemainingTime = (duration) => {
    const days = Math.floor(duration / (3600 * 24));
    const hours = Math.floor((duration - days * 3600 * 24) / 3600);
    const minutes = Math.floor(
      (duration - days * 3600 * 24 - hours * 3600) / 60
    );
    const secs = duration - days * 3600 * 24 - hours * 3600 - minutes * 60;

    const isTimeRemaining = !(
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      secs === 0
    );

    return {
      days: days < 10 ? `0${days}` : `${days}`,
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
      seconds: secs < 10 ? `0${secs}` : `${secs}`,

      isTimeRemaining,
    };
  };

  return {
    ...getRemainingTime(seconds),
    isActive,
    start,
    pause,
    restart,
    reset,
  };
};

export default useTimer;
