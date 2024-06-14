import { GuestListItemProps } from '@/types/guestBookType';
import { AiOutlineDelete } from 'react-icons/ai';

export default function GuestListItem({ item, modalHandler }: GuestListItemProps) {
  return (
    <div className="w-full min-h-[4.25rem] h-fit px-[0.9375rem] pt-2">
      <div className="h-6 flex justify-start items-center">
        <div className="pr-2 text-primary-400">{item.name}</div>
        <div className="text-xs text-black-200">{item.date}</div>
        <button className="ml-auto" onClick={modalHandler}>
          <AiOutlineDelete size={18} className="text-black-200 active:text-errorRed" />
        </button>
      </div>
      <div className="text-mm leading-5 py-2">{item.content}</div>
    </div>
  );
}
