'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicDetailView } from '@/widgets/ui/DynamicDetailView';
import { useGetItemQuery } from '@/features/items/itemsApiSlice';
import { Loading, NotFound } from '@/widgets/ui/Message';
import ImagesGallary from '@/widgets/ui/ImagesGallary';

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
        values && (
          <DynamicDetailView
            data={values}
            config={{
              columns: [
                { key: 'name', title: 'Название' },

                {
                  key: 'price',
                  title: 'Цена',
                  format: (v) => `${v} сом`,
                  visible: (d) => !!d.price,
                },

                { key: 'category_name', title: 'Категория' },
                { key: 'brand_name', title: 'Бренд' },

                {
                  key: 'short_desc',
                  title: 'Краткое описание:',
                  variant: 'block',
                },

                {
                  key: 'desc',
                  title: 'Описание:',
                  variant: 'block',
                  value: (d) =>
                    d.desc ? (
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: d.desc }}
                      />
                    ) : null,
                  emptyText: 'Нет описания',
                },

                {
                  key: 'images',
                  title: 'Изображения',
                  variant: 'block',
                  value: (d) =>
                    d.images.length > 0 && (
                      <div className="w-full lg:w-[520px] xl:w-[600px] 2xl:w-[640px]">
                        <ImagesGallary images={d.images} />
                      </div>
                    ),
                  emptyText: 'Нет изображений',
                },
              ],
            }}
          />
        )
      )}
    </div>
  );
};

export default Page;
