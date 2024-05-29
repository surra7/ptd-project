import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsMusicNoteList, BsSkipStartCircle, BsStopCircle, BsThreeDots } from 'react-icons/bs';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import { LuTimer } from 'react-icons/lu';
import { TbMoodEmpty, TbMoodHappy, TbMoodSad, TbMoodSmile } from 'react-icons/tb';

const page = () => {
  return (
    <div className="flex justify-center bg-black">
      <div className="w-[23.4375rem] h-[50.75rem] bg-white">
        <main className="w-full h-auto top-[3.4375rem] relative ">
          <header className="flex flex-col items-center">
            <div className="flex w-full h-[3.1875rem] px-5 justify-between items-center border-b-[0.0313rem] border-borderGray">
              <p className="font-bold text-[1.125rem]">이번 달 프로젝트 잘 끝내기</p>
              <div className="w-[3.75rem] h-[2.375rem] text-veryPurple font-extrabold text-[1.625rem] text-center flex justify-center items-center">
                D-32
              </div>
            </div>
            <section className="w-full h-[2.5625rem] flex border-b-[0.0313rem] border-borderGray items-center">
              <div className="flex w-[8.8125rem] h-[2.5625rem] border-r-[0.0313rem] border-borderGray relative items-center justify-center text-[0.8125rem] font-medium">
                2024. 05. 28
              </div>
              <div className="w-[15.5rem] h-[2.5625rem] px-[0.625rem] flex justify-between items-center">
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodSmile className="w-[1.5625rem] h-[1.5625rem] text-veryPurple" />
                  <p className="text-[0.75rem] font-medium text-veryPurple">HAPPY</p>
                </div>
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodEmpty className="w-[1.5625rem] h-[1.5625rem] text-borderGray" />
                  <p className="text-[0.75rem] font-medium text-borderGray">SOSO</p>
                </div>
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodSad className="w-[1.5625rem] h-[1.5625rem] text-borderGray" />
                  <p className="text-[0.75rem] font-medium text-borderGray">SAD</p>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center justify-around w-[23.4375rem] h-[2.5625rem] border-b-[0.0313rem] border-borderGray px-[0.625rem] gap-[0.3125rem]">
                <div>
                  <LuTimer className="w-[1.3125rem] h-[1.3125rem]" />
                </div>
                <div className="flex items-center w-[19rem] h-[2.5625rem] font-medium text-[0.875rem] text-textGray">
                  00시간 00분 00초
                </div>
                <div>
                  <BsSkipStartCircle className="w-[1.625rem] h-[1.625rem] text-borderGray" />
                </div>
              </div>
            </section>
            <section className="flex w-full h-[2.5625rem] items-center px-[0.625rem] gap-[0.625rem] border-b-[0.0313rem] border-borderGray">
              <div>
                <IoMusicalNotesOutline className="w-[1.25rem] h-[1.25rem]" />
              </div>
              <div className="text-[0.75rem] font-medium text-textGray">심규선 - care</div>
            </section>
          </header>
          <section className="flex w-full h-[20rem] overflow-auto">
            <div className="flex w-[2.8125rem] h-auto border-r-[0.0313rem] border-borderGray">
              <div className="flex flex-col w-[2.8125rem] h-auto items-center">
                <div className="flex items-center p-[0.765rem] h-auto">
                  <input type="checkbox" className="w-[1.25rem] h-[1.25rem]" />
                </div>
                <div className="flex items-center p-[0.765rem] h-auto">
                  <input type="checkbox" className="w-[1.25rem] h-[1.25rem]" />
                </div>
                <div className="flex items-center p-[0.765rem] h-auto">
                  <input type="checkbox" className="w-[1.25rem] h-[1.25rem]" />
                </div>
                <div className="flex items-center p-[0.765rem] h-auto">
                  <input type="checkbox" className="w-[1.25rem] h-[1.25rem]" />
                </div>
              </div>
            </div>
            <div className="flex w-full h-auto">
              <div className="flex flex-col w-full h-auto items-center">
                <div className="flex w-full h-auto p-[0.625rem] items-center justify-between">
                  <p>잠자기</p>
                  <BsThreeDots className="text-borderGray text-[1.25rem]" />
                </div>
                <div className="flex w-full h-auto p-[0.625rem] items-center justify-between">
                  <p>아침밥 먹기</p>
                  <BsThreeDots className="text-borderGray text-[1.25rem]" />
                </div>
                <div className="flex w-full h-auto p-[0.625rem] items-center justify-between">
                  <p>샤워하기</p>
                  <BsThreeDots className="text-borderGray text-[1.25rem]" />
                </div>
                <div className="flex w-full h-auto p-[0.625rem] items-center justify-between">
                  <p>친구랑 놀기</p>
                  <BsThreeDots className="text-borderGray text-[1.25rem]" />
                </div>
              </div>
            </div>
          </section>
          <form className="w-full h-[2.625rem] flex">
            <input
              type="text"
              className="border-borderGray border w-[20.8125rem] h-[2.625rem] pl-2"
              placeholder="TODO는 이곳에 적어주세요!"
            />
            <span className="flex items-center justify-center w-[2.625rem] h-[2.625rem] bg-borderGray active:bg-lightPurple">
              <AiOutlinePlus className="text-[2rem] text-white" />
            </span>
          </form>
          <section>
            <p className="m-2 pb-1 border-b-borderGray border-b w-[3.0625rem] text-center">Memo</p>
            <textarea name="memo" id="memo" className="w-full h-[5rem] text-[0.875rem] px-2 resize-none"></textarea>
          </section>
          <footer className="w-full h-[5.25rem]">하단 글로벌 네비게이터 들어갈 자리 입니다</footer>
        </main>
      </div>
    </div>
  );
};

export default page;
