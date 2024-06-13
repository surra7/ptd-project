'use client';
import GuestListItem from '@/components/guest/GuestListItem';
import useGetTodayDate from '@/hooks/useGetTodayDate';
import useMoveScrollBottom from '@/hooks/useMoveScrollBottom';
import { guestBookListType } from '@/types/guestBookType';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';

export default function Guest() {
  const [userInput, setUserInput] = useState('');
  const [guestBook, setGuestBook] = useState<guestBookListType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useMoveScrollBottom(guestBook);
  const router = useRouter();
  let guestBookSampleList = [
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

  useEffect(() => {
    setGuestBook(guestBookSampleList);
  }, []);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      setUserInput('');
      e.preventDefault();
      setGuestBook([...guestBook, { name: '닉네임', date: useGetTodayDate(), content: userInput }]);
      console.log(guestBook);
    },
    [userInput, guestBook],
  );

  return (
    <main className="w-full h-full relative">
      <div className="w-full h-full bg-saturdayBlue absolute">배경</div>
      <div className="w-full h-[calc(100%-2.6875rem)] absolute z-10 pt-11 px-[1.4375rem] flex flex-col">
        <div
          className={`w-[21.5rem] h-[39.625rem] rounded-[5px] bg-white border border-black-200 relative flex flex-col`}>
          <div className="w-[21.5rem] h-[3.6rem] border-b-[0.5px] border-black-200 text-lg font-semibold flex justify-center items-center">
            까피까피츄님의 방명록
          </div>
          <div ref={scrollRef} className="w-full h-full overflow-auto scroll-bar">
            <ul className="py-2">
              {guestBook.map((item, index) => {
                return (
                  <li key={index} className="border-b-[0.5px] border-black-200">
                    <GuestListItem item={item} modalHandler={modalHandler} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-[2.6875rem] bg-white absolute bottom-0">
        <form className="w-full h-full flex" onSubmit={onSubmit}>
          <input
            type="text"
            className="border-black-200 border w-full h-full pl-2 focus:outline-none"
            placeholder="방명록 작성"
            onChange={handleChangeInput}
            value={userInput}
          />
          <button
            disabled={userInput.length === 0}
            className={`w-[2.8125rem] h-full flex items-center justify-center ${userInput.length !== 0 ? 'bg-primary-400' : 'bg-black-200'} active:bg-primary-200`}>
            <AiOutlinePlus className="text-[2rem] text-white" />
          </button>
        </form>
      </div>
    </main>
  );
}
