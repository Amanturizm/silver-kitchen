'use client';
import React from 'react';
import Image from 'next/image';
import searchIcon from '@/shared/assets/icons/search.png';

const Searcher = () => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <div className="flex items-center w-[700px] h-[48px] bg-white rounded-[35px] px-5 shadow">
        <Image src={searchIcon} alt="search" width={18} height={18} />
        <input
          type="text"
          placeholder="Поиск"
          className="w-full h-full bg-transparent outline-none px-3 text-lg text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <button className="h-[48px] px-7 bg-red-600 text-white text-lg font-medium rounded-[20px] hover:bg-red-700 transition">
        Найти
      </button>
    </div>
  );
};

export default Searcher;
