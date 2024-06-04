import { useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  onInsert: (value: string) => void;
  value: string;
  setValue: (text: string) => void;
}

function ToDoInsert({ onInsert, value, setValue }: Props) {
  const onChange = e => {
    setValue(e.target.value);
    console.log(value);
  };
  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');
      e.preventDefault();
      console.log(value);
    },
    [onInsert, value],
  );

  return (
    <form className="w-full h-[2.625rem] flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="border-borderGray border w-[20.8125rem] h-[2.625rem] pl-2 focus:outline-none"
        placeholder="TODO는 이곳에 적어주세요!"
        onChange={onChange}
        value={value}
      />
      <button
        className={`flex items-center justify-center w-[2.625rem] h-[2.625rem] ${value ? 'bg-veryPurple' : 'bg-borderGray'} active:bg-lightPurple`}>
        <AiOutlinePlus className="text-[2rem] text-white" />
      </button>
    </form>
  );
}

export default ToDoInsert;
