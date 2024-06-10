import React, { useState, useEffect } from 'react';

interface PetStateMessageProps {
  petId: number;
}

function PetStateMessage({ petId }: PetStateMessageProps) {
  // const [petState, setPetState] = useState('');

  // useEffect(() => {
  //   fetch(`/api`)
  //     .then(response => response.json())
  //     .then(data => setPetState(data.state));
  // }, [petId]);

  // return (
  //   <div className="w-4/5 my-5 mx-auto p-1 bg-primary-400 font-mm text-white rounded-2xl">
  //     {petState === '1' && <span>당신의 펫은 배고픕니다!</span>}
  //     {petState === '2' && <span>당신의 펫은 행복합니다!</span>}
  //     {petState === '3' && <span>당신의 펫은 심심합니다!</span>}
  //   </div>
  // );

  return (
    <div className="w-full my-5 mx-auto p-1 bg-primary-400 font-mm text-white rounded-2xl">
      {petId === 1 && <span>당신의 펫은 배가 고픕니다!</span>}
      {petId === 2 && <span>당신의 펫은 행복합니다!</span>}
      {petId === 3 && <span>당신의 펫은 심심합니다!</span>}
    </div>
  );
};

export default PetStateMessage;