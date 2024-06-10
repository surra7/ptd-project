import React, { useEffect, useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { BsSkipStartCircle, BsStopCircle } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';

function Timer() {
  const [seconds, setSeconds] = useState<number>(0); // 초
  const [isActive, setIsActive] = useState<boolean>(false); // 활성화 여부

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval! as NodeJS.Timeout);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [isActive, seconds]);

  const handleStartStop = (): void => {
    setIsActive(!isActive);
    if (!isActive) {
      const nowTimes = formatTime(seconds);
      console.log(nowTimes);
    }
  };

  // 리셋
  const handleReset = (): void => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const hours: number = Math.floor(time / 3600); // 시간
    const minutes: number | string = Math.floor((time - hours * 3600) / 60); // 분
    const seconds: number | string = time - hours * 3600 - minutes * 60; // 초

    const hoursStr: string = hours < 10 ? '0' + hours : String(hours);
    const minutesStr: string = minutes < 10 ? '0' + minutes : String(minutes);
    const secondStr: string = seconds < 10 ? '0' + seconds : String(seconds);

    return `${hoursStr}시간 ${minutesStr}분 ${secondStr}초`;
  };

  return (
    <>
      <div>
        <LuTimer className="w-[1.3125rem] h-[1.3125rem] text-black-900" />
      </div>
      <div className="flex items-center w-[19rem] h-[2rem] font-medium text-[0.875rem] text-textGray">
        {formatTime(seconds)}
      </div>
      {isActive ? (
        <button type="button" onClick={handleStartStop}>
          <BsStopCircle className="w-[1.625rem] h-[1.625rem] text-primary-400" />
        </button>
      ) : (
        <>
          <button type="button" onClick={() => setIsActive(true)}>
            <BsSkipStartCircle className="w-[1.625rem] h-[1.625rem] text-black-200" />
          </button>
          {/* <button type="button" onClick={handleReset}>
            <BiReset className="w-[1.625rem] h-[1.625rem] text-red-400" />
          </button> */}
        </>
      )}
    </>
  );
}

export default Timer;
