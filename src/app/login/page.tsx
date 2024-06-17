'use client';
import Image from 'next/image';
import { userAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const KakaoLogin = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button onClick={handleKakaoLogin}>
        <Image src={'/images/kakaoLogin.png'} alt="kakao-login" width={200} height={200} />
      </button>
    </div>
  );
};

export default KakaoLogin;
