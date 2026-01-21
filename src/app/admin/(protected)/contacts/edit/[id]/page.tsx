'use client';

import React from 'react';
import { DynamicForm } from '@/widgets/ui/DynamicForm';
import { FORM_PROPS } from '@/widgets/ui/DynamicForm/configs/form-fields';
import { useGetContactQuery, useUpdateContactMutation } from '@/features/contacts/contactsApiSlice';
import { ContactRequest } from '@/features/contacts/types';
import { useParams, useRouter } from 'next/navigation';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { toast } from 'sonner';
import * as yup from 'yup';

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
      const isAddressString = typeof data.address === 'string';

      const body = {
        ...data,
        id: contactId,
        addressText: isAddressString ? data.address : data.address.addressText,
        lat: isAddressString ? null : data.address.lat,
        lng: isAddressString ? null : data.address.lng,
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

  const isMainCity = contact?.city === 'Главная';

  const defaultValues = {
    phoneNumber1: contact?.phone_number_1 || '',
    phoneNumber2: contact?.phone_number_2 || '',
    whatsappNumber: contact?.whatsapp_number || '',
    instagramLink: contact?.instagram_link || '',
    lalafoLink: contact?.lalafo_link || '',
    houseNumber: contact?.house_number || '',

    city: contact?.city || '',
    street: contact?.street || '',
    email: contact?.email || '',
    address: isMainCity
      ? contact?.address_text || ''
      : {
          addressText: contact?.address_text || '',
          lat: contact?.lat || '',
          lng: contact?.lng || '',
        },

    active: String(contact?.active || 0),
  };

  const fieldsWithAddressType = contactForm.fields.map((field) =>
    field.name === 'address' && isMainCity ? { ...field, type: 'textEditor' as const } : field,
  );

  const fieldsWithActiveSelect = fieldsWithAddressType.toSpliced(fieldsWithAddressType.length, 0, {
    name: 'active',
    label: 'Статус',
    type: 'select',
    required: false,
    options: [
      { label: 'Активен', value: '1' },
      { label: 'Неактивен', value: '0' },
    ],
  });

  const schema = isMainCity
    ? contactForm.schema.shape({ address: yup.string().nullable() })
    : contactForm.schema;

  return (
    <>
      <span className="text-2xl font-medium">Редактирование контакта</span>

      <div className="mt-4">
        <DynamicForm
          fields={fieldsWithActiveSelect}
          defaultValues={defaultValues}
          schema={schema}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </>
  );
};

export default Page;
