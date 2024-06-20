import { useRouter } from 'next/navigation';
import React from 'react'

interface MainPetButtonProps {
  icon: React.ReactNode;
  label: string;
  link?: string;
  count?: number;
  handle?: () => void;
  boxCount?: number;
}
  
function MainPetButton({ icon, label, link, count, handle, boxCount }: MainPetButtonProps) {
  const router = useRouter();

  return (
    <div>
      <div>
        {count === -1 ? (
          null
          ) : (
          <div className="text-mm font-medium text-black-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">+{count}</div>
        )}            
      </div>
      <button className="grid w-[4.375rem] h-full mx-2 p-1 bg-[rgba(255,255,255,0.7)] rounded-xl font-mm justify-center items-end"
        onClick={() => {
          link && router.push(link);
          handle && handle();
        }} >
        <div className="flex justify-center">
          {icon}
        </div>
        <div className="text-l font-semibold pt-1">{label}</div>
      </button>
    </div>
  );
}

export default MainPetButton;
