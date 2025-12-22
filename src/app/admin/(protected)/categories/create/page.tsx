'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from '@/features/categories/categoriesApiSlice';
import { useRouter } from 'next/navigation';
import { useDynamicChainSelect } from '@/widgets/ui/DynamicForm/configs/hooks';
import { cleanupParentFields, extractFinalParentId } from '@/widgets/ui/DynamicForm/configs/utils';

const Page = () => {
  const router = useRouter();
  const [createCategory] = useCreateCategoryMutation();
  const { data: categories } = useGetCategoriesQuery();
  const categoriesForm = FORM_PROPS.find((f) => f.entity === 'categories');

  const fieldsWithOptions = useDynamicChainSelect(
    categoriesForm?.fields || [],
    categories || [],
    'parentId',
  );

  if (!categoriesForm) return null;

  const handleSubmit = async (data: typeof categoriesForm.defaultValues) => {
    try {
      const finalParentId = extractFinalParentId(data, 'parentId');

      const body: any = {
        ...cleanupParentFields(data, 'parentId'),
        parentId: finalParentId,
        image: data.image?.[0],
      };

      await createCategory(body).unwrap();
      router.push('/admin/categories?parentId=' + body.parentId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <span className="text-2xl font-medium">Создание категории</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithOptions}
          defaultValues={categoriesForm.defaultValues}
          schema={categoriesForm.schema}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Page;
