'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useRouter } from 'next/navigation';
import { useCreateItemMutation } from '@/features/items/itemsApiSlice';
import { ItemRequest } from '@/features/items/types';
import {
  useDynamicChainSelect,
  useDynamicPlainSelect,
} from '@/widgets/ui/DynamicForm/configs/hooks';
import { cleanupParentFields, extractFinalParentId } from '@/widgets/ui/DynamicForm/configs/utils';
import { useGetBrandsQuery } from '@/features/brands/brandsApiSlice';
import { useGetCategoriesQuery } from '@/features/categories/categoriesApiSlice';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const [createItem] = useCreateItemMutation();
  const itemsForm = FORM_PROPS.find((f) => f.entity === 'items');

  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();

  const fieldsWithBrandsOptions = useDynamicPlainSelect(
    itemsForm?.fields || [],
    brands || [],
    'brandId',
  );

  const fieldsWithOptions = useDynamicChainSelect(
    fieldsWithBrandsOptions || [],
    categories || [],
    'categoryId',
  );

  if (!itemsForm) return null;

  const handleSubmit = async (data: typeof itemsForm.defaultValues) => {
    try {
      const finalCategoryId = extractFinalParentId(data, 'categoryId');

      const body: any = {
        ...cleanupParentFields(data, 'categoryId'),
        categoryId: finalCategoryId,
        images: data.images,
      };

      await createItem(body as ItemRequest).unwrap();
      router.push('/admin/items');
      toast.success('Товар успешно создан');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <>
      <span className="text-2xl font-medium">Создание товара</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithOptions}
          defaultValues={itemsForm.defaultValues}
          schema={itemsForm.schema}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Page;
