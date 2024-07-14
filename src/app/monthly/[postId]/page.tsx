'use client';
import NavBottom from '@/components/NavBottom';
import Modal from '@/components/todo/Modal';
import Mood from '@/components/todo/Mood';
import MusicInput from '@/components/todo/MusicInput';
import Timer from '@/components/todo/Timer';
import ToDoInsert from '@/components/todo/ToDoInsert';
import ToDoListItem from '@/components/todo/ToDoListItem';
import { useTodos, useDeleteTodo, useCreateTodo, TodoItem } from '@/hooks/useTodo';
import { axios } from '@/services/instance';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMusicalNotesOutline } from 'react-icons/io5';
import ToDoInsert2 from './ToDoInsert2';
import MusicInput2 from './MusicInput2';
import Mood2 from './Mood2';

export interface TodoType {
  id: number;
  created_at: string;
  updated_at: string;
  todo_item: string;
  done: boolean;
  post: number;
}

function Page({ params }: { params: { postId: number } }) {
  // const [todos, setTodos] = useState<TodoType[]>([]);
  const [memo, setMemo] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>();
  const [editString, setEditString] = useState<string>();
  const [musicTitle, setMusicTitle] = useState<string | undefined>();
  const [musicUrl, setMusicUrl] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [deadline, setDeadline] = useState<number>();
  const [postId, setPostId] = useState<number>(params.postId);
  const { data: todos = [], refetch } = useTodos(params.postId);
  const [selectMood, setSelectMood] = useState<number>();
  const [time, setTime] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const formattedDate = '';

  const onInsert = useCallback(
    async (text?: string) => {
      if (text) {
        if (editString !== undefined && modalIndex !== undefined) {
          const edit = todos.find(v => v.id === modalIndex);
          if (edit !== undefined) {
            // edit.todo_item = text;
            // setTodos([...todos]);
          }
          // await axios.put(`posts/todo/3/${modalIndex}`, {
          //   todo_item: text,
          // });
          alert('지난 할 일 목록은 입력/수정 할 수 없습니다.');
          setEditString(undefined);
          setModalIndex(undefined);
        } else {
          alert('지난 할 일 목록은 입력/수정 할 수 없습니다.');
        }
      } else {
        alert('지난 할 일 목록은 입력/수정 할 수 없습니다.');
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
      // if (id != undefined) {
      //   setTodos(todos.filter(todo => todo.id !== id));
      // }
      // await axios.delete(`https://api.petodo.today/api/v1/posts/todo/1/${id}`);
      // deleteTodo(id!);
      alert('지난 할 일 목록은 삭제 할 수 없습니다.');
      setIsModalOpen(false);
      setModalIndex(undefined);
    },
    [todos],
  );

  const onEdit = useCallback(
    (id?: number) => {
      if (id != undefined) {
        const edit = todos.find(v => v.id === id);
        alert('지난 할 일 목록은 수정 할 수 없습니다.');

        setIsModalOpen(false);
      }
    },
    [todos],
  );

  const handleComplete = useCallback(
    async (id: number) => {
      const checked = todos.find(v => v.id === id);
      if (checked !== undefined) {
        alert('지난 할 일 목록은 수정 할 수 없습니다.');
      }
    },
    [todos],
  );

  useEffect(() => {
    const getGoal = async () => {
      const res = await axios.get('/posts/');
      const data = res.data.find((item: any, i: number) => {
        if (item.id == params.postId) return i + 1;
      });
      setDate(data.todo_date);
      setGoal(data.goal);
      setDeadline(data.days_by_deadline);
      setSelectMood(data.feeling_status);
      setMemo(data.memo);
    };
    getGoal();
  }, []);

  useEffect(() => {
    const getMusic = async () => {
      try {
        const res = await axios.get(`posts/music/playing/${params.postId}`);
        console.log(params.postId);
        console.log(res.data);
        if (res) {
          setMusicTitle(res.data.title);
          setMusicUrl(res.data.song_url);
        }
      } catch (e) {
        return;
      }

      const getTime = async () => {
        try {
          const res = await axios.get(`posts/timer/${params.postId}`);
          setTime(res.data.formatted_duration);
        } catch {
          return;
        }
      };
      getTime();
      getMusic();
    };
  }, []);

  const deleteMusic = async () => {
    alert('지난 할 일 목록의 음악은 삭제 할 수 없습니다.');
  };

  return (
    <div className="w-full h-full">
      <main className="wrap-section relative ">
        <header className="pt-[2rem]">
          <div className="flex w-full h-[3.1875rem] px-5 justify-between items-center border-b-[0.0313rem] border-borderGray">
            <p className="font-bold text-black-900 text-[1.125rem]">{goal}</p>
            <div className="w-[3.75rem] h-[2.375rem] text-primary-600 font-extrabold text-[1.625rem] text-center flex justify-center items-center">
              D-{deadline}
            </div>
          </div>
          <section className="w-full h-[2.5625rem] flex border-b-[0.0313rem] border-borderGray items-center">
            <div className="flex w-[8.8125rem] h-[2rem] border-r-[0.0313rem] border-borderGray relative items-center justify-center text-[0.8125rem] font-medium text-black-900">
              {date}
            </div>
            <div className="w-[15.5rem] h-[2rem] px-[0.625rem] flex justify-between items-center">
              <Mood2 formattedDate={formattedDate} selectMood={selectMood} />
            </div>
          </section>
          <section>
            <div className="flex items-center justify-center w-full h-[2.5625rem] border-b-[0.0313rem] border-borderGray px-[0.625rem] gap-[0.3125rem]">
              총 활동시간 : <span className="text-primary-400">{time}</span>
            </div>
          </section>
          <section className="flex w-full h-[2.5625rem] items-center px-[0.625rem] gap-[0.625rem] border-b-[0.0313rem] border-borderGray">
            <div>
              <IoMusicalNotesOutline className="w-[1.25rem] h-[1.25rem]" />
            </div>
            <div className="w-full text-[0.75rem] font-medium text-black-900">
              {musicTitle ? (
                <div className="w-full flex items-center justify-between">
                  <span onClick={deleteMusic}>{musicTitle}</span>
                  <audio controls loop src={musicUrl} className="w-[11rem] h-[2.5rem]"></audio>
                </div>
              ) : (
                <MusicInput2 setMusicTitle={setMusicTitle} setMusicUrl={setMusicUrl} postId={0} />
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
        <ToDoInsert2 onInsert={onInsert} init={editString} />
        {isModalOpen ? (
          <Modal onRemove={onRemove} onEdit={onEdit} id={modalIndex} setIsModalOpen={setIsModalOpen} />
        ) : (
          <></>
        )}
        <section>
          <p className="m-2 pb-1 border-b-borderGray border-b w-[3.0625rem] text-center">Memo</p>
          <div className="w-full h-[6rem] text-[0.875rem] px-2 resize-none focus:outline-none">{memo}</div>
        </section>
      </main>
      <NavBottom />
    </div>
  );
}

export default Page;
