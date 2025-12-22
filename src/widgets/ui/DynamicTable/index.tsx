'use client';

import React, { useEffect, useState } from 'react';
import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { useRouter } from 'next/navigation';
import { Pencil, Settings2, Trash, View } from 'lucide-react';
import { Loading, NotFound } from '@/widgets/ui/Message';

interface QueryResult<T> {
  data?: T[];
  isLoading: boolean;
}

interface Props<T> {
  queryResult: QueryResult<T>;
  config: TableConfig<T>;
}

const DynamicTable = <T,>({ queryResult, config }: Props<T>) => {
  const router = useRouter();
  const { data = [], isLoading } = queryResult;
  const [openRow, setOpenRow] = useState<string | number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.row-action-menu')) {
        setOpenRow(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="rounded-md border border-gray-300 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr className="rounded-md">
            {config.columns.map((col, i) => (
              <th key={String(col.key)} className={'px-4 py-3' + (i === 0 ? ' rounded-tl-md' : '')}>
                {col.title}
              </th>
            ))}
            <th className="px-4 py-3 text-center rounded-tr-md">Действия</th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={config.columns.length + 1} className="px-4 py-4 text-gray-500">
                <Loading style={{ justifyContent: 'center' }} />
              </td>
            </tr>
          )}

          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={config.columns.length + 1} className="px-4 py-4 text-gray-500">
                <NotFound
                  message={config.emptyText ?? 'Данных нет'}
                  style={{ color: 'gray', justifyContent: 'center' }}
                />
              </td>
            </tr>
          )}

          {data.map((row) => {
            const rowKey = config.rowKey(row);
            const isOpen = openRow === rowKey;

            return (
              <tr key={rowKey} className="h-[40px] border-t border-gray-300 font-sans">
                {config.columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-1">
                    {col.render ? col.render(row) : String((row as any)[col.key])}
                  </td>
                ))}

                <td className="px-4 py-2 text-center relative">
                  <div className="relative inline-block">
                    <button
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer row-action-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRow(isOpen ? null : rowKey);
                      }}
                    >
                      <Settings2 size={18} />
                    </button>

                    {isOpen && (
                      <div
                        className="absolute right-0 top-full mt-1 bg-white z-10 rounded-md shadow-lg min-w-[190px] whitespace-nowrap overflow-hidden row-action-menu"
                        onMouseEnter={(e) => e.stopPropagation()}
                        onMouseLeave={(e) => e.stopPropagation()}
                      >
                        <button
                          className="w-full text-left px-3 py-2 text-md hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/${config.pageName}/edit/${rowKey}`);
                          }}
                        >
                          <Pencil size={16} />
                          Редактировать
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-md hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/${config.pageName}/${rowKey}`);
                          }}
                        >
                          <View size={16} />
                          Подробный просмотр
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-md hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/${config.pageName}/${rowKey}`);
                          }}
                        >
                          <Trash size={16} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
