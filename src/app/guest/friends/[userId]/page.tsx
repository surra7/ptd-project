'use client';
import MainPetButton from '@/components/main/MainPetButton';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BiDonateHeart } from 'react-icons/bi';
import { RiContactsBook2Line } from 'react-icons/ri';

export default function NickNamePage() {
  const pathname = usePathname();
  return (
    <div className="w-full h-full bg-[url(/background/spring.jpg)] bg-cover">
      <header className="h-1/6 pt-8 pb-2"></header>

      <main className="w-full h-5/6 flex flex-col justify-end">
        <section className="h-1/3 grid justify-end p-4 text-center"></section>
        <section className="h-1/3 flex items-center">
          <Image src="/pet/egg.png" alt="egg" width={130} height={130} className="my-0 mx-auto" />
        </section>

        <section className="h-1/3 p-3 text-center flex justify-center items-center">
          <div className="flex justify-center">
            <MainPetButton icon={<BiDonateHeart size="30" />} label="쓰다듬기" />
            <MainPetButton icon={<RiContactsBook2Line size="30" />} label="방명록" />
          </div>
        </section>
      </main>
    </div>
  );
}
