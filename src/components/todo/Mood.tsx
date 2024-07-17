import { axios } from '@/services/instance';
import React, { useEffect, useState } from 'react';
import { TbMoodEmpty, TbMoodSad, TbMoodSmile } from 'react-icons/tb';

interface Props {
  formattedDate: string;
}

function Mood({ formattedDate }: Props) {
  const [selectMood, setSelectMood] = useState<number>();

  const handleSelect = async (selectMood: number) => {
    setSelectMood(selectMood);
    await axios.put('posts/', { feeling_status: selectMood, todo_date: formattedDate });
  };

  useEffect(() => {
    const getMood = async () => {
      const res = await axios.get('posts/');
      const data = res.data.find((item: any, i: number) => {
        if (item.todo_date === formattedDate) return i + 1;
      });
      setSelectMood(data.feeling_status);
    };
    getMood();
  }, [formattedDate]);

  return (
    <>
      <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
        <label className="flex items-center gap-[0.1875rem] cursor-pointer">
          <input type="radio" name="mood" value={0} className="hidden" onClick={() => handleSelect(0)} />
          <TbMoodSmile
            className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 0 ? 'text-primary-600' : 'text-black-200'}`}
          />
          <p className={`text-[0.75rem] font-medium ${selectMood === 0 ? 'text-primary-600' : 'text-black-200'}`}>
            HAPPY
          </p>
        </label>
      </div>
      <label className="flex items-center gap-[0.1875rem] cursor-pointer">
        <input type="radio" name="mood" value={1} className="hidden" onClick={() => handleSelect(1)} />
        <TbMoodEmpty
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 1 ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 1 ? 'text-primary-600' : 'text-black-200'}`}>
          SO SO
        </p>
      </label>
      <label className="flex items-center gap-[0.1875rem] cursor-pointer">
        <input type="radio" name="mood" value={2} className="hidden" onClick={() => handleSelect(2)} />
        <TbMoodSad
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 2 ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 2 ? 'text-primary-600' : 'text-black-200'}`}>SAD</p>
      </label>
    </>
  );
}

export default Mood;
