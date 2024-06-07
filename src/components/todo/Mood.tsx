import React, { useState } from 'react';
import { TbMoodEmpty, TbMoodSad, TbMoodSmile } from 'react-icons/tb';

function Mood() {
  const [selectMood, setSelectMood] = useState<string>('');

  const handleSelect = (selectMood: string) => {
    setSelectMood(selectMood);
  };

  return (
    <>
      <div className="flex w-[4.25rem] h-[1.5625rem] gap-[0.1875rem] items-center">
        <label className="flex items-center gap-[0.1875rem]">
          <input type="radio" name="mood" value="happy" className="hidden" onClick={() => handleSelect('happy')} />
          <TbMoodSmile
            className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 'happy' ? 'text-primary-600' : 'text-black-200'}`}
          />
          <p className={`text-[0.75rem] font-medium ${selectMood === 'happy' ? 'text-primary-600' : 'text-black-200'}`}>
            HAPPY
          </p>
        </label>
      </div>
      <label className="flex items-center gap-[0.1875rem]">
        <input type="radio" name="mood" value="soso" className="hidden" onClick={() => handleSelect('soso')} />
        <TbMoodEmpty
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 'soso' ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 'soso' ? 'text-primary-600' : 'text-black-200'}`}>
          SO SO
        </p>
      </label>
      <label className="flex items-center gap-[0.1875rem]">
        <input type="radio" name="mood" value="sad" className="hidden" onClick={() => handleSelect('sad')} />
        <TbMoodSad
          className={`w-[1.5625rem] h-[1.5625rem] ${selectMood === 'sad' ? 'text-primary-600' : 'text-black-200'}`}
        />
        <p className={`text-[0.75rem] font-medium ${selectMood === 'sad' ? 'text-primary-600' : 'text-black-200'}`}>
          SAD
        </p>
      </label>
    </>
  );
}

export default Mood;
