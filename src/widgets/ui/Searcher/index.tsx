'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import searchIcon from '@/shared/assets/icons/search.png';
import { useGlobalSearchQuery } from '@/features/main/mainApiSlice';
import SearchItem from '@/widgets/ui/Searcher/ui/SearchItem';
import { buildQueryString } from '@/shared/constants';

const DEBOUNCE_DELAY = 400;

const Searcher = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties | null>(null);

  const { data: globalSearchResponse } = useGlobalSearchQuery(searchQuery, {
    skip: !searchQuery,
  });

  const { items, categories, brands } = globalSearchResponse ?? {};
  const isVisible = isOpen && !!searchQuery;

  const recalcPosition = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  };

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
    if (
      wrapperRef.current?.contains(e.target as Node) ||
      dropdownRef.current?.contains(e.target as Node)
    ) {
      return;
    }

    setIsOpen(false);
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

  useEffect(() => {
    if (!isVisible) return;
    recalcPosition();
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('resize', recalcPosition);
    window.addEventListener('scroll', recalcPosition, true);

    return () => {
      window.removeEventListener('resize', recalcPosition);
      window.removeEventListener('scroll', recalcPosition, true);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-col gap-2 w-full max-w-[600px] min-[1800px]:max-w-[700px]"
    >
      <form className="flex items-center gap-4" onSubmit={handleSubmit}>
        <div
          onClick={() => inputValue && setIsOpen(true)}
          className="flex items-center w-full h-[34px] min-[768px]:h-[40px] min-[1200px]:h-[44px] min-[1800px]:h-[48px] bg-white rounded-[35px] px-3 min-[768px]:px-5 shadow"
        >
          <Image src={searchIcon} alt="search" width={18} height={18} />
          <input
            type="text"
            name="search"
            placeholder="Поиск"
            value={inputValue}
            onChange={handleChange}
            className="w-full h-full bg-transparent outline-none px-3 text-md min-[768px]:text-lg text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="h-[40px] min-[1200px]:h-[44px] min-[1800px]:h-[48px] px-6 min-[1800px]:px-7 bg-red-600 text-white text-md min-[1800px]:text-lg font-medium rounded-[16px] min-[1800px]:rounded-[20px] hover:bg-red-700 transition cursor-pointer max-[992px]:hidden"
        >
          Найти
        </button>
      </form>

      {isVisible &&
        dropdownStyle &&
        createPortal(
          <ul
            ref={dropdownRef}
            style={dropdownStyle}
            className="bg-white rounded-[12px] shadow max-h-60 overflow-y-auto"
          >
            {items?.map((item) => (
              <SearchItem
                key={item.id}
                to={`/products?${buildQueryString({
                  categoryId: item.category_id,
                  brandId: item.brand_id,
                })}`}
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
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default Searcher;
