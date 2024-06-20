import React, { useState, useEffect } from 'react';

interface PetStateMessageProps {
  message: string;
  messageClass: string;
}

function PetStateMessage({ message, messageClass }: PetStateMessageProps) {
  return (
    <div className="w-full my-5 mx-auto p-1 bg-primary-400 font-mm text-white rounded-2xl">
      <div className={` ${messageClass || ''}`}>
        {message}
      </div>
      
    </div>
  );
};

export default PetStateMessage;