import { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  init?: string;
  onInsert(value?: string): void;
}

function ToDoInsert({ init, onInsert }: Props) {
  const [value, setValue] = useState<string>(init ?? '');

  useEffect(() => {
    setValue(init ?? '');
  }, [init]);

  return (
    <form className="w-full h-[2.625rem] flex" onClick={e => e.preventDefault()}>
      <div className="border-black-200 flex items-center text-black-400 bg-black-100 border w-full h-[2.625rem] pl-2 focus:outline-none">
        <p>지난 할 일 목록은 쓸 수 없습니다.</p>
      </div>
      <button
        className={`flex items-center justify-center w-[2.625rem] h-[2.625rem] ${value ? 'bg-primary-400' : 'bg-black-200'} active:bg-primary-200`}>
        <AiOutlinePlus className="text-[2rem] text-white" />
      </button>
    </form>
  );
}

export default ToDoInsert;
