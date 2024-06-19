'use client';
import NavBottom from '@/components/NavBottom';
import { axios } from '@/services/instance';
import { RandomItem } from '@/types/petType';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function RandomBox() {
  const router = useRouter();
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [randomImage, setRandomImage] = useState('/randombox/box.png');
  const [randomName, setRandomName] = useState('');
  const [randomItem, setRandomItem] = useState<RandomItem>();

  const handleboxClick = () => {
    axios
    .post<RandomItem>('pets/open-random-box/')
    .then(response => {
      setIsBoxClicked(true);
      setRandomItem(response.data);
      setRandomName(response.data.output_item.name);
      setRandomImage(response.data.output_item.image);
      console.log('randomitem 결과', response.data);
    }) .catch(error => {
      alert('보유한 랜덤박스가 없습니다.');
      console.log(error);
    })
  };

  const handleRetryClick = () => {
    setIsBoxClicked(false);
  };

  return (
    <div className="w-full h-full">
      <div className="relative wrap-section bg-cover bg-[url(/randombox/star.jpg)]">
        <div className="h-full flex">
          <div className="m-auto">
            {isBoxClicked ? (
              <div>
                <Image src={`https://api.oz-02-main-04.xyz${randomImage}`} alt="randomImage" width={300} height={300} className="pb-8 animate-boxopen" />
                <div
                  className="text-center text-white text-4xl font-bold p-1
                  bg-primary-500">
                  {randomName}
                </div>
                <div className="flex justify-center">
                  <button className="p-4" onClick={handleRetryClick}>
                    다시뽑기
                  </button>
                  <button className="p-4" onClick={() => router.push('/')}>
                    돌아가기
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={handleboxClick}>
                  <Image
                    src="/randombox/box.png"
                    alt="box"
                    width={300}
                    height={300}
                    className="pb-8 animate-vibration"
                  />
                </button>
                <div
                  className="text-center text-white text-4xl font-bold p-1
                  drop-shadow-[0_4px_4px_rgba(129,51,234,100)]">
                  박스를 클릭하세요!
                </div>
                <button className="w-full p-4 my-0 mx-auto" onClick={() => router.push('/')}>
                  돌아가기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <NavBottom />
    </div>
  );
}

export default RandomBox;
