'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicDetailView } from '@/widgets/ui/DynamicDetailView';
import { BASE_URL } from '@/shared/constants';
import { useGetItemQuery } from '@/features/items/itemsApiSlice';
import { Loading, NotFound } from '@/widgets/ui/Message';

const Page = () => {
  const params = useParams();
  const itemId = params.id as string;

  const { data: item, isLoading } = useGetItemQuery(itemId);

  const values = item && {
    ...item,
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium">Подробный просмотр</span>
      {isLoading ? (
        <Loading />
      ) : !item ? (
        <NotFound message="Товар не найден" />
      ) : (
        <DynamicDetailView
          data={values}
          config={{
            columns: [
              { key: 'name', title: 'Название' },
              { key: 'price', title: 'Цена', render: (row) => `${row?.price} сом` },
              { key: 'short_desc', title: 'Краткое описание' },
              { key: 'desc', title: 'Описание' },
              {
                key: 'images',
                title: 'Изображение',
                render: (row) =>
                  row?.images.map((img) => (
                    <img
                      key={img.name}
                      src={`${BASE_URL}/uploads${img.path}/${img.name}`}
                      className="w-24 h-24 object-cover rounded"
                      alt=""
                    />
                  )),
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Page;
