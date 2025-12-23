'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { BASE_URL } from '@/shared/constants';
import arrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';

const Brands = () => {
  const { data: brands } = useGetBrandsQuery({ active: 1 });
  const sliderRef = useRef<HTMLDivElement>(null);

  const getItemsPerView = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const items = getItemsPerView();
    const itemWidth = sliderRef.current.offsetWidth / items;

    sliderRef.current.scrollBy({
      left: dir === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    brands?.length && (
      <div className="container relative">
        <div className="bg-[#215573] w-2/3 rounded-[20px] p-10 pb-[10%]">
          <p className="uppercase text-2xl text-white max-w-1/2">
            В нашем магазине представлена продукция брендов
          </p>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-[20px] py-[30px] w-[40%] flex items-center gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 border-2 border-[#9193A2] rounded-full flex items-center justify-center ml-6 shrink-0 cursor-pointer"
          >
            <Image src={arrowLeftIcon} alt="arrow-left" width={24} height={24} />
          </button>

          <div ref={sliderRef} className="flex overflow-hidden scroll-smooth flex-1">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="
                flex justify-center items-center flex-shrink-0 px-2
                w-full
                md:w-1/2
                xl:w-1/3
              "
              >
                <Image
                  src={`${BASE_URL}/uploads/${brand.img}`}
                  alt="brand"
                  width={180}
                  height={60}
                  unoptimized
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 border-2 border-[#9193A2] rounded-full flex items-center justify-center mr-6 shrink-0 cursor-pointer"
          >
            <Image
              src={arrowLeftIcon}
              alt="arrow-right"
              width={24}
              height={24}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    )
  );
};

export default Brands;
