'use client';
import Image from 'next/image';

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://api.petodo.today/api/v1/users/kakao/`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="bg-purple-600 flex flex-col items-center justify-center min-h-full p-4">
      <div className="mb-40">
        <Image src={'/images/logoWhite.png'} alt="logo" width={100} height={100} />
      </div>
      <button onClick={handleKakaoLogin}>
        {' '}
        <Image src={'/images/kakao_login_large_narrow_1_1.svg'} alt="kakao-login" width={200} height={200} />
      </button>
    </div>
  );
};

export default KakaoLogin;
