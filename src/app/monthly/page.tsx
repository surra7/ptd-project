'use client';
import NavBottom from '@/components/NavBottom';
import Calendar from '@/containers/Calendar';
import { getStreak } from '@/services/getStreak';
import { useEffect, useState } from 'react';

export default function Monthly() {
  const { data: streak, isLoading: isStreakLoading, error: isStreakError } = getStreak();
  const [streakNumber, setStreakNumber] = useState(0);

  useEffect(() => {
    if (streak !== undefined) {
      setStreakNumber(streak.streak);
      console.log('streak', streak);
    }
  }, [streak]);

  return (
    <main className="w-full h-full">
      <section className="wrap-section flex flex-col justify-center items-center">
        <div className="text-2xl font-bold">Monthly</div>
        <Calendar />
        <div className="h-[4.0625rem] text-center">
          <div className="font-medium">
            <span className="text-primary-600">{streakNumber}일</span> 연속 목표 달성!
          </div>
          <div className="text-xs text-black-200 font-medium">5일 달성 시 랜덤박스 증정</div>
        </div>
      </section>
      <NavBottom />
    </main>
  );
}
