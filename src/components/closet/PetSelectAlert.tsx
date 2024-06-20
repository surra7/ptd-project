import ModalWrapper from '../ModalWrapper';
import { usePostPet } from '@/services/closet/postPet';
import { PetSelectAlertProps } from '@/types/closetType';

export default function PetSelectAlert({ onClose, selectedItemName }: PetSelectAlertProps) {
  const { mutateAsync: postPet } = usePostPet();

  const handlePostSelectItem = () => {
    postPet({ item_name: selectedItemName.current });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <div
          className="w-[20.0625rem] h-[9.25rem] bg-white rounded-[10px] flex flex-col justify-center z-40"
          onClick={e => e.stopPropagation()}>
          <div className="text-lg font-bold text-center">대표 펫으로 설정 하시겠습니까?</div>
          <div className="text-mm font-medium text-center text-black-200 mt-2">
            친구가 놀러왔을 때 대표 펫이 보여집니다.
          </div>
          <div className="w-full h-[2.625rem] flex justify-center gap-[0.625rem] mt-[1.1875rem]">
            <button className="w-[8.9375rem] h-full bg-black-200 rounded-[1.25rem] text-white" onClick={onClose}>
              취소
            </button>
            <button
              className="w-[8.9375rem] h-full bg-primary-400 rounded-[1.25rem] text-white"
              onClick={handlePostSelectItem}>
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
