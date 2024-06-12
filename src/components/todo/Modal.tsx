import { Dispatch } from 'react';

interface Props {
  onRemove(id?: number): void;
  onEdit(id?: number): void;
  id?: number;
  setIsModalOpen(boolean: boolean): void;
}
function Modal({ onRemove, onEdit, id, setIsModalOpen }: Props) {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black-950 bg-opacity-50 z-10"
        onClick={() => setIsModalOpen(false)}
      />
      <div className="w-full flex flex-col justify-center h-[8.5rem] pl-3 gap-7 bg-[#F2F2F2] absolute bottom-0 rounded-t-[0.625rem] z-20">
        <button className="flex font-semibold text-[1.125rem] w-full" onClick={() => onEdit(id)}>
          수정
        </button>
        <button className="flex font-semibold text-[1.125rem] w-full text-errorRed" onClick={() => onRemove(id)}>
          삭제
        </button>
      </div>
    </>
  );
}

export default Modal;
