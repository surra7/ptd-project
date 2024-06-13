import { useRouter } from 'next/navigation';
import React from 'react'

interface MainPetButtonProps {
  icon: React.ReactNode;
  label: string;
  link?: string;
}
  
function MainPetButton({ icon, label, link }: MainPetButtonProps) {
  const router = useRouter();

  return (

    <button className="grid w-[4.375rem] h-[4.375rem] mx-2 p-1 bg-[rgba(255,255,255,0.7)] rounded-xl font-mm justify-center items-center"
    onClick={() => link && router.push(link)}>
      <div className="flex justify-center items-center bg-transparent">
        {icon}
      </div>
      <div className="bg-transparent text-mm font-semibold">{label}</div>
    </button>
  );
}


export default MainPetButton;
