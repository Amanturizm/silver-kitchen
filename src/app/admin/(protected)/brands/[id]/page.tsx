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

              {
                key: 'description',
                title: 'Описание',
                variant: 'block',
              },

              {
                key: 'img',
                title: 'Изображение',
                value: (d) => (
                  <div className="shadow-[0_0_10px_0_rgba(34,60,80,0.16)] border border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={`${BASE_URL}/uploads/${d.img}`}
                      className="w-full h-60 object-contain rounded"
                      alt=""
                    />
                  </div>
                ),
                visible: (d) => !!d.img,
                emptyText: 'Нет изображения',
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Page;
