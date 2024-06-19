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
import { PetType } from '@/types/petType';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCookieValue } from '@/libs/getCookieValue';
import { useAtom } from 'jotai';
import { User, userAtom, accessTokenAtom, csrfTokenAtom } from '@/atoms/atoms';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [acivePetImageURL, setActivePetImageURL] = useState('');
  const [riceCount, setRiceCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [experience, setExperience] = useState(0);
  const router = useRouter();
  const [user, setUser] = useAtom<User | null>(userAtom);
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const csrfToken = getCookieValue('csrftoken');
        const token = getCookieValue('access_token');
        if (token) {
          setAccessToken(token);
        }
        if (csrfToken) {
          setCsrf(csrfToken);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokens();
  }, [setAccessToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken || !csrf) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo/', {
          withXSRFToken: true,
          headers: {
            'x-csrftoken': csrf!,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
        axios
          .get<PetType>('https://api.oz-02-main-04.xyz/api/v1/pets/mypet/', {
            withXSRFToken: true,
            headers: {
              'x-csrftoken': csrf!,
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            setPetData(response.data);
            setBackgroundImageURL(response.data.primary_background.image);
            setActivePetImageURL(response.data.active_pet.image);
            setBoxCount(response.data.random_boxes);
            setRiceCount(response.data.rice_quantity);
            setSnackCount(response.data.snack_quantity);
            console.log(petData);
          })
          .catch(error => {
            console.log('펫타입에러', error);
          });
      } catch (error) {
        console.error('유저에러', error);
        alert('로그인이 필요합니다.');
        router.push('/introduce');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [accessToken, csrf]);

  //밥주기
  const handleFeedRice = () => {
    if (petData && petData?.rice_quantity > 0) {
      axios
        .post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-rice/')
        .then(response => {
          setRiceCount(riceCount - 1);
          console.log(response.data);
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
        .post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-snack/')
        .then(response => {
          setSnackCount(snackCount - 1);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('간식이 없습니다!');
    }
  };

  return (
    <div className="w-full h-full">
      {petData ? (
        <div className="wrap-section bg-cover" style={{ backgroundImage: `url:(${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            <PetProfile
              name={petData.active_pet.pet_name}
              level={petData.pet_rating.level}
              progress={petData.point}
              maxProgress={petData.pet_rating.point}
            />
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end items-center py-5 px-2 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" count={-1} link="/closet" />
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" link="/randombox" count={boxCount} />
            </section>

            <section className="h-1/3 flex items-center">
              <Image src={acivePetImageURL} alt="pet" width={130} height={130} className="my-0 mx-auto" />
            </section>

            <section className="h-1/3 p-3 text-center">
              <PetStateMessage petId={1} />
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
                <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" count={-1} />
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" count={-1} />
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="wrap-section">로딩중..</div>
      )}
      <NavBottom />
    </div>
  );
}

export default Main;
