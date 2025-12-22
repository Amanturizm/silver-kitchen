'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useParams, useRouter } from 'next/navigation';
import { Loading, NotFound } from '@/widgets/ui/Message';
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '@/features/categories/categoriesApiSlice';
import { CategoryRequest } from '@/features/categories/types';
import { useDynamicChainSelect } from '@/widgets/ui/DynamicForm/configs/hooks';
import { findPath } from '@/shared/constants';
import { TreeNode } from '@/widgets/ui/DynamicForm/configs/types';
import { cleanupParentFields, extractFinalParentId } from '@/widgets/ui/DynamicForm/configs/utils';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const { data: categories } = useGetCategoriesQuery();
  const { data: category, isLoading } = useGetCategoryQuery(categoryId, {
    refetchOnMountOrArgChange: true,
  });

  const [updateCategory] = useUpdateCategoryMutation();

  const categoriesForm = FORM_PROPS.find((f) => f.entity === 'categories');

  const path = category?.parent_id ? findPath(categories as TreeNode[], category.parent_id) : [];

  const fieldsWithOptions = useDynamicChainSelect(
    categoriesForm?.fields || [],
    path,
    'parentId',
    categories || [],
    categoryId,
    true,
  ).with(-1, {
    name: 'active',
    label: 'Статус',
    type: 'select',
    options: [
      { label: 'Активен', value: '1' },
      { label: 'Неактивен', value: '0' },
    ],
  });

  if (!categoriesForm) return null;

  const handleSubmit = async (data: typeof categoriesForm.defaultValues) => {
    try {
      const image = typeof data.image?.[0] === 'string' ? null : data.image?.[0];

      const finalParentId = extractFinalParentId(data, 'parentId');

      const body = {
        id: categoryId,
        ...cleanupParentFields(data, 'parentId'),
        parentId: finalParentId,
        image,
      } as CategoryRequest & { active: string };

      await updateCategory(body).unwrap();
      router.push('/admin/categories?parentId=' + body.parentId);
      toast.success('Категория успешно изменена');
    } catch (e) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  if (isLoading) return <Loading />;
  if (!category) return <NotFound message="Категория не найдена" />;

  const chainDefaults = path.reduce(
    (acc, node, index) => {
      const key = index === 0 ? 'parentId' : `parentId_${index}`;
      acc[key] = String(node.id);
      return acc;
    },
    {} as Record<string, string>,
  );

  const defaultValues = {
    name: category.name,
    queue: category.queue,
    image: [category.image],
    active: category.active + '',
    ...chainDefaults,
  };

  return (
    <>
      <span className="text-2xl font-medium">Редактирование категории</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithOptions}
          defaultValues={defaultValues}
          schema={categoriesForm.schema}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </>
  );
};

export default Page;
