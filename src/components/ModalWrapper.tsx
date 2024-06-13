import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
  bgColor?: string;
}

/**
 * 모달을 띄웠을 때 background로 깔리는 component
 * 색상 커스텀이 필요하면 props로 추가하기
 */
const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  return createPortal(
    <div className={`w-mobile h-mobile absolute top-0 z-30`} onClick={onClose}>
      {children}
    </div>,
    // 모달이 켜질 때는 이미 layout 컴포넌트가 실행된 이후 이기 때문에 "!"로 타입 강제
    document.querySelector('#modal-root')!,
  );
};

export default ModalWrapper;
