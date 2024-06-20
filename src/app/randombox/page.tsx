'use client';
import NavBottom from '@/components/NavBottom';
import { axios } from '@/services/instance';
import { RandomItemType } from '@/types/petType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function RandomBox() {
  const router = useRouter();
  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [randomImage, setRandomImage] = useState('/randombox/box.png');
  const [randomName, setRandomName] = useState('');
  const [randomItem, setRandomItem] = useState<RandomItemType>();

  const handleboxClick = () => {
    axios
    .post<RandomItemType>('pets/open-random-box/')
    .then(response => {
      setRandomItem(response.data);
      setRandomName(response.data.output_item.name);
      setRandomImage(response.data.output_item.image);
      setIsBoxClicked(true);
      console.log('randombox 결과', response.data);
    }) .catch(error => {
      setIsBoxClicked(false);
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
          <div className="h-full m-auto">
            {isBoxClicked ? (
              <div className='h-full flex flex-col animate-boxopen'>
                <div className='h-2/3 flex items-end py-6 '>
                  <Image 
                    src={`https://api.oz-02-main-04.xyz${randomImage}`} 
                    alt="randomImage" 
                    width={250} 
                    height={250} 
                  />
                </div>
                <div className='h-1/3'>
                  <div className="text-center text-white text-4xl font-bold p-1 bg-primary-500">
                    {randomName}
                  </div>
                  <div className="flex justify-center">
                    <button className="p-4" onClick={handleRetryClick}>
                      다시뽑기
                    </button>
                    <button className="p-4" onClick={() => router.push('/')}>
                      홈으로
                    </button>
                  </div>                  
                </div>
              </div>
            ) : (
              <div className='h-full flex flex-col'>
                <div className='h-2/3 flex items-end py-4'>
                  <button onClick={handleboxClick}>
                    <Image
                      src="/randombox/box.png"
                      alt="box"
                      width={250}
                      height={250}
                      className="pb-8 animate-vibration"
                    />
                  </button>                  
                </div>
                <div className='h-1/3'>
                  <div
                    className="text-center text-white text-4xl font-bold p-1 drop-shadow-[0_4px_4px_rgba(129,51,234,100)]">
                    박스를 클릭하세요!
                  </div>
                  <button className="w-full m-auto p-4" onClick={() => router.push('/')}>
                    홈으로
                  </button>                  
                </div>
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
