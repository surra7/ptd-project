import { getFullImageUrl } from '@/libs/getFullImageUrl';
import { ClosetItemProps } from '@/types/closetType';
import Image from 'next/image';
import { MdPets } from 'react-icons/md';

export default function ClosetItem({ isSelected, item }: ClosetItemProps) {
  const fullImageUrl = getFullImageUrl(item.image);

  return (
    <div
      className={`w-[6.875rem] h-[6.875rem] ${isSelected ? 'bg-primary-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' : 'bg-primary-100'} rounded-[0.625rem] flex flex-col justify-end items-center`}>
      {item.image ? (
        <Image src={fullImageUrl} alt={item.item} width={50} height={50} />
      ) : (
        <MdPets size={50} color="white" className="justify-self-center" />
      )}
      <div
        className={`h-[1.625rem] text-mm ${isSelected ? 'text-white' : 'text-black-400'} my-1 flex justify-center items-center`}>
        {item.item}
      </div>
    </div>
  );
}
