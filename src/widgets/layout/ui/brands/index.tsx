import React from 'react';
import Image from 'next/image';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { BASE_URL } from '@/shared/constants';

const Brands = () => {
  const { data: brands, isLoading, isError } = useGetBrandsQuery();

  return (
    <div className="container relative">
      <div className="bg-[#215573] w-1/2 rounded-[20px] p-10 pb-[10%]">
        <p className="uppercase text-2xl text-white max-w-1/2">
          В нашем магазине представлена продукция брендов
        </p>
      </div>

      <div
        className="absolute right-0 top-1/2 translate-y-[-50%] bg-white rounded-[20px] py-[30px] flex items-center w-[70%] h-min">
        {brands?.map((brand) => (
          <Image
            src={`${BASE_URL}/uploads/${brand.img}`}
            alt="brand-img"
            width={250}
            height={50}
            unoptimized
            key={brand.id}
          />
        ))}
        {/*<Image src={`/uploads/brands/radax_logo.png`} alt="brand-img" width={250} height={50}/>*/}
        {/*<Image src={`/uploads/brands/radax_logo.png`} alt="brand-img" width={250} height={50}/>*/}
        {/*<Image src={`/uploads/brands/radax_logo.png`} alt="brand-img" width={250} height={50}/>*/}
      </div>
    </div>
  );
};

export default Brands;