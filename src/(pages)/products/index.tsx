'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '@/features/items/itemsApiSlice';
import { ItemsFilter } from '@/features/items/types';
import ItemCard from '@/widgets/ui/ItemCard';
import CategoryMenu from '../../widgets/ui/CategoryMenu';
import Pagination from '@/widgets/ui/Pagination';
import { NumberInput } from '@/widgets/ui/InputField/ui/NumberInput';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { Select } from '@/widgets/ui/InputField/ui/Select';
import { RotateCw } from 'lucide-react';
import { scrollToMain } from '@/shared/constants';
import { Loading, NotFound } from '@/widgets/ui/Message';

const DEBOUNCE_DELAY = 400;

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: brands } = useGetBrandsQuery();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getInitialFilter = (): ItemsFilter => ({
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null,
    brandId: searchParams.get('brandId') ? Number(searchParams.get('brandId')) : null,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
    sortDirection: searchParams.get('sortDirection') || null,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  });

  const [filter, setFilter] = useState<ItemsFilter>(getInitialFilter);
  const [debouncedFilter, setDebouncedFilter] = useState<ItemsFilter>(getInitialFilter);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilter(getInitialFilter());
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [filter]);

  const { data: itemsResponse, isLoading } = useGetItemsQuery(debouncedFilter, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const items = itemsResponse?.data;

  const updateQuery = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(window.location.search);
    if (value === null || value === '') params.delete(key);
    else params.set(key, String(value));
    router.replace(`?${params.toString()}`, { scroll: false });
    scrollToMain();
  };

  const onDebouncedChange = (key: string, value: number | null) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateQuery(key, value);
    }, DEBOUNCE_DELAY);
  };

  const onMinPriceChange = (val: number | '') => {
    const numberVal = val === '' ? null : Number(val);
    if (numberVal === filter.minPrice) return;
    setFilter((prev) => ({ ...prev, minPrice: numberVal }));
    onDebouncedChange('minPrice', numberVal);
  };

  const onMaxPriceChange = (val: number | '') => {
    const numberVal = val === '' ? null : Number(val);
    if (numberVal === filter.maxPrice) return;
    setFilter((prev) => ({ ...prev, maxPrice: numberVal }));
    onDebouncedChange('maxPrice', numberVal);
  };

  const setPage = (page: number) => updateQuery('page', page);

  const resetFilters = () => {
    setFilter(getInitialFilter());
    const paramsKeys = ['brandId', 'minPrice', 'maxPrice', 'sortDirection'];
    const params = new URLSearchParams(window.location.search);
    paramsKeys.forEach((key) => params.delete(key));
    router.replace(`?${params.toString()}`, { scroll: false });
    scrollToMain();
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const hasActiveFilters =
    filter.brandId || filter.minPrice || filter.maxPrice || filter.sortDirection;

  return (
    <div className="py-16">
      <div className="mt-14 flex items-start">
        <div className="w-1/3 min-[1500px]:w-1/5">
          <div className="min-w-[300px]">
            <CategoryMenu />
          </div>

          <div className="mt-8 space-y-2">
            <Select
              label="Бренд"
              placeholder=""
              value={filter.brandId ?? ''}
              options={(brands || []).map((brand) => ({ value: brand.id, label: brand.name }))}
              onChange={(val) => {
                setFilter((prev) => ({ ...prev, brandId: val ? Number(val) : null }));
                updateQuery('brandId', val);
              }}
            />

            <Select
              label="Сортировка"
              placeholder=""
              value={filter.sortDirection ?? ''}
              options={[
                { value: 'ASC', label: 'Цена: по возрастанию' },
                { value: 'DESC', label: 'Цена: по убыванию' },
              ]}
              onChange={(val) => {
                const dir = String(val) || null;
                setFilter((prev) => ({ ...prev, sortDirection: dir }));
                updateQuery('sortDirection', dir);
              }}
            />

            <NumberInput
              label="Цена"
              placeholder="От"
              value={filter.minPrice ?? ''}
              onChange={onMinPriceChange}
            />
            <NumberInput
              placeholder="До"
              value={filter.maxPrice ?? ''}
              onChange={onMaxPriceChange}
            />

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="cursor-pointer mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <RotateCw size={16} />
                Сбросить
              </button>
            )}
          </div>
        </div>

        <div className="px-8 w-full">
          <div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 [@media(min-width:2300px)]:grid-cols-5 gap-6"
            style={{ height: '100%' }}
          >
            {isLoading ? (
              <Loading size={30} />
            ) : (
              items?.map((item) => <ItemCard key={item.id} item={item} />)
            )}
            {items?.length === 0 && (
              <NotFound message="Товары не найдены" style={{ color: 'gray' }} size={30} />
            )}
          </div>

          {itemsResponse?.data.length ? (
            <div className="flex justify-between items-center text-sm text-gray-600 font-sans mt-4">
              <Pagination
                page={itemsResponse.page}
                totalPages={itemsResponse.totalPages}
                onChange={setPage}
              />
              <div></div>
              <span>
                Показано {(itemsResponse.page - 1) * itemsResponse.limit + 1}–
                {Math.min(itemsResponse.page * itemsResponse.limit, itemsResponse.totalItems)} из{' '}
                {itemsResponse.totalItems}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
