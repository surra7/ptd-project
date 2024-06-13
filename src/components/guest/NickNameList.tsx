import { nickNameListType } from '@/types/guestBookType';
import { useRouter } from 'next/navigation';

export default function NickNameList({ nicknameList }: { nicknameList: nickNameListType[] }) {
  const router = useRouter();

  if (nicknameList === undefined) return;

  return (
    <ul className="w-full h-[31.25rem] border-b border-black-200 overflow-auto scroll-bar">
      {nicknameList.map((nickname: nickNameListType, index: number) => {
        return (
          <li
            onClick={() => router.push(`/guest/friends/${nickname.id}`)}
            key={index}
            className="h-[3.6875rem] border-b-[0.5px] border-black-200 text-lg flex items-center pl-[0.8125rem] cursor-pointer active:bg-primary-200 active:text-white">
            {nickname.nickname}
          </li>
        );
      })}
    </ul>
  );
}
