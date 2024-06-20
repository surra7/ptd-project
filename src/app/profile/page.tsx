'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom, accessTokenAtom, csrfTokenAtom, nicknameAtom } from '@/atoms/atoms';
import Image from 'next/image';
import NavBottom from '@/components/NavBottom';
import Link from 'next/link';
import { getCookieValue } from '@/libs/getCookieValue';
import { deleteCookie } from '@/libs/deleteCookieValue';
import { useRouter } from 'next/navigation';
export interface User {
  id: number;
  계정: string;
  닉네임: string;
}

export default function Page() {
  const [user, setUser] = useAtom<User | null>(userAtom);
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const router = useRouter();
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const csrfToken = getCookieValue('csrftoken');
        const token = getCookieValue('access_token');
        if (token) {
          setAccessToken(token);
        }
        if (csrfToken) {
          setCsrf(csrfToken);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokens();
  }, [setAccessToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken || !csrf) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo/', {
          withXSRFToken: true,
          withCredentials: true,
          headers: {
            'x-csrftoken': csrf!,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [accessToken, csrf, setUser]);

  const handleLogout = async () => {
    try {
      deleteCookie('access_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('refresh_token', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'oz-02-main-04.xyz');
      deleteCookie('csrftoken', '/', 'api.oz-02-main-04.xyz');
      deleteCookie('user_state', '/', 'oz-02-main-04.xyz');
      setUser(null);
      setAccessToken(null);
      setCsrf(null);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      {' '}
      {user ? (
        <>
          {/* <div className=" flex flex-col p-4 mt-10"> */}
          <section className="wrap-section p-4 mt-10 pb-20">
            {' '}
            <p className="text-2xl font-bold text-purple-600 mb-4">안녕하세요! {user.닉네임} 님</p>
            <hr className="border-purple-600 w-full mb-4" />
            <ul className="space-y-4">
              <li>
                <Link href="/nickname">
                  <p className="text-purple-600 hover:underline">닉네임 변경하기</p>
                </Link>
              </li>
              <li>
                <Link href="/goal">
                  <p className="text-purple-600 hover:underline">목표 설정하기</p>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/introduce">
                  <p className="text-purple-600 hover:underline">petodo 가이드 보기</p>
                </Link>{' '}
              </li>
              <li>
                <a onClick={handleLogout} className="text-purple-600 hover:underline">
                  로그아웃
                </a>
              </li>
            </ul>
            <hr className="border-purple-600 w-full my-4" />
          </section>
          <NavBottom /> {/* </div> */}
        </>
      ) : (
        <>
          {/* <div className=" flex flex-col justify-center align-middle  p-4"> */}
          <section
            className="wrap-section
            ">
            <p className="text-2xl font-bold text-purple-600 mb-4">로그인 해주세요.</p>
            {/* <button
                onClick={handleKakaoLogin}
                className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                카카오 로그인
              </button> */}
            <button onClick={handleKakaoLogin}>
              {' '}
              {/* {nickname} */}
              <Image src={'/images/kakaoLogin.png'} alt="kakao-login" width={200} height={200} />
            </button>
          </section>
          <NavBottom />
          {/* </div> */}
        </>
      )}
    </div>
  );
}
