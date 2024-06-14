import useOutsideClick from '@/hooks/useOutsideClick';
import { SelectBoxProps } from '@/types/calendarType';
import { useState } from 'react';

export default function SelectBox({ type, possibleList, currentProps, setCurrentProps }: SelectBoxProps) {
  const [isClickedSelectBox, setIsClickedSelectBox] = useState(false);
  const outsideRef = useOutsideClick(() => setIsClickedSelectBox(false));

  return (
    <div className="w-20 h-[1.875rem] text-center outline-0 relative">
      <button
        className={`w-full h-full border border-[#D1D1D1] rounded-[5px] z-10 ${isClickedSelectBox ? 'hidden' : 'block'}`}
        onClick={() => {
          setIsClickedSelectBox(true);
        }}>
        {currentProps}
        {type}
      </button>
      <ul
        ref={outsideRef}
        className={`w-full bg-white ${isClickedSelectBox ? 'block animate-fadeInDown' : 'hidden'} border border-[#D1D1D1] rounded-[5px] z-20 relative`}>
        {possibleList.map((item, i) => {
          return (
            <li
              key={i}
              value={i + 1}
              className={`h-[1.875rem] py-[2px] cursor-pointer ${item === currentProps ? '' : 'text-[#D1D1D1]'}`}
              onClick={() => {
                setCurrentProps(Number(item));
                setIsClickedSelectBox(false);
              }}>
              {item}
              {type}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
