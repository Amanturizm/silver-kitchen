'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useCreateContactMutation } from '@/features/contacts/contactsApiSlice';
import { ContactRequest } from '@/features/contacts/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const [createContact] = useCreateContactMutation();

  const contactForm = FORM_PROPS.find((f) => f.entity === 'contacts');

  if (!contactForm) return null;

  const handleSubmit = async (data: typeof contactForm.defaultValues) => {
    try {
      const body = {
        ...data,
        addressText: data.address.addressText,
        lat: data.address.lat,
        lng: data.address.lng,
        address: null,
      };

      await createContact(body as ContactRequest).unwrap();
      router.push('/admin/contacts');
      toast.success('Контакт успешно создан');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <>
      <span className="text-2xl font-medium">Создание контакта</span>

      <div className="mt-4">
        <DynamicForm
          fields={contactForm.fields}
          defaultValues={contactForm.defaultValues}
          schema={contactForm.schema}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Page;
