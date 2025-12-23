'use client';

import React, { useMemo } from 'react';
import AddButton from '@/widgets/ui/AddButton';
import { useRouter, useSearchParams } from 'next/navigation';
import DynamicTable from '@/widgets/ui/DynamicTable';
import { useDeleteItemMutation, useGetItemsQuery } from '@/features/items/itemsApiSlice';
import { ItemsFilter } from '@/features/items/types';
import { itemsTableConfig } from '@/widgets/ui/DynamicTable/configs/items';
import Pagination from '@/widgets/ui/Pagination';
import { toast } from 'sonner';

const Items = () => {
  const router = useRouter();

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

  const { data, isLoading, refetch } = useGetItemsQuery(filter, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteItem] = useDeleteItemMutation();

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id).unwrap();
      refetch();
      toast.success('Товар успешно удалён');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <span className="text-2xl font-medium">Товары</span>

        <AddButton to="/admin/items/create" content="Создать товар" />
      </div>

      <DynamicTable
        queryResult={{ data: data?.data, isLoading }}
        config={{
          ...itemsTableConfig,
          onRowClick: (row) => router.push(`/admin/items/${row.id}`),
        }}
        deleteQuery={handleDelete}
      />

      {data && (
        <div className="flex justify-between items-center text-sm text-gray-600 font-sans">
          <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />

          <span>
            Показано {(data.page - 1) * data.limit + 1}–
            {Math.min(data.page * data.limit, data.totalItems)} из {data.totalItems}
          </span>
        </div>
      )}
    </div>
  );
};

export default Items;
