'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteBrandMutation, useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import AddButton from '@/widgets/ui/AddButton';
import DynamicTable from '@/widgets/ui/DynamicTable';
import Pagination from '@/widgets/ui/Pagination';
import { brandsTableConfig } from '@/widgets/ui/DynamicTable/configs/brands';
import { toast } from 'sonner';

const Brands = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data = [],
    isLoading,
    isError,
  } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  }, [isError]);

  const [deleteBrand] = useDeleteBrandMutation();

  const limit = 10;

  const pagedData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  }, [data, page, limit]);

  const totalPages = Math.ceil(data.length / limit);

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, data.length);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id).unwrap();
      toast.success('Бренд успешно удалён');
    } catch (e) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <span className="text-2xl font-medium">Бренды</span>
        <AddButton to="/admin/brands/create" content="Создать бренд" />
      </div>

      <DynamicTable
        queryResult={{ data: pagedData, isLoading }}
        config={{
          ...brandsTableConfig,
          onRowClick: (row) => router.push(`/admin/brands/${row.id}`),
        }}
        deleteQuery={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex justify-between items-center text-sm text-gray-600 font-sans">
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />

          <span>
            Показано {startItem}–{endItem} из {data.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Brands;
