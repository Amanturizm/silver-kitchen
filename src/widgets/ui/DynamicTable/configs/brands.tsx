import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { BrandsItem } from '@/features/brands/types';
import Image from 'next/image';
import { BASE_URL } from '@/shared/constants';

export const brandsTableConfig: TableConfig<BrandsItem> = {
  rowKey: (row) => row.id,
  emptyText: 'Брендов нет',
  pageName: 'brands',

  columns: [
    {
      key: 'img',
      title: 'Лого',
      render: (row) =>
        row.img ? (
          <Image
            src={`${BASE_URL}/uploads/${row.img}`}
            alt=""
            width={60}
            height={40}
            className="w-[60px] h-[40px] object-contain"
            unoptimized
          />
        ) : (
          <div className="w-[60px] h-[40px] bg-gray-200 rounded" />
        ),
    },
    {
      key: 'name',
      title: 'Название',
    },
    {
      key: 'description',
      title: 'Описание',
      render: (row) => row.description || '—',
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
