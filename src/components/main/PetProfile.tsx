import React, { useState, useEffect } from 'react';

interface PetInfoProps {
  petId: number;
}

function PetProfile ({ petId }: PetInfoProps) {
  const [petName, setPetName] = useState('');
  const [petLevel, setPetLevel] = useState(0);
  const [petExp, setPetExp] = useState(0);
  const [maxExp, setMaxExp] = useState(0);

  useEffect(() => {
    fetch(`/api`)
      .then(response => response.json())
      .then(data => {
        setPetName(data.name);
        setPetLevel(data.level);
        setPetExp(data.exp);
        setMaxExp(data.maxExp);
      });
  }, [petId]);

  const progress = (petExp / maxExp) * 100;

  return (
    <header className="h-1/6 pt-8 pb-2 bg-white">
      <div className="w-5/6 pt-4 pb-2 mx-auto flex">
        <p className="w-1/2 text-lg font-medium text-primary-600 text-start">{petName}</p>
        <div className="w-1/2 flex justify-end items-end">
          <p className="px-1">{petLevel} Lv</p>
          <div className="flex items-center">
            <div
              className={`w-[${progress}%] h-4 rounded-3xl bg-primary-500`}
            ></div>
            <p className="text-sm text-black-300 ml-1">({petExp}/{maxExp})</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PetProfile;