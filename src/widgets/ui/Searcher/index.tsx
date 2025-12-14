'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/shared/assets/icons/search.png';
import { useGlobalSearchQuery } from '@/features/main/mainApiSlice';

const Searcher = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: globalSearchResponse } = useGlobalSearchQuery(searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setIsOpen(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-2 mt-12 w-full max-w-[700px]">
      <form className="flex items-center gap-4" onSubmit={handleSearch}>
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center w-full h-[48px] bg-white rounded-[35px] px-5 shadow"
        >
          <Image src={searchIcon} alt="search" width={18} height={18}/>
          <input
            type="text"
            placeholder="Поиск"
            value={inputValue}
            onChange={handleChange}
            className="w-full h-full bg-transparent outline-none px-3 text-lg text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="h-[48px] px-7 bg-red-600 text-white text-lg font-medium rounded-[20px] hover:bg-red-700 transition cursor-pointer"
        >
          Найти
        </button>
      </form>

      {isOpen && searchQuery && globalSearchResponse?.items.length ? (
        <ul className="absolute top-full w-full bg-white rounded-[12px] shadow mt-2 max-h-60 overflow-y-auto">
          {globalSearchResponse.items.map((item) => (
            <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer line-clamp-1">
              {item.name}{item.price ? ` — ${item.price} ₽` : ''}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Searcher;
