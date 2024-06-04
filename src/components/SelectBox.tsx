import useOutsideClick from '@/hooks/useOutsideClick';
import { useState } from 'react';

interface SelectBoxProps {
  type: string;
  possibleList: string[];
  currentProps: number;
  setCurrentProps: (props: number) => void;
}

const SelectBox = ({ type, possibleList, currentProps, setCurrentProps }: SelectBoxProps) => {
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
              className={`h-[1.875rem] py-[2px] cursor-pointer ${item.replace(/[^0-9]/g, '') === currentProps.toString() ? '' : 'text-[#D1D1D1]'}`}
              onClick={() => {
                setCurrentProps(Number(item.replace(/[^0-9]/g, '')));
                setIsClickedSelectBox(false);
              }}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectBox;
