import Image from 'next/image';
import React from 'react';
import intro1 from '../../../public/images/intro1.png';
import Link from 'next/link';

interface Props {
  accessToken: string | null;
}

function Carousel1({ accessToken }: Props) {
  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-2">
        <p className="text-3xl w-[341px] text-primary-600 font-semibold">깔끔한 UI로 일정관리를 편리하게</p>
        <p className="text-black-900 font-medium">
          실시간으로 <span className="text-primary-400">활동 시간</span>을{' '}
          <span className="text-primary-400">측정</span>할 수 있어요.
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-3">
        <Image className="w-[16.875rem] h-[31rem] shadow-lg border rounded-md" src={intro1} priority alt="" />
        <div className="flex flex-col gap-5 items-center">
          <p className="text-[0.9rem] text-black-300">놓친 부분은 마이페이지에서 다시 볼 수 있어요.</p>
          <Link
            href={'/login'}
            className="w-[12rem] h-[3rem] font-bold rounded-3xl text-white bg-primary-400 text-center flex justify-center items-center">
            PeTodo 시작하기
          </Link>
        </div>
      </section>
      <div className="flex flex-col gap-5 items-center">
        <Link
          href={`${accessToken ? 'login' : '/'}`}
          className="w-[12rem] h-[3rem] font-bold rounded-3xl text-white bg-primary-400 text-center flex justify-center items-center">
          PeTodo 시작하기
        </Link>
      </div>
    </main>
  );
}

export default Carousel1;
