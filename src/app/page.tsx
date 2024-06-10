'use client';
import NavBottom from '@/components/NavBottom';
import Image from 'next/image';
import React from 'react';
import { BiCloset } from 'react-icons/bi';
import { BsBox2Heart } from 'react-icons/bs';
import { BiBowlRice } from 'react-icons/bi';
import { LuIceCream } from 'react-icons/lu';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';
import MainPetButton from '@/components/main/MainPetButton';
import PetStateMessage from '@/components/main/PetStateMessage';

function Main() {
  return (
    <div className="w-full h-full">
      <div className="wrap-section bg-[url(/background/spring.jpg)] bg-cover">
        <header className="h-1/6 pt-8 pb-2 bg-white">
          <div className="w-5/6 pt-4 pb-2 mx-auto flex">
            <p className="w-1/2 text-lg font-medium text-primary-600 text-start">수상한 알</p>
            <div className="w-1/2 flex justify-end items-end">
              <p className="px-1">1 Lv</p>
              <p className="text-sm text-black-300">(30/50)</p>
            </div>
          </div>
          <div>
            <div className="w-5/6 h-4 rounded-3xl bg-black-100 mx-auto">
              <div className=" w-1/2 h-4 rounded-3xl absolute bg-primary-500"></div>
            </div>
          </div>
        </header>

        <main className="w-full h-5/6 ">
          <section className="h-1/3 grid justify-end p-4 text-center">
            <MainPetButton icon={<BiCloset size="30" />} label="보관함" />
            <div className="">
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" />
              <div className=" text-sm font-bold">1개 남음</div>
            </div>
          </section>

          <section className="h-1/3 flex items-center">
            <Image src="/pet/egg.png" alt="egg" width={130} height={130} className="my-0 mx-auto" />
          </section>

          <section className="h-1/3 p-3 text-center">
            <PetStateMessage petId={1} />
            <div className="flex justify-center ">
              <div>
                <MainPetButton icon={<BiBowlRice size="30" />} label="밥주기" />
                <div className=" text-sm font-bold">1개 남음</div>
              </div>
              <div>
                <MainPetButton icon={<LuIceCream size="30" />} label="간식주기" />
                <div className="text-sm font-bold">1개 남음</div>
              </div>
              <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" />
              <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" />
            </div>
          </section>
        </main>
      </div>
      <NavBottom />
    </div>
  );
}

export default Main;
