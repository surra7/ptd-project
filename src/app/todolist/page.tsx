'use client';
import NavBottom from '@/components/NavBottom';
import Modal from '@/components/todo/Modal';
import Mood from '@/components/todo/Mood';
import MusicInput from '@/components/todo/MusicInput';
import Timer from '@/components/todo/Timer';
import ToDoInsert from '@/components/todo/ToDoInsert';
import ToDoListItem from '@/components/todo/ToDoListItem';
import axios from 'axios';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { IoMusicalNotesOutline } from 'react-icons/io5';

export interface TodoType {
  todo_item: string;
  id: number | undefined;
  done: boolean;
}

function Page() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>();
  const [editString, setEditString] = useState<string>();
  const [musicTitle, setMusicTitle] = useState<string | undefined>();
  const [musicUrl, setMusicUrl] = useState<string>('');

  const id = useRef(1);
  const onInsert = useCallback(
    async (text?: string) => {
      if (text) {
        if (editString !== undefined && modalIndex !== undefined) {
          const edit = todos.find(v => v.id === modalIndex);
          if (edit !== undefined) {
            edit.todo_item = text;
            setTodos([...todos]);
          }
          await axios.put(`https://api.oz-02-main-04.xyz/api/v1/posts/todo/1/${modalIndex}`, {
            todo_item: text,
          });
          setEditString(undefined);
          setModalIndex(undefined);
        } else {
          const todo = {
            todo_item: text,
            id: id.current,
            done: false,
          };
          await axios.post('https://api.oz-02-main-04.xyz/api/v1/posts/todo/1', todo);
          const res = await axios.get('https://api.oz-02-main-04.xyz/api/v1/posts/todo/1');
          setTodos(res.data);
          ++id.current;
        }
      } else {
        alert('TODO를 적어주세요!');
      }
    },
    [todos, editString, modalIndex],
  );

  const openModal = useCallback(
    (index: number) => {
      setModalIndex(index);
      setEditString(undefined);
      if (index === modalIndex) {
        setIsModalOpen(prev => !prev);
      } else {
        setIsModalOpen(true);
      }
    },
    [modalIndex],
  );

  const onRemove = useCallback(
    async (id?: number) => {
      if (id != undefined) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
      await axios.delete(`https://api.oz-02-main-04.xyz/api/v1/posts/todo/1/${id}`);
      setIsModalOpen(false);
      setModalIndex(undefined);
    },
    [todos],
  );

  const onEdit = useCallback(
    (id?: number) => {
      if (id != undefined) {
        const edit = todos.find(v => v.id === id);
        setEditString(edit?.todo_item);
        setIsModalOpen(false);
      }
    },
    [todos],
  );

  const handleComplete = useCallback(
    async (id: number) => {
      const checked = todos.find(v => v.id === id);
      if (checked !== undefined) {
        checked.done = !checked.done;
        await axios.put(`https://api.oz-02-main-04.xyz/api/v1/posts/todo/1/${id}`, {
          done: checked.done,
        });
        setTodos([...todos]);
      }
    },
    [todos],
  );

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/posts/todo/1');
        // const user = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/');
        // console.log(user);
        setTodos(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTodo();
  }, []);

  // useEffect(() => {
  //   const fetchMusic = async () => {
  //     try {
  //       const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/posts/music/1');
  //       console.log(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchMusic();
  // }, []);

  return (
    <div className="w-full h-full">
      <main className="wrap-section relative ">
        <header className="pt-[2rem]">
          <div className="flex w-full h-[3.1875rem] px-5 justify-between items-center border-b-[0.0313rem] border-borderGray">
            <p className="font-bold text-black-900 text-[1.125rem]">이번 달 프로젝트 잘 끝내기</p>
            <div className="w-[3.75rem] h-[2.375rem] text-primary-600 font-extrabold text-[1.625rem] text-center flex justify-center items-center">
              D-32
            </div>
          </div>
          <section className="w-full h-[2.5625rem] flex border-b-[0.0313rem] border-borderGray items-center">
            <div className="flex w-[8.8125rem] h-[2rem] border-r-[0.0313rem] border-borderGray relative items-center justify-center text-[0.8125rem] font-medium text-black-900">
              2024. 05. 28
            </div>
            <div className="w-[15.5rem] h-[2rem] px-[0.625rem] flex justify-between items-center">
              <Mood />
            </div>
          </section>
          <section>
            <div className="flex items-center justify-around w-full h-[2.5625rem] border-b-[0.0313rem] border-borderGray px-[0.625rem] gap-[0.3125rem]">
              <Timer />
            </div>
          </section>
          <section className="flex w-full h-[2.5625rem] items-center px-[0.625rem] gap-[0.625rem] border-b-[0.0313rem] border-borderGray">
            <div>
              <IoMusicalNotesOutline className="w-[1.25rem] h-[1.25rem]" />
            </div>
            <div className="w-full text-[0.75rem] font-medium text-black-900">
              {musicTitle ? (
                <div className="w-full flex items-center justify-between">
                  <span onClick={() => setMusicTitle('')}>{musicTitle}</span>
                  <audio controls loop src={musicUrl} className="w-[11rem] h-[2.5rem]"></audio>
                </div>
              ) : (
                <MusicInput setMusicTitle={setMusicTitle} setMusicUrl={setMusicUrl} />
              )}
            </div>
          </section>
        </header>
        <section className="flex flex-col w-full h-[22rem] overflow-auto">
          <div className="border-r-[0.0313rem] border-borderGray w-[2.75rem] h-[22rem] absolute" />
          {todos.map((todo, key) => (
            <ToDoListItem
              id={todo.id}
              key={key}
              todo={todo}
              openModal={openModal}
              handleComplete={handleComplete}
              isModalOpen={isModalOpen}
              modalIndex={modalIndex}
            />
          ))}
        </section>
        <ToDoInsert onInsert={onInsert} init={editString} />
        {isModalOpen ? (
          <Modal onRemove={onRemove} onEdit={onEdit} id={modalIndex} setIsModalOpen={setIsModalOpen} />
        ) : (
          <></>
        )}
        <section>
          <p className="m-2 pb-1 border-b-borderGray border-b w-[3.0625rem] text-center">Memo</p>
          <textarea
            name="memo"
            id="memo"
            className="w-full h-[6rem] text-[0.875rem] px-2 resize-none focus:outline-none"></textarea>
        </section>
      </main>
      <NavBottom />
    </div>
  );
}

export default Page;
