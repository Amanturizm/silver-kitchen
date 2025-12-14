import Image from 'next/image';
import { Item } from '@/features/items/types';
import { BASE_URL } from '@/shared/constants';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const image = item.images?.[0];

  return (
    <div className="bg-white rounded-[16px] p-4 flex flex-col justify-between gap-3 w-full max-w-[400px]">
      <div>
        <div className="relative w-full">
          {image && (
            <div className="h-[300px]">
              <Image
                src={`${BASE_URL}/uploads${image.path}`}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        <div className="text-lg font-bold text-center">{item.name}</div>
      </div>

      <button className="text-red-500 text-lg font-medium hover:underline cursor-pointer">
        Узнать стоимость
      </button>
    </div>
  );
};

export default ItemCard;
