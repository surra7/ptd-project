import { MdPets } from 'react-icons/md';

export default function ClosetItem({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className={`w-[6.875rem] h-[6.875rem] ${isSelected ? 'bg-primary-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]' : 'bg-primary-100'} rounded-[0.625rem] flex flex-col justify-end items-center`}>
      <MdPets size={50} color="white" className="justify-self-center" />
      <div
        className={`h-[1.625rem] text-mm ${isSelected ? 'text-white' : 'text-black-400'} mt-2 flex justify-center items-center`}>
        ???
      </div>
    </div>
  );
}
