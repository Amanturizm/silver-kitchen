'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useCreateBrandMutation } from '@/features/brands/brandsApiSlice';
import { BrandRequest } from '@/features/brands/types';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [createBrand] = useCreateBrandMutation();

  const brandForm = FORM_PROPS.find((f) => f.entity === 'brands');

  if (!brandForm) return null;

  const handleSubmit = async (data: typeof brandForm.defaultValues) => {
    try {
      const body = {
        ...data,
        image: data.image?.[0],
      };

      await createBrand(body as BrandRequest).unwrap();
      router.push('/admin/brands');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <span className="text-2xl font-medium">Создание бренда</span>

      <div className="mt-4">
        <DynamicForm
          fields={brandForm.fields}
          defaultValues={brandForm.defaultValues}
          schema={brandForm.schema}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Page;
