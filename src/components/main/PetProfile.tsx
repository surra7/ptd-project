import React from 'react'

interface PetHeaderProps {
  name: string;
  level: number;
  progress: number;
  maxProgress: 100;
}

function PetProfile({ name, level, progress, maxProgress }: PetHeaderProps) {
  const progressBarWidth = (progress / 100) * 100 + '%';

  return (
    <div>
      <div className="w-5/6 pt-4 pb-2 mx-auto flex">
        <p className="w-1/2 text-lg font-medium text-primary-600 text-start">{name}</p>
        <div className="w-1/2 flex justify-end items-end">
          <p className="px-1">{level} Lv</p>
          <p className="text-sm text-black-300">({progress}/{maxProgress})</p>
        </div>
      </div>
      <div>
        {/* <div className="w-5/6 h-4 rounded-3xl bg-black-100 mx-auto">
          <div className="w-1/2 h-4 rounded-3xl bg-primary-500"></div> */}
          <div className="w-5/6 h-4 rounded-3xl bg-black-100 mx-auto">
          <div className="h-4 rounded-3xl bg-primary-500" style={{ width: progressBarWidth }}></div>
        </div>
      </div>
    </div>
  )
}

export default PetProfile