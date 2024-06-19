'use client';
import NavBottom from '@/components/NavBottom';
import ClosetSection from '@/components/closet/\bClosetSection';
import { useState } from 'react';
import { BiBookBookmark } from 'react-icons/bi';
import { TbJewishStar, TbWallpaper } from 'react-icons/tb';
export default function Closet() {
  const [selectedMenu, setSelectedMenu] = useState<string>('액세서리');

  return (
    <main className="w-full h-full">
      <section className="wrap-section flex flex-col justify-center items-center">
        <div className="w-[21.5rem] h-[3.3125rem] text-lg font-semibold mx-auto flex justify-center items-center border-b-[0.5px] border-black-200 border-opacity-70 mt-9">
          옷장
        </div>
        <div className="w-full flex space-x-[0.9375rem] px-[1.8125rem] py-[0.8125rem]">
          <button
            onClick={() => setSelectedMenu('액세서리')}
            className={`w-[3.4375rem] h-[3.4375rem] ${selectedMenu === '액세서리' ? 'bg-primary-400' : 'bg-black-200'} rounded-[10px] text-white text-sm flex flex-col justify-center items-center`}>
            <TbJewishStar size={30} />
            <div>액세서리</div>
          </button>
          <button
            onClick={() => setSelectedMenu('배경화면')}
            className={`w-[3.4375rem] h-[3.4375rem] ${selectedMenu === '배경화면' ? 'bg-primary-400' : 'bg-black-200'} rounded-[10px] text-white text-sm flex flex-col justify-center items-center`}>
            <TbWallpaper size={30} />
            <div>배경화면</div>
          </button>
          <button
            onClick={() => setSelectedMenu('펫 도감')}
            className={`w-[3.4375rem] h-[3.4375rem] ${selectedMenu === '펫 도감' ? 'bg-primary-400' : 'bg-black-200'} rounded-[10px] text-white text-sm flex flex-col justify-center items-center`}>
            <BiBookBookmark size={30} />
            <div>펫 도감</div>
          </button>
        </div>
        <div className="w-full h-full">
          {selectedMenu === '액세서리' ? (
            <ClosetSection selectedMenu={selectedMenu} />
          ) : selectedMenu === '배경화면' ? (
            <ClosetSection selectedMenu={selectedMenu} />
          ) : (
            <ClosetSection selectedMenu={selectedMenu} />
          )}
        </div>
      </section>
      <NavBottom />
    </main>
  );
}
