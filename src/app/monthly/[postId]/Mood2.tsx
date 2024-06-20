import axios from 'axios';
import React, { useState } from 'react';
import { TbMoodEmpty, TbMoodSad, TbMoodSmile } from 'react-icons/tb';

interface Props {
  formattedDate: string;
}

function Mood({ formattedDate }: Props) {
  const [selectMood, setSelectMood] = useState<number>();

  const handleSelect = () => {
    alert('지난 할 일에서 변경 할 수 없습니다');
  };

  // const getMood = async () => {
  //   const res = await axios.get('posts/');
  //   const data = res.data.find((item: any, i: number) => {
  //     if (item.todo_date === formattedDate) return i;
  //   });
  //   if (data.feeling_status) {
  //     // setSelectMood(data.feeling_status);
  //   }
  //   getMood;
  // };

  return (
    <>
      <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
        <label className="flex items-center gap-[0.1875rem]">
          <input type="radio" name="mood" value={0} className="hidden" onClick={() => handleSelect()} />
          <TbMoodSmile
            className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 0 ? 'text-primary-600' : 'text-black-200'}`}
          />
          <p className={`text-[0.75rem] font-medium ${selectMood === 0 ? 'text-primary-600' : 'text-black-200'}`}>
            HAPPY
          </p>
        </label>
      </div>
      <label className="flex items-center gap-[0.1875rem]">
        <input type="radio" name="mood" value={1} className="hidden" onClick={() => handleSelect()} />
        <TbMoodEmpty
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 1 ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 1 ? 'text-primary-600' : 'text-black-200'}`}>
          SO SO
        </p>
      </label>
      <label className="flex items-center gap-[0.1875rem]">
        <input type="radio" name="mood" value={2} className="hidden" onClick={() => handleSelect()} />
        <TbMoodSad
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 2 ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 2 ? 'text-primary-600' : 'text-black-200'}`}>SAD</p>
      </label>
    </>
  );
}

export default Mood;
