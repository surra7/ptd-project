'use client';
import GuestListItem from '@/components/GuestListItem';
import { useRouter } from 'next/navigation';
import { FaUserFriends } from 'react-icons/fa';

export default function Guest() {
  const router = useRouter();
  let guestBookList = [
    {
      name: '방명록1',
      date: '2021-08-01',
      content: '안녕하세요',
    },
    {
      name: '방명록2',
      date: '2021-08-02',
      content:
        '안녕하세요~ 방명록 내용 뭘 써야될까 으아ㅏ아아ㅏㅏ아ㅏㅏ아ㅏㅏㅇ 어디까지 적을 수 있는 거예요...? 더 길게 적어야되는데 뭘 적어야될까 루루루루루ㅜ루루룰룰',
    },
    {
      name: '방명록3',
      date: '2021-08-03',
      content: '안녕하세요',
    },
    {
      name: '방명록4',
      date: '2021-08-04',
      content: '안녕하세요',
    },
    {
      name: '방명록5',
      date: '2021-08-05',
      content: '안녕하세요 띄어쓰기 되나..?    안되네 엔터도 안먹히네',
    },
    {
      name: '방명록6',
      date: '2021-08-05',
      content: '안녕하세요 띄어쓰기 되나..?    안되네 엔터도 안먹히네',
    },
    {
      name: '방명록7',
      date: '2021-08-05',
      content: '안녕하세요 띄어쓰기 되나..?    안되네 엔터도 안먹히네',
    },
    {
      name: '방명록8',
      date: '2021-08-05',
      content: '안녕하세요 엔터 들어갈 수 있게 해야되나..?',
    },
  ];
  return (
    <main className="w-full h-full relative">
      <div className="w-full h-full bg-saturdayBlue absolute">배경</div>
      <div className="w-full h-[calc(100%-2.6875rem)] absolute z-10 pt-11 px-[1.4375rem]">
        <button
          className="h-[3.3125rem] bg-white bg-opacity-70 rounded-[0.625rem] font-semibold flex items-center ml-auto px-[0.625rem]"
          onClick={() => router.push('/guest/friends')}>
          친구 방명록 놀러가기
          <span className="ml-2">
            <FaUserFriends size={32} />
          </span>
        </button>
        <div className="w-[21.5rem] h-[34.6875rem] rounded-[5px] bg-white border border-black-200 mt-[1.375rem] overflow-auto scroll-bar">
          <ul className="py-2">
            {guestBookList.map((item, index) => {
              return (
                <li key={index} className="border-b-[0.5px] border-black-200">
                  <GuestListItem item={item} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full h-[2.6875rem] border-y border-black-200 bg-white absolute bottom-0">공통 컴포넌트</div>
    </main>
  );
}
