import Image from 'next/image';
import { Item } from '@/features/items/types';
import { BASE_URL } from '@/shared/constants';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const image = item.images?.[0];

  return (
    <div className="bg-white rounded-[16px] p-4 flex flex-col justify-between gap-2 w-full max-w-[400px]">
      <div>
        <div className="relative w-full">
          {image && (
            <div className="h-[300px]">
              <Image
                src={`${BASE_URL}/uploads${image.path}/${image.name}`}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="text-lg font-bold text-center">{item.name}</div>
      </div>

      {item.price ? (
        <span className="text-center text-lg">{item.price} сом</span>
      ) : (
        <button className="text-red-500 text-lg font-medium hover:underline cursor-pointer">
          Договорная
        </button>
      )}
    </div>
  );
};

export default ItemCard;
