'use client';
import { selectedUserAtom } from '@/atoms/atoms';
import MainPetButton from '@/components/main/MainPetButton';
import { axios } from '@/services/instance';
import { SelectedUserItemType } from '@/types/guestBookType';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';

export default function FriendMain() {
  const selectedUser = useAtomValue(selectedUserAtom);
  const [selectedUserItem, setSelectedUserItem] = useState<SelectedUserItemType>();
  const [selectedPet, isSelectedPet] = useState('');
  const [selectedBackground, isSelectedBackground] = useState('');
  const [selectedAccessory, isSelectedAccessory] = useState('');

  useEffect(() => {
    axios.get<SelectedUserItemType>(`pets/${selectedUser?.id}`)
      .then(response => {
        setSelectedUserItem(response.data);
        isSelectedPet(response.data.primary_pet.image);
        isSelectedBackground(response.data.primary_background.image);
        isSelectedAccessory(response.data.primary_accessory);
      })
      .catch(error => {
        console.log('guestbackground error: ',error);
      })
  })

  return (
    <div className="w-full h-full bg-cover"
      style={{ backgroundImage: `url(https://api.oz-02-main-04.xyz${selectedBackground})` }}>
      <header className="h-1/6 pt-8 pb-2"></header>

      <main className="w-full h-5/6 flex flex-col justify-end">
        <section className="w-full h-1/3 grid justify-end p-4 text-center"></section>
        <section className="w-full h-1/3 flex flex-col items-center">
        <div className="flex w-full h-2/5 pb-2 justify-center items-center">
          {selectedAccessory && (
            <Image src={`https://api.oz-02-main-04.xyz${selectedAccessory}`} alt="accessory" width={40} height={40} className="object-contain items-end" />
          )}          
        </div>
        <div className="flex w-full h-3/5 justify-center items-top">
          <Image src={`https://api.oz-02-main-04.xyz${selectedPet}`} alt="egg" width={130} height={130} className="object-contain items-top" />
        </div>
        </section>

        <section className="h-1/3 p-3 text-center flex justify-center items-center">
          <div className="flex justify-center">
            <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" count={-1} />
            <MainPetButton
              icon={<RiContactsBook2Line size="30" />}
              label="방명록"
              link={`/guest/friends/${selectedUser?.id}/guestbook`}
              count={-1}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
