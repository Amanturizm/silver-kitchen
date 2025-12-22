'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicDetailView } from '@/widgets/ui/DynamicDetailView';
import { useGetBrandQuery } from '@/features/brands/brandsApiSlice';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { BASE_URL } from '@/shared/constants';

const Page = () => {
  const params = useParams();
  const brandId = params.id as string;

  const { data: brand, isLoading } = useGetBrandQuery(brandId);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium">Подробный просмотр</span>
      {isLoading ? (
        <Loading />
      ) : !brand ? (
        <NotFound message="Бренд не найден" />
      ) : (
        <DynamicDetailView
          data={brand}
          config={{
            columns: [
              { key: 'name', title: 'Название' },
              { key: 'description', title: 'Описание' },
              {
                key: 'img',
                title: 'Изображение',
                render: (row) => (
                  <img
                    src={BASE_URL + 'upload/' + row.img}
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
