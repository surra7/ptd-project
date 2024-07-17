import { axios } from '@/services/instance';
import { SetStateAction } from 'jotai';
import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper';

interface Props {
  setIsModalOpen(boolean: boolean): void;
  setMusicTitle(v: string): void;
  setMusicUrl: React.Dispatch<React.SetStateAction<string>>;
  postId: number | undefined;
}

function SearchModal({ setIsModalOpen, setMusicTitle, setMusicUrl, postId }: Props) {
  const [value, setValue] = useState('');
  const [musicList, setMusicList] = useState<any[]>([]);

  const getValue = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string> } }) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const music = await axios.get(`posts/music/${postId}?query=${value}`);
      setMusicList(music.data);
      console.log(musicList);
    } catch {
      console.log('에러');
    }
  };

  const onMusic = async (v: SetStateAction<any>, s: SetStateAction<any>, u: SetStateAction<any>) => {
    setMusicTitle(`${s} - ${v}`);
    setMusicUrl(u);
    await axios.post(`posts/music/${postId}`, { title: v, singer: s, song_url: u });
  };

  return (
    <ModalWrapper onClose={() => setIsModalOpen(false)}>
      <div className="w-full h-full flex justify-center items-center bg-black-950 bg-opacity-50 z-10">
        <div className="w-[12.5rem] h-[25rem] bg-white z-30">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={value}
              onChange={getValue}
              className="py-2 pl-1 flex items-center border-b-[0.0313rem] border-borderGray"
              placeholder="음악을 입력해주세요."></input>
          </form>
          <div className="w-full h-[20rem] bg-white overflow-auto">
            <ul>
              {musicList &&
                musicList.map((item, index) => (
                  <li onClick={() => onMusic(item.title, item.singer, item.song_url)} key={index}>
                    {item.singer} - {item.title}
                  </li>
                ))}
            </ul>
          </div>
          <div onClick={() => setIsModalOpen(false)} className="w-full border-t-[0.0313rem] border-borderGray">
            <div className="p-1 cursor-pointer">닫기</div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default SearchModal;
