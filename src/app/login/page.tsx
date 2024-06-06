'use client';
import Image from 'next/image';
import React from 'react';

const Login = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.oz-02-main-04.xyz/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div onClick={handleKakaoLogin} className="cursor-pointer">
        <Image src="/images/kakaoLogin.png" alt="kakao-login" width={200} height={100} />
      </div>
    </div>
  );
};

export default Login;
