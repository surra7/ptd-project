import { axios } from '@/services/instance';
import React, { useEffect, useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { BsSkipStartCircle, BsStopCircle } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';

interface Props {
  postId: number | undefined;
}

function Timer({ postId }: Props) {
  const [seconds, setSeconds] = useState<number>(0); // 초
  const [isActive, setIsActive] = useState<boolean>(false); // 활성화 여부

  useEffect(() => {
    const getTime = async () => {
      try {
        if (postId) {
          const res = await axios.get(`posts/timer/${postId}`);
          console.log(res);
          setSeconds(res.data.formatted_duration);
          if (res.data.on_btn) setIsActive(true);
          else setIsActive(false);
        } else return;
      } catch {
        return;
      }
    };
    getTime();
  }, [postId]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(async () => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, seconds]);

  const handleStart = async (): Promise<void> => {
    setIsActive(prev => !prev);
    try {
      const res = await axios.get(`posts/timer/${postId}`);
      if (!res) {
        await axios.post(`posts/timer/${postId}`);
      } else {
        await axios.patch(`posts/timer/${postId}`, { action: 'restart' });
      }
    } catch {}
  };

  const handleStop = async () => {
    setIsActive(prev => !prev);
    // if (!isActive) {
    //   const nowTimes = formatTime(seconds);
    //   console.log(nowTimes);
    // }
    await axios.patch(`posts/timer/${postId}`, { action: 'pause' });
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
        {seconds ? seconds : '타이머를 이용해 공부 시간을 알아보세요!'}
      </div>
      {isActive ? (
        <button type="button" onClick={handleStop}>
          <BsStopCircle className="w-[1.625rem] h-[1.625rem] text-primary-400" />
        </button>
      ) : (
        <>
          <button type="button" onClick={handleStart}>
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
