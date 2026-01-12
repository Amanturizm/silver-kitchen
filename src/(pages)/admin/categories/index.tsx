'use client';

import React from 'react';
import AddButton from '@/widgets/ui/AddButton';
import { useRouter, useSearchParams } from 'next/navigation';
import DynamicTable from '@/widgets/ui/DynamicTable';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/features/categories/categoriesApiSlice';
import { categoriesTableConfig } from '@/widgets/ui/DynamicTable/configs/categories';
import TableFilter from '@/widgets/ui/TableFilter';
import { Breadcrumbs } from '@/widgets/ui/Breadcrumbs';
import { findPath } from '@/shared/constants';
import { toast } from 'sonner';

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parentId = searchParams.get('parentId');
  const queryResult = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const { data = [] } = queryResult;

  const fullChain = parentId ? (findPath(data, Number(parentId)) ?? []) : [];

  const breadcrumbChain = fullChain.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const currentLevel = fullChain.length > 0 ? fullChain[fullChain.length - 1].children || [] : data;

  const categoriesOptions = currentLevel
    .filter((c) => c.children && c.children.length > 0)
    .map((c) => ({
      label: c.name,
      value: String(c.id),
    }));

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      queryResult.refetch();
      toast.success('Категория успешно удалена');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="text-xl sm:text-2xl font-medium">Категории</span>
        <AddButton to="/admin/categories/create" content="Создать категорию" />
      </div>

      {breadcrumbChain.length > 0 && (
        <div className="-mt-3">
          <Breadcrumbs startPath="/admin/categories" paramName="parentId" chain={breadcrumbChain} />
        </div>
      )}

      {categoriesOptions.length > 0 ? (
        <div className="w-full sm:max-w-[300px] -mt-3">
          <TableFilter name="parentId" label="Категория" options={categoriesOptions} />
        </div>
      ) : (
        <div className="h-0"></div>
      )}

      <DynamicTable
        queryResult={{ ...queryResult, data: currentLevel }}
        config={{
          ...categoriesTableConfig,
          onRowClick: (row) => router.push(`/admin/categories?parentId=${row.id}`),
        }}
        deleteQuery={handleDelete}
      />
    </div>
  );
};

export default Categories;
