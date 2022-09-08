import {useEffect, useState} from 'react';

export const useInterval = (callback: Function, startTime: number) => {
  const [time, setTime] = useState(startTime);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const step = () => {
      if (time === 0) {
        setTime(startTime);
        callback();
      } else {
        setTime(time - 1);
      }
    };

    if (isOn) {
      const interval = setInterval(step, 1000);

      return () => clearInterval(interval);
    }
  }, [time, setTime, isOn, callback, startTime]);

  const toggleOn = (status = !isOn) => setIsOn(status);

  return {time, isOn, toggleOn};
};
