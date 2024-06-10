'use client';
import NickNameList from '@/components/guest/NickNameList';
import { useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';

export default function Friends() {
  const [userInput, setUserInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log(userInput);
    },
    [userInput],
  );

  return (
    <main className="w-full h-full pt-[4.375rem]">
      <div className="w-full h-[3.75rem] flex justify-center items-center text-xl font-semibold">친구 찾기</div>
      <div className="w-full h-[2.6875rem] flex items-center mt-[1.125rem]">
        <form className="w-full h-full flex" onSubmit={onSubmit}>
          <div className="w-[calc(100%-2.8125rem)] h-full border-y border-black-200 flex items-center">
            {/* 닉네임 최대 글자 수 제한 넣기 */}
            <input
              type="text"
              placeholder="닉네임 입력"
              onChange={handleChangeInput}
              className="w-full mx-[0.625rem] outline-none"
            />
          </div>
          <button
            disabled={userInput.length === 0}
            className={`w-[2.8125rem] h-full ${userInput.length !== 0 ? 'bg-primary-400' : 'bg-black-200'} flex justify-center items-center`}>
            <MdSearch size={32} color="white" />
          </button>
        </form>
      </div>
      <section>
        <NickNameList />
      </section>
    </main>
  );
}
