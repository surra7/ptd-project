import React, { Dispatch, useState } from 'react';

interface Props {
  setMusicTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setMusicUrl: React.Dispatch<React.SetStateAction<string>>;
  postId: number | undefined;
}

function MusicInput({ setMusicTitle, setMusicUrl, postId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => alert('지난 할 일 목록에서 노래를 등록 / 삭제 할 수 없습니다.')}>
        음악 검색을 하시려면 여기를 클릭해주세요!
      </button>
    </>
  );
}

export default MusicInput;
