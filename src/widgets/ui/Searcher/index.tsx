'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import searchIcon from '@/shared/assets/icons/search.png';
import { useGlobalSearchQuery } from '@/features/main/mainApiSlice';
import { useRouter } from 'next/navigation';
import SearchItem from '@/widgets/ui/Searcher/ui/SearchItem';
import { buildQueryString } from '@/shared/constants';

const DEBOUNCE_DELAY = 400;

const Searcher = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: globalSearchResponse } = useGlobalSearchQuery(searchQuery, {
    skip: !searchQuery,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(!!value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchQuery(value.trim());
    }, DEBOUNCE_DELAY);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setSearchQuery(inputValue.trim());
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
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const { items, categories, brands } = globalSearchResponse ?? {};

  const isVisible = isOpen && searchQuery;

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-2 mt-12 w-full max-w-[700px]">
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <div
          onClick={() => inputValue && setIsOpen(true)}
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

      {isVisible &&
        <ul className="absolute top-full w-full bg-white rounded-[12px] shadow mt-2 max-h-60 overflow-y-auto">
          {items?.map((item) => (
            <SearchItem
              key={item.id}
              to={`/products?${buildQueryString({ categoryId: item.category_id, brandId: item.brand_id })}`}
            >
              {item.name}
              {item.price ? ` — ${item.price} ⃀` : ''}
            </SearchItem>
          ))}

          {categories?.map((item) => (
            <SearchItem key={item.id} to={`/products?categoryId=${item.id}`}>
              {item.name}
            </SearchItem>
          ))}

          {brands?.map((item) => (
            <SearchItem key={item.id} to={`/products?brandId=${item.id}`}>
              {item.name}
            </SearchItem>
          ))}
        </ul>
      }
    </div>
  );
};

export default Searcher;
