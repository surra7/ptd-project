interface Props {
  onRemove(id?: number): void;
  onEdit(id?: number): void;
  id?: number;
}
function Modal({ onRemove, onEdit, id }: Props) {
  return (
    <div className="w-full flex flex-col justify-center h-[8.5rem] pl-3 gap-7 bg-[#F2F2F2] absolute bottom-[4rem] rounded-t-[0.625rem]">
      <button className="flex font-semibold text-[1.125rem] w-full" onClick={() => onEdit(id)}>수정</button>
      <button className="flex font-semibold text-[1.125rem] w-full text-errorRed" onClick={() => onRemove(id)}>
        삭제
      </button>
    </div>
  );
}

export default Modal;
