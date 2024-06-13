import ModalWrapper from '../ModalWrapper';

interface DeleteAlertProps {
  onClose: () => void;
  bgColor?: string;
}

export default function DeleteAlert({ onClose }: DeleteAlertProps) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <div
          className="w-[20.0625rem] h-[9.25rem] bg-white rounded-[10px] flex flex-col justify-center z-40"
          onClick={e => e.stopPropagation()}>
          <div className="text-lg font-bold text-center">삭제 하시겠습니까?</div>
          <div className="w-full h-[2.625rem] flex justify-center gap-[0.625rem] mt-8">
            <button className="w-[8.9375rem] h-full bg-black-200 rounded-[1.25rem] text-white" onClick={onClose}>
              취소
            </button>
            <button className="w-[8.9375rem] h-full bg-primary-400 rounded-[1.25rem] text-white">확인</button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
