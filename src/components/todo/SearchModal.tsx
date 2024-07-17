import { axios } from '@/services/instance';
import { SetStateAction } from 'jotai';
import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper';
import { MdSearch } from 'react-icons/md';

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
        <div className="w-[15.625rem] h-[26.25rem] bg-white z-30" onClick={e => e.stopPropagation()}>
          <form onSubmit={onSubmit} className="flex">
            <input
              type="text"
              value={value}
              onChange={getValue}
              className="w-full py-2 pl-1 flex items-center border-b-[0.0313rem] border-borderGray"
              placeholder="음악을 입력해주세요."
            />
            <button className="justify-items-end">
              <MdSearch size={32} color="black" />
            </button>
          </form>
          <div className="w-full h-[21.875rem] bg-white overflow-auto">
            <ul>
              {musicList &&
                musicList.map((item, index) => (
                  <li
                    onClick={() => onMusic(item.title, item.singer, item.song_url)}
                    key={index}
                    className="p-1 text-mm border-b-[0.0313rem] border-borderGray">
                    {item.singer} - {item.title}
                  </li>
                ))}
            </ul>
          </div>
          <div
            onClick={() => setIsModalOpen(false)}
            className="w-full border-t-[0.0313rem] border-borderGray flex justify-end">
            <div className="w-fit h-fit p-1 text-sm cursor-pointer">닫기</div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default SearchModal;
