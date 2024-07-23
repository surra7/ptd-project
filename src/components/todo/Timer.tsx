import { axios } from '@/services/instance';
import React, { useEffect, useRef, useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { BsSkipStartCircle, BsStopCircle } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';

interface Props {
  postId: number | undefined;
}

function Timer({ postId }: Props) {
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false); // 활성화 여부
  const countSeconds = useRef(0);
  const duration = useRef('');

  const setTotalSeconds = (formattedSeconds: string) => {
    const [hours, minutes, seconds] = formattedSeconds.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  };

  function secondsToTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 3600) % 60;

    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  useEffect(() => {
    const getTime = async () => {
      if (postId) {
        const res = await axios.get(`posts/timer/${postId}`);
        console.log(res);
        duration.current = res.data.formatted_duration;
        // countSeconds.current = setTotalSeconds(formattedSeconds);
        if (res.data.on_btn) setIsActive(true);
        else setIsActive(false);
      } else return;
    };
    getTime();
  }, [postId]);

  useEffect(() => {
    setFormattedTime(duration.current);
    countSeconds.current = setTotalSeconds(formattedTime);
  }, [formattedTime]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(async () => {
        countSeconds.current += 1;
        setFormattedTime(secondsToTime(countSeconds.current));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

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
    await axios.patch(`posts/timer/${postId}`, { action: 'pause' });
  };

  return (
    <>
      <div>
        <LuTimer className="w-[1.3125rem] h-[1.3125rem] text-black-900" />
      </div>
      <div className="flex items-center w-[19rem] h-[2rem] font-medium text-[0.875rem] text-textGray">
        {formattedTime ? formattedTime : '타이머를 이용해 공부 시간을 알아보세요!'}
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
