'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { userAtom, accessTokenAtom, refreshTokenAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import { getCookieValue } from '@/libs/getCookieValue';
import NavBottom from '@/components/NavBottom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface GoalResponse {
  days_by_deadline: number;
}

function Goal() {
  const [goal, setGoal] = useState<string | null>(null);
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [user] = useAtom(userAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken] = useAtom(refreshTokenAtom);
  const router = useRouter();
  const [res, setRes] = useState<GoalResponse | null>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('https://api.oz-02-main-04.xyz/api/token/refresh/', {
        refresh: refreshToken,
      });
      const newAccessToken = response.data.access;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      return null;
    }
  };

  const handleSetGoal = async () => {
    if (!goal || !year || !month || !day) {
      alert('목표와 D-Day를 모두 입력해주세요.');
      return;
    }
    if (!user) {
      alert('로그인 해주세요!');
      router.push('/login');
    }

    const dDay = `${year}-${month}-${day}`;
    const today = new Date().toISOString().split('T')[0];
    if (dDay <= today) {
      alert('디데이는 오늘 이후의 날짜여야 합니다.');
      return;
    }

    const csrfToken = getCookieValue('csrftoken');
    if (!user) return;

    try {
      const response = await axios.post(
        `https://api.oz-02-main-04.xyz/api/v1/posts/goal`,
        { goal, d_day: dDay },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': csrfToken,
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      alert(`목표가 설정되었습니다.`);
      setRes(response.data);
      router.push('/todolist');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          try {
            const retryResponse = await axios.post(
              `https://api.oz-02-main-04.xyz/api/v1/posts/goal`,
              { goal, d_day: dDay },
              {
                withCredentials: true,
                headers: {
                  'X-CSRFToken': csrfToken,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              },
            );
            alert(`2차시도 완료되었습니다! ${retryResponse.data}`);
            setRes(retryResponse.data);
          } catch (retryError) {
            console.error('Retry request', retryError);
          }
        } else {
          console.error('refresh access token');
        }
      } else {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (year && month && day) {
      const dDay = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      const timeDiff = dDay.getTime() - today.getTime();
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysLeft(diffDays);
    } else {
      setDaysLeft(null);
    }
  }, [year, month, day]);

  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  return (
    <div className="h-full w-full flex flex-col justify-center items-center min-h-screen p-4 pt-40">
      <section className="wrap-section w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-purple-600 mb-4">목표/디데이를 입력해 주세요.</h1>
        <div className="w-full">
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            목표
          </label>
          <input
            id="goal"
            type="text"
            value={goal || ''}
            onChange={e => setGoal(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="목표 입력"
          />
        </div>
        <div className="w-full mt-4">
          <label htmlFor="dDay" className="block text-sm font-medium text-gray-700">
            남은기간: {daysLeft !== null ? `${daysLeft}일 남음` : '날짜를 입력하시면 디데이가 계산됩니다.'}
          </label>
          <div className="flex space-x-2">
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
              <option value="">년</option>
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
              <option value="">월</option>
              {months.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={day}
              onChange={e => setDay(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
              <option value="">일</option>
              {days.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex justify-between mt-6">
          <Link href={'/profile'}>
            <button className="w-full  px-4 py-2 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              취소
            </button>
          </Link>
          <button
            onClick={handleSetGoal}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            완료
          </button>
        </div>
      </section>
      <NavBottom />
    </div>
  );
}

export default Goal;
