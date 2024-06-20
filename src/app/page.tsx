'use client';
import NavBottom from '@/components/NavBottom';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiCloset } from 'react-icons/bi';
import { BsBox2Heart } from 'react-icons/bs';
import { BiBowlRice } from 'react-icons/bi';
import { LuIceCream } from 'react-icons/lu';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';
import MainPetButton from '@/components/main/MainPetButton';
import PetStateMessage from '@/components/main/PetStateMessage';
import PetProfile from '@/components/main/PetProfile';
import { FeedType, PetType } from '@/types/petType';

import { useRouter } from 'next/navigation';
import { getCookieValue } from '@/libs/getCookieValue';
import { useAtom } from 'jotai';
import { User, userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';
import { axios } from '@/services/instance';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [activePetImageURL, setActivePetImageURL] = useState('');
  const [riceCount, setRiceCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [level, setLevel] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [experience, setExperience] = useState(0);
  const [petName, setPetName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [tempSaveMessage, setTempSaveMessage] = useState('');
  const [isTouchPet, setIsTouchPet] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [prevPetLevel, setPrevPetLevel] = useState(level);
  const [accessoryImageURL, setAccessoryImageURL] = useState('');
  const router = useRouter();

  const [user, setUser] = useAtom<User | null>(userAtom);
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);

  useEffect(() => {
    console.log(user);
    const fetchTokens = async () => {
      try {
        const csrfToken = getCookieValue('csrftoken');
        const token = getCookieValue('access_token');
        if (token) {
          setAccessToken(token);
          console.log('accesstoken 값: ', accessToken);
        }
        if (csrfToken) {
          setCsrf(csrfToken);
          console.log('csrfToken 값: ', csrfToken);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokens();
  }, [setAccessToken]);

  useEffect(() => {
    axios
      .get('users/myinfo/')
      .then(response => {
        setUser(response.data);
        console.log(response.data);
        axios
          .get<PetType>('pets/mypet/')
          .then(response => {
            setPetData(response.data);
            setBackgroundImageURL(response.data.primary_background.image);
            setActivePetImageURL(response.data.active_pet.image);
            setBoxCount(response.data.random_boxes);
            setRiceCount(response.data.rice_quantity);
            setSnackCount(response.data.snack_quantity);
            setLevel(response.data.pet_rating.level);
            setExperience(response.data.point);
            setMaxProgress(response.data.pet_rating.point);
            setPetName(response.data.active_pet.pet_name);
            setStatusMessage(response.data.hunger_degree_status);
            setAccessoryImageURL(response.data.primary_accessory.image);
            console.log(petData);
            console.log('처음', statusMessage, tempSaveMessage);
          })
          .catch(error => {
            console.error('펫에러', error);
            // router.push('/introduce');
          });
      })
      .catch(error => {
        console.error('유저에러', error.data);
        // router.push('/introduce');
      });
  }, [accessToken, csrf]);

  // 알 깨질떄
  useEffect(() => {
    setPrevPetLevel(level);
    if (prevPetLevel == 1 && level == 2) {
      // setIsLevelUp(true);
      // setTempSaveMessage(statusMessage);
      // setStatusMessage('알이 깨지고 있습니다!');
      // setTimeout(() => {
      //   setStatusMessage(tempSaveMessage);
      // }, 3000);
      alert('펫이 부화합니다!');
    } else if (prevPetLevel == 2 && level == 1) {
      alert('축하합니다! 펫이 모두 성장하였습니다. 새로운 알이 지급됩니다.');
    }
  }, [level]);

  //밥주기
  const handleFeedRice = () => {
    if (petData && petData?.rice_quantity > 0) {
      axios
        .post<FeedType>('pets/feed-rice/')
        .then(response => {
          setStatusMessage(response.data.pet.hunger_degree_status);
          setRiceCount(riceCount - 1);
          setLevel(response.data.pet.pet_rating.level);
          setExperience(response.data.pet.point);
          setMaxProgress(response.data.pet.pet_rating.point);
          setActivePetImageURL(response.data.pet.active_pet.image);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('밥이 없습니다!');
    }
  };

  //간식주기
  const handleFeedSnack = () => {
    if (petData && petData.snack_quantity > 0) {
      axios
        .post<FeedType>('pets/feed-snack/')
        .then(response => {
          setTempSaveMessage(response.data.pet.hunger_degree_status);
          setSnackCount(snackCount - 1);
          setLevel(response.data.pet.pet_rating.level);
          setExperience(response.data.pet.point);
          setMaxProgress(response.data.pet.pet_rating.point);
          setActivePetImageURL(response.data.pet.active_pet.image);
          const feedSnackTime = setTimeout(() => {
            setTempSaveMessage('');
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('간식이 없습니다!');
    }
  };

  // 쓰다듬기
  const handleTouchPet = () => {
    setTempSaveMessage('당신은 복슬복슬한 느낌에 기분이 좋아집니다!');
    setIsTouchPet(true);
    const touchTime = setTimeout(() => {
      setTempSaveMessage('');
      setIsTouchPet(false);
    }, 2000);
  };

  return (
    <div className="w-full h-full ">
      {petData ? (
        <div
          className="wrap-section bg-cover animate-fadeIn"
          style={{ backgroundImage: `url(https://api.oz-02-main-04.xyz${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            <PetProfile name={petName} level={level} progress={experience} maxProgress={maxProgress} />
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end items-center py-5 px-2 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" count={-1} link="/closet" />
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" link="/randombox" count={boxCount} />
            </section>

            <section className="w-full h-1/3 flex flex-col items-center">
              <div className="flex w-full h-2/5 p-2 justify-center items-end">
              {isTouchPet ? (
                  <Image
                    src={'/pet/hand.png'}
                    alt="heart"
                    width={50}
                    height={50}
                    className="animate-shackHand"
                  />
              ) : 
                (accessoryImageURL) && (
                  <Image
                    src={`https://api.oz-02-main-04.xyz${accessoryImageURL}`}
                    alt="accessory"
                    width={40}
                    height={40}
                    className="h-full object-contain"
                  />
                )
              }
              </div>
              <div className="flex w-full h-3/5 p-1 justify-center items-center">
                {/* {isLevelUp ? (
                  <Image src={'/pet/crackEgg.png'} alt="pet" width={80} height={80} className="h-full object-contain" />
                ) : ( */}
                  <Image
                    src={`https://api.oz-02-main-04.xyz${activePetImageURL}`}
                    alt="pet"
                    width={80}
                    height={80}
                    className="h-full object-contain"
                  />
                {/* )} */}
              </div>
            </section>

            <section className="h-1/3 p-3 text-center">
            {tempSaveMessage ? (
              <PetStateMessage message={tempSaveMessage} messageClass='animate-fadeInOut'/>
            ) : (
              <PetStateMessage message={statusMessage} messageClass='animate-fadeIn'/>
            )}
              
              <div className="flex justify-center items-end">
                <MainPetButton
                  icon={<BiBowlRice size="30" />}
                  label="밥주기"
                  count={riceCount}
                  handle={() => handleFeedRice()}
                />
                <MainPetButton
                  icon={<LuIceCream size="30" />}
                  label="간식주기"
                  count={snackCount}
                  handle={() => handleFeedSnack()}
                />
                <MainPetButton
                  icon={<BiDonateHeart size="30" />}
                  label="쓰다듬기"
                  count={-1}
                  handle={() => handleTouchPet()}
                />
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" count={-1} />
              </div>
            </section>
          </main>
        </div>
       ) : (
        <div className="wrap-section text-center flex">
          <div className="m-auto text-primary-500">Loding...</div>
        </div>
      )} 
      <NavBottom />
    </div>
  );
}

export default Main;
