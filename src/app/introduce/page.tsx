'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Carousel from './Carousel';
import { useAtom } from 'jotai';
import { accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import { getCookieValue } from '@/libs/getCookieValue';

function page() {
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);

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
  }, [setAccessToken, setCsrf]);

  return (
    <main className="w-mobile h-mobile overflow-hidden">
      <div className="w-mobile h-mobile pt-10 flex flex-col gap-10">
        <div className="flex justify-end relative">
          <Link
            href={`${accessToken ? 'login' : '/'}`}
            className="text-right pr-5 text-black-300 hover:text-primary-400">
            SKIP
          </Link>
        </div>
        <Carousel />
      </div>
    </main>
  );
}

export default page;
