'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useParams, useRouter } from 'next/navigation';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { useGetItemQuery, useUpdateItemMutation } from '@/features/items/itemsApiSlice';
import { findPath } from '@/shared/constants';
import { TreeNode } from '@/widgets/ui/DynamicForm/configs/types';
import {
  useDynamicChainSelect,
  useDynamicPlainSelect,
} from '@/widgets/ui/DynamicForm/configs/hooks';
import { cleanupParentFields, extractFinalParentId } from '@/widgets/ui/DynamicForm/configs/utils';
import { ItemRequest } from '@/features/items/types';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;

  const [updateItem] = useUpdateItemMutation();

  const { data: item, isLoading } = useGetItemQuery(itemId);
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();

  const itemsForm = FORM_PROPS.find((f) => f.entity === 'items');

  const path = item?.category_id ? findPath(categories as TreeNode[], item.category_id) : [];

  const fieldsWithBrandsOptions = useDynamicPlainSelect(
    itemsForm?.fields || [],
    brands || [],
    'brandId',
  );

  const fieldsWithOptions = useDynamicChainSelect(
    fieldsWithBrandsOptions || [],
    path.filter((cat) => cat.id !== 0),
    'categoryId',
    categories || [],
    (item?.category_id || '') + '',
    false,
  );

  if (!itemsForm) return null;

  const handleSubmit = async (data: typeof itemsForm.defaultValues) => {
    try {
      const finalCategoryId = extractFinalParentId(data, 'categoryId');

      const body = {
        id: itemId,
        categoryId: finalCategoryId,
        ...cleanupParentFields(data, 'categoryId'),
      };

      await updateItem(body as ItemRequest & { id: string }).unwrap();
      router.push('/admin/items');
      toast.success('Товар успешно изменён');
    } catch (e) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  if (isLoading) return <Loading />;
  if (!item) return <NotFound message="Товар не найден" />;

  const chainDefaults = path
    .filter((cat) => cat.id !== 0)
    .reduce(
      (acc, node, index) => {
        const key = index === 0 ? 'categoryId' : `categoryId_${index}`;
        acc[key] = String(node.id);
        return acc;
      },
      {} as Record<string, string>,
    );

  const defaultValues = {
    name: item.name,
    price: item.price,
    shortDesc: item.short_desc,
    desc: item.desc,
    brandId: item.brand_id + '',
    images: item.images,
    ...chainDefaults,
  };

  return (
    <>
      <span className="text-2xl font-medium">Редактирование товара</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithOptions}
          defaultValues={defaultValues}
          schema={itemsForm.schema}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </>
  );
};

export default Page;
