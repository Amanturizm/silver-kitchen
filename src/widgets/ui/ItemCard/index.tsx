'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Item } from '@/features/items/types';
import { BASE_URL } from '@/shared/constants';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const image = item.images?.[0];

  const handleClick = () => {
    router.push(`/products/${item.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-[16px] p-4 flex flex-col justify-between gap-2 w-full max-[642px]:max-w-full max-w-[400px] cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.15)] transition-shadow"
    >
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
