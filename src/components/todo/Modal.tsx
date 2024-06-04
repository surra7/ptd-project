interface Props {
  onRemove(id: number): void;
  id: number;
}
function Modal({ onRemove, id }: Props) {
  return (
    <div className="w-full flex items-center h-[8.5rem] bg-borderGray absolute bottom-[5.5rem] rounded-t-[0.625rem]">
      <div className="w-full flex flex-col items-start gap-7 pl-3">
        {/* <button className="flex font-semibold text-[1.125rem] w-full">수정</button> */}
        <button className="flex font-semibold text-[1.125rem] w-full text-red-400" onClick={() => onRemove(id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default Modal;
