import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { Item } from '@/features/items/types';
import Image from 'next/image';
import { BASE_URL } from '@/shared/constants';

export const itemsTableConfig: TableConfig<Item> = {
  rowKey: (row) => row.id + '',
  emptyText: 'Товаров нет',
  pageName: 'items',

  columns: [
    {
      key: 'images',
      title: 'Фото',
      render: (row) => {
        const img = row.images?.[0];

        return img ? (
          <Image
            src={`${BASE_URL}/uploads${img.path}/${img.name}`}
            alt=""
            width={60}
            height={40}
            className="w-[60px] h-[40px] object-contain"
            unoptimized
          />
        ) : (
          <div className="w-[60px] h-[40px] bg-gray-200 rounded" />
        );
      },
    },
    {
      key: 'name',
      title: 'Название',
      render: (row) => row.name ?? '—',
    },
    {
      key: 'price',
      title: 'Цена',
      render: (row) => (row.price !== null ? `${row.price} сом` : '—'),
    },
    {
      key: 'category',
      title: 'Категория',
      render: (row) => row.category_name ?? '—',
    },
    {
      key: 'brand',
      title: 'Бренд',
      render: (row) => row.brand_name ?? '—',
    },
  ],
};
