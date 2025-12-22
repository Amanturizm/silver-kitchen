'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useGetBrandQuery, useUpdateBrandMutation } from '@/features/brands/brandsApiSlice';
import { BrandRequest } from '@/features/brands/types';
import { useParams, useRouter } from 'next/navigation';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const brandId = params.id as string;

  const { data: brand, isLoading } = useGetBrandQuery(brandId);
  const [updateBrand] = useUpdateBrandMutation();

  const brandForm = FORM_PROPS.find((f) => f.entity === 'brands');
  if (!brandForm) return null;

  const handleSubmit = async (data: typeof brandForm.defaultValues) => {
    try {
      const body = {
        ...data,
        id: brandId,
        image: data.image?.[0],
      };

      await updateBrand(body as BrandRequest).unwrap();
      router.push('/admin/brands');
      toast.success('Бренд успешно изменён');
    } catch (e) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  if (isLoading) return <Loading />;
  if (!brand) return <NotFound message="Бренд не найден" />;

  const defaultValues = {
    name: brand.name,
    desc: brand.description,
    image: [brand.img],
  };

  return (
    <>
      <span className="text-2xl font-medium">Редактирование бренда</span>

      <div className="mt-4">
        <DynamicForm
          fields={brandForm.fields}
          defaultValues={defaultValues}
          schema={brandForm.schema}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </>
  );
};

export default Page;
