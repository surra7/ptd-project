import { useState } from 'react';
import ClosetItem from './ClosetItem';

export default function ClosetSection({ selectedMenu }: { selectedMenu: string }) {
  const [selectedItemId, setSelectedItemId] = useState(0);
  const itemList = Array(9)
    .fill(0)
    .map((v, i) => i + 1);

  return (
    <section className="w-full h-full">
      <div className="w-full h-[1.8125rem] bg-primary-400 text-white font-bold flex justify-center items-center">
        {selectedMenu}
      </div>
      <div className="w-full h-fit p-[0.8125rem] grid grid-cols-3 gap-x-[1.125rem] gap-y-[0.8125rem]">
        {itemList.map((item, i) => {
          return (
            <button key={i} className={`w-fit h-fit`}>
              <ClosetItem isSelected={selectedItemId === i} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
