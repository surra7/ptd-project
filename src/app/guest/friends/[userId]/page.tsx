'use client';
import { selectedUserAtom } from '@/atoms/atoms';
import MainPetButton from '@/components/main/MainPetButton';
import { axios } from '@/services/instance';
import { SelectedAccessoryType, SelectedBackgroundType, ApiResponse } from '@/types/guestBookType';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';

export default function FriendMain() {
  const selectedUser = useAtomValue(selectedUserAtom);
  const [selectedBackground, setSelectedBackground] = useState<SelectedBackgroundType[]>([]);
  // const [selectedImageURL, setSelectedImageURL] = useState<SelectedBackgroundType[]>([]);
  // const [selectedAccessoryURL, setSelectedAccessoryURL] = useState<SelectedAccessoryType[]>([]);

  useEffect(() => {
    axios
      .get<ApiResponse>('pets/closet/backgrounds/?selected=true')
      .then(response => {
        setSelectedBackground(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("guest image error: ", error);
      })
    }, [])

  // useEffect(() => {
  //   axios
  //     .get<SelectedAccessoryType[]>('pets/closet/accessories/?selected=true')
  //     .then(response => {
  //       setSelectedAccessoryURL(response.data.image);
  //     })
  //     .catch(error => {
  //       console.error("guest image error: ", error);
  //     })
  //   }, [])

  return (
    <div className="w-full h-full bg-cover"
      style={{ backgroundImage: `url(https://api.oz-02-main-04.xyz${selectedImageURL})` }}>
      <header className="h-1/6 pt-8 pb-2"></header>

      <main className="w-full h-5/6 flex flex-col justify-end">
        <section className="h-1/3 grid justify-end p-4 text-center"></section>
        <section className="h-1/3 flex items-center">
          <Image src={`https://api.oz-02-main-04.xyz${selectedAccessoryURL}`} alt="egg" width={130} height={130} className="my-0 mx-auto" />
        </section>

        <section className="h-1/3 p-3 text-center flex justify-center items-center">
          <div className="flex justify-center">
            <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" />
            <MainPetButton
              icon={<RiContactsBook2Line size="30" />}
              label="방명록"
              link={`/guest/friends/${selectedUser?.id}/guestbook`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
