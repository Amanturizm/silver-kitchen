import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { CategoriesItem } from '@/features/categories/types';

export const categoriesTableConfig: TableConfig<CategoriesItem> = {
  rowKey: (row) => row.id + '',
  emptyText: 'Категорий нет',
  pageName: 'categories',

  columns: [
    {
      key: 'name',
      title: 'Название',
    },
    {
      key: 'parent_id',
      title: 'Родитель',
      render: (row) => (row.parent_id ? row.parent_id : '—'),
    },
    {
      key: 'queue',
      title: 'Очередь',
      render: (row) => row.queue ?? '—',
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
