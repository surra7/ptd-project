import Image from 'next/image';
import React from 'react';
import intro2 from '../../../public/images/intro2.png';
import eggPic from '../../../public/images/intro2-egg.png';
import light from '../../../public/images/intro2-light.png';
import giftBox from '../../../public/images/intro2-giftbox.png';
import glitter from '../../../public/images/intro2-glitter.png';
import Link from 'next/link';

interface Props {
  accessToken: string | null;
}

function Carousel2({ accessToken }: Props) {
  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-2">
        <p className="text-3xl text-primary-600 font-semibold">펫과 함께 성장하세요!</p>
        <p className="text-black-900 font-medium">
          5일 연속 80% 이상 달성 시 <span className="text-primary-400">선물 박스 </span>증정
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-3">
        <div className="flex justify-center">
          <Image className="w-[16.875rem] h-[31rem] shadow-lg border rounded-md" src={intro2} alt="" priority />
          <Image
            className="absolute w-[10rem] -translate-x-[7.5rem] translate-y-[6rem] -rotate-[30deg]"
            src={eggPic}
            alt=""
            priority
          />
          <Image
            className="absolute w-[10rem] -translate-x-[8rem] translate-y-[4rem] -rotate-[30deg]"
            src={light}
            alt=""
            priority
          />
          <Image
            className="absolute w-[10rem] translate-x-[7rem] translate-y-[20rem] rotate-[20deg]"
            src={giftBox}
            alt=""
            priority
          />
          <Image className="absolute w-[10rem] translate-x-[7rem] translate-y-[16rem]" src={glitter} alt="" priority />
        </div>
      </section>
      <div className="flex flex-col gap-5 items-center">
        <Link
          href={`${accessToken ? '/' : 'login'}`}
          className="w-[12rem] h-[3rem] font-bold rounded-3xl text-white bg-primary-400 text-center flex justify-center items-center">
          PeTodo 시작하기
        </Link>
      </div>
    </main>
  );
}

export default Carousel2;
