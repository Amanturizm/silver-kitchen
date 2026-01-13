'use client';

import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import { useGetItemQuery } from '@/features/items/itemsApiSlice';
import { findPath, scrollToMain } from '@/shared/constants';
import { Breadcrumbs } from '@/widgets/ui/Breadcrumbs';
import ImagesGallary from '@/widgets/ui/ImagesGallary';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { ProductSchema } from '@/shared/components/schemas/ProductSchema';
import { BreadcrumbSchema } from '@/shared/components/schemas/BreadcrumbSchema';

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

  const breadcrumbItems = useMemo(() => {
    const items = [{ name: 'Главная', url: '/products' }];

    if (categoriesChain) {
      categoriesChain.forEach((cat: { id: number; name: string }) => {
        items.push({
          name: cat.name,
          url: `/products?categoryId=${cat.id}`,
        });
      });
    }

    if (product?.name) {
      items.push({
        name: product.name,
        url: `/products/${product.id}`,
      });
    }

    return items;
  }, [categoriesChain, product]);

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbItems} />
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

          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="mb-6">
                {product.price ? (
                  <span className="text-3xl font-bold text-gray-900">{product.price} сом</span>
                ) : (
                  <span className="text-3xl font-bold text-red-600">Договорная</span>
                )}
              </div>

              <div className="space-y-3 text-gray-700">
                {product.brand_name && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Бренд:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">{product.brand_name}</span>
                  </div>
                )}
                {product.category_name && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Категория:</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">
                      {product.category_name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {product.short_desc && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Краткое описание</h2>
                <p className="text-gray-700 leading-relaxed">{product.short_desc}</p>
              </div>
            )}

            {product.desc && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Подробное описание</h2>
                <div
                  className="text-gray-700 leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.desc }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductDetail;
