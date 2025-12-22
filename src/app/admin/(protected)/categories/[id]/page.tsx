'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicDetailView } from '@/widgets/ui/DynamicDetailView';
import { BASE_URL } from '@/shared/constants';
import { useGetCategoryQuery } from '@/features/categories/categoriesApiSlice';
import { Loading, NotFound } from '@/widgets/ui/Message';

const Page = () => {
  const params = useParams();
  const categoryId = params.id as string;

  const { data: category, isLoading } = useGetCategoryQuery(categoryId);

  const values = category && {
    ...category,
    active: category.active ? 'Активен' : 'Неактивен',
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium">Подробный просмотр</span>
      {isLoading ? (
        <Loading />
      ) : !category ? (
        <NotFound message="Категория не найдена" />
      ) : (
        <DynamicDetailView
          data={values}
          config={{
            columns: [
              { key: 'name', title: 'Название' },
              { key: 'queue', title: 'Очередь' },
              { key: 'active', title: 'Статус' },
              {
                key: 'image',
                title: 'Изображение',
                render: (row) => (
                  <img
                    src={BASE_URL + 'upload/' + row?.image}
                    className="w-24 h-24 object-cover rounded"
                    alt=""
                  />
                ),
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Page;
