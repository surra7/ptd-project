'use client';
import NavBottom from '@/components/NavBottom';
import Calender from '@/containers/Calender';

const Monthly = () => {
  return (
    <main className="w-full h-full">
      <section className="container flex flex-col justify-center items-center">
        <div className="text-2xl font-bold">Monthly</div>
        <Calender />
        <div className="h-[4.0625rem]">
          <div className="font-medium">
            <span className="text-[#8133EA]">3일</span> 연속 목표 달성!
          </div>
          <div className="text-xs text-[#D1D1D1] font-medium">5일 달성 시 랜덤박스 증정</div>
        </div>
      </section>
      <NavBottom />
    </main>
  );
};

export default Monthly;
