'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { userAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
import NavBottom from '@/components/NavBottom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id?: number;
  계정?: string;
  닉네임: string;
}

const getCookieValue = (name: any) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(';').shift();
};

const Nickname = () => {
  const [newNickname, setNewNickname] = useState('');
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useAtom(userAtom);
  const [msg, setMsg] = useState('공백없이 10자 이내로 작성해주세요.');
  const router = useRouter();

  useEffect(() => {
    const csrfToken = getCookieValue('csrftoken');
    const token = getCookieValue('access_token');
    if (token) {
      setAccessToken(token);
    }
    if (csrfToken) {
      setCsrfToken(csrfToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken || !csrfToken) return;
      try {
        const response = await axios.get('https://api.petodo.today/api/v1/users/myinfo/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
          },
          withXSRFToken: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [accessToken, csrfToken, setUserInfo]);

  const handleNicknameChange = async () => {
    if (!newNickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post(
        'https://api.petodo.today/api/v1/users/myinfo/',
        {
          action: 'change_nickname',
          nickname: newNickname,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'x-csrftoken': csrfToken,
          },
          withXSRFToken: true,
        },
      );
      if (response.status === 200) {
        alert('닉네임이 변경되었습니다.');
        setUserInfo(prevUser => (prevUser ? { ...prevUser, 닉네임: newNickname } : null));
      }
      router.push('/profile');
    } catch (error) {
      console.error(error);
      setMsg('다른 닉네임을 입력해 주세요!');
    }
  };

  return (
    <div className="h-full p-4 pt-40 flex flex-col items-center justify-center">
      {userInfo ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <section className="wrap-section w-full max-w-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-purple-600 mb-4">닉네임을 입력해 주세요</h1>
              <div className="mb-4">
                <p id="msg">{msg}</p>
              </div>
            </div>
            <input
              type="text"
              value={newNickname}
              onChange={e => setNewNickname(e.target.value)}
              placeholder="새 닉네임 입력"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
            <div className="flex justify-between mt-4 w-full">
              <Link href="/profile">
                <button className="w-full ml-2 mr-2 px-4 py-2  text-black rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  취소
                </button>
              </Link>
              <button
                onClick={handleNicknameChange}
                className="w-1/2 ml-2 px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                완료
              </button>
            </div>
          </section>
          <NavBottom />
        </div>
      ) : (
        <p className="text-lg text-purple-600">로딩 중...</p>
      )}
    </div>
  );
};

export default Nickname;
