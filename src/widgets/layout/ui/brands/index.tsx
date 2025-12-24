'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { BASE_URL } from '@/shared/constants';
import arrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';

const Brands = () => {
  const { data: brands } = useGetBrandsQuery({ active: 1 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    brands?.length && (
      <div className="container relative">
        <div className="bg-[#215573] w-2/3 rounded-[20px] p-10 pb-[15%] min-w-[1800px]:pb-[10%]">
          <p className="uppercase text-xl min-w-[1400px]:text-2xl text-white max-w-1/2">
            В нашем магазине представлена продукция брендов
          </p>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-[20px] py-[30px] w-[50%] min-w-[1600px]:w-[40%] flex items-center gap-4">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 border-2 border-[#9193A2] rounded-full flex items-center justify-center ml-6 shrink-0"
          >
            <Image src={arrowLeftIcon} alt="arrow-left" width={24} height={24} />
          </button>

          <div ref={emblaRef} className="overflow-hidden flex-1">
            <div className="flex">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="
                    flex justify-center items-center shrink-0 px-2
                    w-full
                    md:w-1/2
                    lg:w-1/3
                  "
                >
                  <Image
                    src={`${BASE_URL}/uploads/${brand.img}`}
                    alt="brand"
                    width={180}
                    height={60}
                    unoptimized
                    className="object-contain w-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 border-2 border-[#9193A2] rounded-full flex items-center justify-center mr-6 shrink-0"
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
