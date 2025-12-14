'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetItemsQuery } from '@/features/items/itemsApiSlice';
import { Item, ItemsFilter, SearchResponse } from '@/features/items/types';
import ItemCard from '@/widgets/ui/ItemCard';
import CategoryMenu from '../../widgets/ui/CategoryMenu';

const itemsMock: SearchResponse<Item> = {
  page: 1,
  limit: 20,
  totalItems: 2,
  totalPages: 1,
  data: [
    {
      id: 17,
      name: 'Плита газовая ПИЩТЕХ ПГ-2-01',
      price: 54500,
      category_id: 11,
      brand_id: 1,
      images: [
        {
          id: 7,
          name: '1765352126413-hly5nwthfg9w24a310mtrimb7pz0hl4r.jpeg',
          path: '/items/25a151f7-7a5c-437a-aea2-dfe72c725106'
        }
      ]
    },
    {
      id: 18,
      name: 'Плита газовая ПИЩТЕХ ПГ-4-01',
      price: 92045,
      category_id: 11,
      brand_id: 1,
      images: [
        {
          id: 8,
          name: '1765360190495-dh6zt2w4i5fxg0dexmspxejc74d50yil.jpeg',
          path: '/items/cac22af1-22af-47e9-8446-1e66f90c884b'
        }
      ]
    }
  ]
};

const ProductsPage = () => {
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<ItemsFilter>({
    categoryId: null,
    brandId: null,
    minPrice: null,
    maxPrice: null,
    limit: 20,
    page: 1,
    sortDirection: null,
  });

  const { data: itemsResponse } = useGetItemsQuery(filter);
  const items = (itemsResponse ?? itemsMock)?.data;

  useEffect(() => {
    const nextFilter: Partial<ItemsFilter> = {};

    searchParams.forEach((value, key) => {
      if (!value) return;

      if (['categoryId', 'brandId', 'limit', 'page', 'minPrice', 'maxPrice'].includes(key)) {
        nextFilter[key as keyof ItemsFilter] = Number(value);
      } else {
        nextFilter[key as keyof ItemsFilter] = value;
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilter(prev => {
      let changed = false;

      for (const key in nextFilter) {
        if (prev[key as keyof ItemsFilter] !== nextFilter[key as keyof ItemsFilter]) {
          changed = true;
          break;
        }
      }

      return changed ? { ...prev, ...nextFilter } : prev;
    });
  }, [searchParams]);

  return (
    <div className="py-16">
      <h1 className="uppercase text-2xl font-medium px-8">Кухонное оборудование</h1>

      <div className="mt-14 flex items-start">
        <div className="w-1/5">
          <CategoryMenu/>
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
          {items?.map(item => (
            <ItemCard key={item.id} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;