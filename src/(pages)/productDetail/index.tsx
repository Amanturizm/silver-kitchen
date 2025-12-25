'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetItemQuery } from '@/features/items/itemsApiSlice';
import { findPath, scrollToMain } from '@/shared/constants';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { Breadcrumbs } from '@/widgets/ui/Breadcrumbs';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import ImagesGallary from '@/widgets/ui/ImagesGallary';

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading } = useGetItemQuery(productId);
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    scrollToMain();
  }, [product]);

  if (isLoading) return <Loading size={50} />;
  if (!product) return <NotFound message="Товар не найден" size={50} />;

  const categoriesChain = product?.category_id && findPath(categories, product.category_id);

  return (
    <div className="max-[992px]:py-6 py-16">
      <div className="mx-auto w-full">
        {categoriesChain && (
          <Breadcrumbs
            chain={categoriesChain}
            startPath="/products"
            startPathTitle="Главная"
            paramName="categoryId"
            endPathTitle={product?.name}
          />
        )}

        <div className="mt-10 flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[520px] xl:w-[600px] 2xl:w-[640px] shrink-0">
            <ImagesGallary images={product.images} name={product.name} />
          </div>

          <div className="flex-1 flex flex-col gap-4 min-w-0">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            {product.price ? (
              <span className="text-xl font-semibold">{product.price} сом</span>
            ) : (
              <span className="text-xl font-semibold text-red-500">Договорная</span>
            )}
            <div className="text-gray-600">
              {product.brand_name && <div>Бренд: {product.brand_name}</div>}
              {product.category_name && <div>Категория: {product.category_name}</div>}
            </div>
            {product.short_desc && <p className="mt-4 text-gray-700">{product.short_desc}</p>}
            {product.desc && <p className="mt-2 text-gray-700">{product.desc}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
