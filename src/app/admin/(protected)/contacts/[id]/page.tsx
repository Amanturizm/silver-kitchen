'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DynamicDetailView } from '@/widgets/ui/DynamicDetailView';
import { useGetContactQuery } from '@/features/contacts/contactsApiSlice';
import { Loading, NotFound } from '@/widgets/ui/Message';

const Page = () => {
  const params = useParams();
  const contactId = params.id as string;

  const { data: contact, isLoading } = useGetContactQuery(contactId);

  const values = contact && {
    ...contact,
    active: contact.active ? 'Активен' : 'Неактивен',
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium">Подробный просмотр</span>
      {isLoading ? (
        <Loading />
      ) : !contact ? (
        <NotFound message="Контакт не найден" />
      ) : (
        values && (
          <DynamicDetailView
            data={values}
            config={{
              columns: [
                { key: 'city', title: 'Город' },

                {
                  key: 'phone_number_1',
                  title: 'Телефон 1',
                  visible: (d) => !!d.phone_number_1,
                },
                {
                  key: 'phone_number_2',
                  title: 'Телефон 2',
                  visible: (d) => !!d.phone_number_2,
                },
                {
                  key: 'whatsapp_number',
                  title: 'WhatsApp',
                  visible: (d) => !!d.whatsapp_number,
                },

                {
                  key: 'instagram_link',
                  title: 'Instagram',
                  value: (d) =>
                    d.instagram_link && (
                      <a
                        href={d.instagram_link}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {d.instagram_link}
                      </a>
                    ),
                },

                {
                  key: 'lalafo_link',
                  title: 'Lalafo',
                  value: (d) =>
                    d.lalafo_link && (
                      <a href={d.lalafo_link} target="_blank" className="text-blue-600 underline">
                        {d.lalafo_link}
                      </a>
                    ),
                },

                { key: 'email', title: 'Email' },
                { key: 'address_text', title: 'Адрес (текст)' },
                { key: 'street', title: 'Улица' },
                { key: 'house_number', title: 'Дом' },

                {
                  key: 'active',
                  title: 'Статус',
                  format: (v) => (v ? 'Активен' : 'Неактивен'),
                },
              ],
            }}
          />
        )
      )}
    </div>
  );
};

export default Page;
