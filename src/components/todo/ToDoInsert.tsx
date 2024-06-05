import { useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
  onInsert: (value: string) => void;
  value: string;
  setValue: (text: string) => void;
}

function ToDoInsert({ onInsert, value, setValue }: Props) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  };
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
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
