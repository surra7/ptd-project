import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const TodoInput = () => {
  const [value, setValue] = useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };

  return (
    <form className="w-full h-[2.625rem] flex">
      <input
        type="text"
        className="border-black-200 border w-full h-[2.625rem] pl-2 focus:outline-none"
        placeholder="TODO는 이곳에 적어주세요!"
        onChange={onChange}
        value={value}
      />
      <button
        className={`flex items-center justify-center w-[2.625rem] h-[2.625rem] ${value ? 'bg-primary-400' : 'bg-black-200'} active:bg-primary-200`}>
        <AiOutlinePlus className="text-[2rem] text-white" />
      </button>
    </form>
  );
};
export default TodoInput;
