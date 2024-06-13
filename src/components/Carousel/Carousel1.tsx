import Image from 'next/image';
import React from 'react';
import intro1 from '../../../public/images/intro1.png';

function Carousel1() {
  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col items-center gap-2">
        <p className="text-3xl w-[341px] text-primary-600 font-semibold">깔끔한 UI로 일정관리를 편리하게</p>
        <p className="text-black-900 font-medium">
          실시간으로 <span className="text-primary-400">활동 시간</span>을{' '}
          <span className="text-primary-400">측정</span>할 수 있어요.
        </p>
      </section>
      <section className="flex justify-center">
        <Image className="w-[16.875rem] h-[31rem] shadow-lg border rounded-md" src={intro1} priority alt="" />
      </section>
    </main>
  );
}

export default Carousel1;
