import Image from 'next/image';
import React from 'react';
import intro3 from '../../../public/images/intro3.png';
import char from '../../../public/images/intro3-char.png';
import Link from 'next/link';

interface Props {
  accessToken: string | null;
}

function Carousel3({ accessToken }: Props) {
  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-2">
        <p className="text-3xl text-primary-600 font-semibold">친구와 응원을 주고받아요</p>
        <p className="text-black-900 font-medium">
          친구의 <span className="text-primary-400">방명록</span>에 글을 작성할 수 있어요.
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-3">
        <Image className="w-[16.875rem] h-[31rem] shadow-lg border rounded-md" src={intro3} alt="" priority />
        <Image className="absolute w-[16.875rem] translate-x-10 translate-y-[2rem]" src={char} alt="" priority />
        <div className="flex flex-col gap-5 items-center">
          <p className="text-[0.9rem] text-black-300">놓친 부분은 마이페이지에서 다시 볼 수 있어요.</p>
          <Link
            href={`${accessToken ? '/' : 'login'}`}
            className="w-[12rem] h-[3rem] font-bold rounded-3xl text-white bg-primary-400 text-center flex justify-center items-center">
            PeTodo 시작하기
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Carousel3;
