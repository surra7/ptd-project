import { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  init?: string;
  onInsert(value?: string): void;
}

function ToDoInsert({init, onInsert}: Props) {
  const [value, setValue] = useState<string>(init ?? "");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      setValue('');
      e.preventDefault();
      onInsert(value);
    },
    [value, onInsert],
  );

  useEffect(() => {
    setValue(init ?? "");
  }, [init]);

  return (
    <form className="w-full h-[2.625rem] flex" onSubmit={onSubmit}>
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
}

export default ToDoInsert;
