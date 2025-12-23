import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Item } from '@/features/items/types';
import { BASE_URL } from '@/shared/constants';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface ItemGalleryProps {
  images: Item['images'];
  name?: string | null;
}

const ImagesGallery = ({ images, name }: ItemGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
        <ImageOff size={60} strokeWidth={1.7} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="relative w-full h-[400px] rounded-lg bg-white shadow-[0_0_10px_0_rgba(34,60,80,0.16)]">
        <div ref={emblaRef} className="overflow-hidden h-full rounded-lg">
          <div className="flex h-full cursor-pointer">
            {images.map((img) => (
              <div key={img.id} className="relative flex-[0_0_100%] h-full">
                <Image
                  src={`${BASE_URL}/uploads${img.path}/${img.name}`}
                  alt={name || ''}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black rounded-full p-1.5 z-10 cursor-pointer"
            >
              <ChevronLeft size={26} strokeWidth={1.3} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-black rounded-full p-1.5 z-10 cursor-pointer"
            >
              <ChevronRight size={26} strokeWidth={1.3} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mt-2 scrollbar-none">
          {images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`relative w-24 h-24 flex-shrink-0 bg-white rounded-md overflow-hidden border cursor-pointer transition ${
                i === activeIndex ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <Image
                src={`${BASE_URL}/uploads${img.path}/${img.name}`}
                alt={name || ''}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesGallery;
