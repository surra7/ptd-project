import React, { useState, useEffect } from 'react';

interface PetStateMessageProps {
  message: string;
}

function PetStateMessage({ message }: PetStateMessageProps) {
  return (
    <div className="w-full my-5 mx-auto p-1 bg-primary-400 font-mm text-white rounded-2xl">
      {message}
    </div>
  );
};

export default PetStateMessage;