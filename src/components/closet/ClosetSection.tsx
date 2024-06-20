import ClosetItem from './ClosetItem';
import { useGetAccessory } from '@/services/closet/getAccessory';
import { useGetBackground } from '@/services/closet/getBackground';
import { useGetPet } from '@/services/closet/getPet';
import { usePostBackground } from '@/services/closet/postBackground';
import { usePostAccessory } from '@/services/closet/postAccessory';
import { ClosetSectionProps } from '@/types/closetType';

export default function ClosetSection({ selectedMenu, modalHandler, selectedItemName }: ClosetSectionProps) {
  const { data: accessoryList } = useGetAccessory();
  const { data: backgroundList } = useGetBackground();
  const { data: petList } = useGetPet();
  const { mutateAsync: postAccessory } = usePostAccessory();
  const { mutateAsync: postBackground } = usePostBackground();
  const itemList = selectedMenu === '액세서리' ? accessoryList : selectedMenu === '배경화면' ? backgroundList : petList;

  const handlePostSelectItem = (itemName: string) => {
    selectedMenu === '액세서리' ? postAccessory({ item_name: itemName }) : postBackground({ item_name: itemName });
  };

  const handleSelectPet = (itemName: string) => {
    modalHandler();
    selectedItemName.current = itemName;
  };

  return (
    <section className="w-full h-full">
      <div className="w-full h-[1.8125rem] bg-primary-400 text-white font-bold flex justify-center items-center">
        {selectedMenu}
      </div>
      <div className="w-full h-fit p-[0.8125rem] grid grid-cols-3 gap-x-[1.125rem] gap-y-[0.8125rem]">
        {itemList?.map((item, i) => {
          return (
            <button
              key={i}
              className={`w-fit h-fit`}
              disabled={item.item === '???'}
              onClick={() => {
                selectedMenu === '펫 도감' ? handleSelectPet(item.item) : handlePostSelectItem(item.item);
              }}>
              <ClosetItem isSelected={item.selected} item={item} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
