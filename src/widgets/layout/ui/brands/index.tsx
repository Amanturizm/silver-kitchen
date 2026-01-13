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
    <div className="container relative">
      <div
        className="bg-[#215573] w-full min-[678px]:w-2/3 rounded-[20px]
        p-6
        min-[1800px]:p-10
        pb-[15%]
        min-[1800px]:pb-[10%]
        "
      >
        <h6
          className="uppercase
          text-md
          [@media(min-width:992px)]:text-lg
          min-[1400px]:text-xl
          min-[1800px]:text-2xl
          text-white max-w-full min-[678px]:max-w-1/2"
        >
          В нашем магазине представлена продукция брендов
        </h6>
      </div>

      {brands?.length && (
        <div className="absolute right-0 top-[calc(100%+20px)] min-[678px]:top-1/2 -translate-y-1/2 bg-white rounded-[20px] py-5 max-[678px]:py-[30px] max-[678px]:mx-auto max-[678px]:max-w-[90%] w-full min-[678px]:w-[60%] min-[992px]:w-[50%] min-[1600px]:w-[40%] h-[90%] min-[678px]:h-[70%] flex items-center gap-4">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 border-2 border-[#9193A2] rounded-full flex items-center justify-center ml-6 shrink-0 cursor-pointer"
          >
            <Image src={arrowLeftIcon} alt="arrow-left" width={24} height={24} />
          </button>

          <div ref={emblaRef} className="overflow-hidden flex-1 h-full">
            <div className="flex h-full">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE_URL}/uploads/${brand.img}`}
                    alt="brand"
                    height={60}
                    className="object-contain h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
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
      )}
    </div>
  );
};

export default Brands;
