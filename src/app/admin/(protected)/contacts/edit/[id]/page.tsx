'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useGetContactQuery, useUpdateContactMutation } from '@/features/contacts/contactsApiSlice';
import { ContactRequest } from '@/features/contacts/types';
import { useParams, useRouter } from 'next/navigation';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { toast } from 'sonner';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const contactId = params.id as string;

  const { data: contact, isLoading } = useGetContactQuery(contactId);
  const [updateContact] = useUpdateContactMutation();

  const contactForm = FORM_PROPS.find((f) => f.entity === 'contacts');
  if (!contactForm) return null;

  const handleSubmit = async (data: typeof contactForm.defaultValues) => {
    try {
      const body = {
        ...data,
        id: contactId,
        addressText: data.address.addressText,
        lat: data.address.lat,
        lng: data.address.lng,
        address: null,
        main: contact?.main === 1 ? 1 : 0,
      };

      await updateContact(body as ContactRequest & { id: string }).unwrap();
      router.push('/admin/contacts');
      toast.success('Контакт успешно изменён');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  if (isLoading) return <Loading />;
  if (!contact) return <NotFound message="Контакт не найден" />;

  const defaultValues: ContactRequest = {
    phoneNumber1: contact?.phone_number_1 || '',
    phoneNumber2: contact?.phone_number_2 || '',
    whatsappNumber: contact?.whatsapp_number || '',
    instagramLink: contact?.instagram_link || '',
    lalafoLink: contact?.lalafo_link || '',
    houseNumber: contact?.house_number || '',

    city: contact?.city || '',
    street: contact?.street || '',
    email: contact?.email || '',
    address: {
      addressText: contact?.address_text || '',
      lat: contact?.lat || '',
      lng: contact?.lng || '',
    },

    active: String(contact?.active || 0),
  };

  const fieldsWithActiveSelect = contactForm.fields.toSpliced(contactForm.fields.length, 0, {
    name: 'active',
    label: 'Статус',
    type: 'select',
    required: false,
    options: [
      { label: 'Активен', value: '1' },
      { label: 'Неактивен', value: '0' },
    ],
  });

  return (
    <>
      <span className="text-2xl font-medium">Редактирование контакта</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithActiveSelect}
          defaultValues={defaultValues}
          schema={contactForm.schema}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </>
  );
};

export default Page;
