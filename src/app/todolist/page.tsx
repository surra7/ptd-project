'use client';
import Modal from '@/components/todo/Modal';
import Timer from '@/components/todo/Timer';
import ToDoInsert from '@/components/todo/ToDoInsert';
import ToDoListItem from '@/components/todo/todolistitem';
import React, { useCallback, useRef, useState } from 'react';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import { TbMoodEmpty, TbMoodSad, TbMoodSmile } from 'react-icons/tb';

export type TodoType = {
  id: number;
  text: string;
  checked: boolean;
};

function Page() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [modalIndex, setModalIndex] = useState<number>();

  const nextId = useRef(0);
  const onInsert = useCallback(
    (text: string) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      if (!text) return alert('TODO를 적어주세요!');
      setTodos(todos.concat(todo));
      nextId.current++;
      console.log(todo.id);
    },
    [todos],
  );

  const openModal = useCallback((index: number) => {
    setIsModalOpen(true);
    console.log(index);
    if (modalIndex != undefined) {
      setModalIndex(undefined);
    } else {
      setModalIndex(index);
    }
  }, []);

  const onRemove = useCallback(
    (id?: number) => {
      if (id != undefined) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
      setIsModalOpen(false);
    },
    [todos],
  );

  return (
    <div className="flex justify-center bg-black">
      <div className="w-[23.4375rem] h-[50.75rem] bg-white">
        <main className="w-full h-auto top-[3.4375rem] relative ">
          <header className="flex flex-col items-center">
            <div className="flex w-full h-[3.1875rem] px-5 justify-between items-center border-b-[0.0313rem] border-borderGray">
              <p className="font-bold text-textGray text-[1.125rem]">이번 달 프로젝트 잘 끝내기</p>
              <div className="w-[3.75rem] h-[2.375rem] text-veryPurple font-extrabold text-[1.625rem] text-center flex justify-center items-center">
                D-32
              </div>
            </div>
            <section className="w-full h-[2.5625rem] flex border-b-[0.0313rem] border-borderGray items-center">
              <div className="flex w-[8.8125rem] h-[2.5625rem] border-r-[0.0313rem] border-borderGray relative items-center justify-center text-[0.8125rem] font-medium text-textGray">
                2024. 05. 28
              </div>
              <div className="w-[15.5rem] h-[2.5625rem] px-[0.625rem] flex justify-between items-center">
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodSmile className="w-[1.5625rem] h-[1.5625rem] text-veryPurple" />
                  <p className="text-[0.75rem] font-medium text-veryPurple">HAPPY</p>
                </div>
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodEmpty className="w-[1.5625rem] h-[1.5625rem] text-borderGray" />
                  <p className="text-[0.75rem] font-medium text-borderGray">SOSO</p>
                </div>
                <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
                  <TbMoodSad className="w-[1.5625rem] h-[1.5625rem] text-borderGray" />
                  <p className="text-[0.75rem] font-medium text-borderGray">SAD</p>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center justify-around w-[23.4375rem] h-[2.5625rem] border-b-[0.0313rem] border-borderGray px-[0.625rem] gap-[0.3125rem]">
                <Timer />
              </div>
            </section>
            <section className="flex w-full h-[2.5625rem] items-center px-[0.625rem] gap-[0.625rem] border-b-[0.0313rem] border-borderGray">
              <div>
                <IoMusicalNotesOutline className="w-[1.25rem] h-[1.25rem]" />
              </div>
              <div className="text-[0.75rem] font-medium text-textGray">심규선 - care</div>
            </section>
          </header>
          <section className="flex flex-col w-full h-[20rem] overflow-auto">
            <div className="border-r-[0.0313rem] border-borderGray w-[2.75rem] h-[20rem] absolute" />
            <ToDoListItem todos={todos} openModal={openModal} />
          </section>
          <ToDoInsert onInsert={onInsert} value={value} setValue={setValue} />
          {isModalOpen ? <Modal onRemove={onRemove} id={modalIndex as number} /> : <></>}
          <section>
            <p className="m-2 pb-1 border-b-borderGray border-b w-[3.0625rem] text-center">Memo</p>
            <textarea name="memo" id="memo" className="w-full h-[5rem] text-[0.875rem] px-2 resize-none"></textarea>
          </section>
          <footer className="w-full h-[5.25rem]">하단 글로벌 네비게이터 들어갈 자리 입니다</footer>
        </main>
      </div>
    </div>
  );
}

export default Page;
