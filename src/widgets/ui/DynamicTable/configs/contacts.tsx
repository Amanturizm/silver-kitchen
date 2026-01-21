import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { Contact } from '@/features/contacts/types';

export const contactsTableConfig: TableConfig<Contact> = {
  rowKey: (row) => row.id + '',
  emptyText: 'Контактов нет',
  pageName: 'contacts',

  columns: [
    {
      key: 'city',
      title: 'Город',
    },
    {
      key: 'address_text',
      title: 'Адрес',
      render: (row) => row.address_text?.replace(/<[^>]+>/g, '') || '—',
    },
    {
      key: 'phone_number_1',
      title: 'Телефон 1',
      render: (row) => row.phone_number_1 || '—',
    },
    {
      key: 'whatsapp_number',
      title: 'WhatsApp номер',
      render: (row) => row.whatsapp_number || '—',
    },
    {
      key: 'active',
      title: 'Статус',
      render: (row) => (
        <span className={row.active ? 'text-green-600 font-medium' : 'text-gray-400'}>
          {row.active ? 'Активен' : 'Неактивен'}
        </span>
      ),
    },
  ],
};
