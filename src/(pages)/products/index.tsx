'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '@/features/items/itemsApiSlice';
import { ItemsFilter } from '@/features/items/types';
import ItemCard from '@/widgets/ui/ItemCard';
import CategoryMenu from '../../widgets/ui/CategoryMenu';

const ProductsPage = () => {
  const searchParams = useSearchParams();

  const filter = useMemo<ItemsFilter>(() => {
    const nextFilter: ItemsFilter = {
      categoryId: null,
      brandId: null,
      minPrice: null,
      maxPrice: null,
      limit: 20,
      page: 1,
      sortDirection: null,
    };

    searchParams.forEach((value, key) => {
      if (!value) return;

      if (['categoryId', 'brandId', 'limit', 'page', 'minPrice', 'maxPrice'].includes(key)) {
        nextFilter[key as keyof ItemsFilter] = Number(value);
      } else {
        nextFilter[key as keyof ItemsFilter] = value;
      }
    });

    return nextFilter;
  }, [searchParams]);

  const { data: itemsResponse } = useGetItemsQuery(filter);
  const items = itemsResponse?.data;

  return (
    <div className="py-16" id="products">
      <h1 className="uppercase text-2xl font-medium px-8">Кухонное оборудование</h1>

      <div className="mt-14 flex items-start">
        <div className="w-1/5">
          <CategoryMenu />
        </div>

        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-4
          gap-6
          px-8
          "
        >
          {items?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
