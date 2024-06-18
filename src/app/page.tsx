'use client';

import NavBottom from '@/components/NavBottom';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiCloset, BiBowlRice, BiDonateHeart } from 'react-icons/bi';
import { BsBox2Heart } from 'react-icons/bs';
import { LuIceCream } from 'react-icons/lu';
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
import { useQuery, useMutation, useQueryClient } from 'react-query';

function Main() {
  const [petData, setPetData] = useState<PetType>();
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [activePetImageURL, setActivePetImageURL] = useState('');
  const [riceCount, setRiceCount] = useState(0);
  const [snackCount, setSnackCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useAtom<User | null>(userAtom);
  const [accessToken, setAccessToken] = useAtom<string | null>(accessTokenAtom);
  const [csrf, setCsrf] = useAtom<string | null>(csrfTokenAtom);

  const queryClient = useQueryClient();

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
  }, [setAccessToken, setCsrf]);

  const { data: userData, isLoading: userLoading } = useQuery(
    'user',
    async () => {
      if (!accessToken || !csrf) {
        setIsLoading(false);
        return;
      }
      const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo/', {
        withXSRFToken: true,
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrf!,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    {
      enabled: !!accessToken && !!csrf,
      onSuccess: data => {
        setUser(data);
        setIsLoading(false);
      },
      onError: error => {
        console.error(error);
        setIsLoading(false);
      },
    },
  );

  const { data: petInfo } = useQuery(
    'pet',
    async () => {
      const response = await axios.get<PetType>('https://api.oz-02-main-04.xyz/api/v1/pets/mypet/');
      return response.data;
    },
    {
      enabled: !!userData,
      onSuccess: data => {
        setPetData(data);
        setBackgroundImageURL(data.primary_background.image);
        setActivePetImageURL(data.active_pet.image);
        setBoxCount(data.random_boxes);
        setRiceCount(data.rice_quantity);
        setSnackCount(data.snack_quantity);
      },
    },
  );

  const feedRiceMutation = useMutation(
    async () => {
      await axios.post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-rice/');
    },
    {
      onSuccess: () => {
        setRiceCount(prev => prev - 1);
        queryClient.invalidateQueries('pet');
      },
    },
  );

  const feedSnackMutation = useMutation(
    async () => {
      await axios.post('https://api.oz-02-main-04.xyz/api/v1/pets/feed-snack/');
    },
    {
      onSuccess: () => {
        setSnackCount(prev => prev - 1);
        queryClient.invalidateQueries('pet');
      },
    },
  );

  const handleFeedRice = () => {
    if (petData && petData.rice_quantity > 0) {
      feedRiceMutation.mutate();
    } else {
      alert('밥이 없습니다!');
    }
  };

  const handleFeedSnack = () => {
    if (petData && petData.snack_quantity > 0) {
      feedSnackMutation.mutate();
    } else {
      alert('간식이 없습니다!');
    }
  };

  return (
    <div className="w-full h-full">
      {isLoading || userLoading ? (
        <div className="wrap-section">로딩중..</div>
      ) : (
        <div className="wrap-section bg-cover" style={{ backgroundImage: `url(${backgroundImageURL})` }}>
          <header className="h-1/6 pt-8 pb-2 bg-white">
            {petData && (
              <PetProfile
                name={petData.active_pet.pet_name}
                level={petData.pet_rating.level}
                progress={petData.point}
                maxProgress={petData.pet_rating.point}
              />
            )}
          </header>

          <main className="w-full h-5/6 ">
            <section className="h-1/3 grid justify-end items-center py-5 px-2 text-center">
              <MainPetButton icon={<BiCloset size="30" />} label="보관함" count={-1} />
              <MainPetButton icon={<BsBox2Heart size="28" />} label="랜덤박스" link="/randombox" count={boxCount} />
            </section>

            <section className="h-1/3 flex items-center">
              {activePetImageURL && (
                <Image src={activePetImageURL} alt="pet" width={130} height={130} className="my-0 mx-auto" />
              )}
            </section>

            <section className="h-1/3 p-3 text-center">
              <PetStateMessage petId={1} />
              <div className="flex justify-center items-end">
                <MainPetButton
                  icon={<BiBowlRice size="30" />}
                  label="밥주기"
                  count={riceCount}
                  handle={handleFeedRice}
                />
                <MainPetButton
                  icon={<LuIceCream size="30" />}
                  label="간식주기"
                  count={snackCount}
                  handle={handleFeedSnack}
                />
                <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" count={-1} />
                <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" link="/guest" count={-1} />
              </div>
            </section>
          </main>
        </div>
      )}
      <NavBottom />
    </div>
  );
}

export default Main;
