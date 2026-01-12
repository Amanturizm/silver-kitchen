'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TableConfig } from '@/widgets/ui/DynamicTable/types';
import { useRouter } from 'next/navigation';
import { Pencil, Settings2, Trash, View } from 'lucide-react';
import { Loading, NotFound } from '@/widgets/ui/Message';
import { AppModal } from '@/widgets/ui/AppModal';

interface QueryResult<T> {
  data?: T[];
  isLoading: boolean;
}

interface Props<T> {
  queryResult: QueryResult<T>;
  config: TableConfig<T>;
  deleteQuery?: (id: string) => Promise<void>;
}

const DynamicTable = <T,>({ queryResult, config, deleteQuery }: Props<T>) => {
  const router = useRouter();
  const { data = [], isLoading } = queryResult;
  const [openRow, setOpenRow] = useState<string | number | null>(null);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties | null>(null);
  const menuButtonRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const recalcMenuPosition = (rowKey: string | number) => {
    const button = menuButtonRef.current[rowKey];
    if (!button) return;

    const rect = button.getBoundingClientRect();

    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
      zIndex: 9999,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest('.row-action-menu') ||
        dropdownRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpenRow(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (openRow === null) return;
    recalcMenuPosition(openRow);

    const handleScroll = () => openRow && recalcMenuPosition(openRow);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [openRow]);

  const openModal = (id: string) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!currentId) return;
    try {
      setDeleting(true);
      await deleteQuery?.(currentId);
      setOpen(false);
      setCurrentId(null);
      setOpenRow(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white overflow-visible">
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr className="rounded-md">
              {config.columns.map((col, i) => (
                <th
                  key={String(col.key)}
                  className={
                    'px-2 sm:px-4 py-3 whitespace-nowrap' + (i === 0 ? ' rounded-tl-md' : '')
                  }
                >
                  {col.title}
                </th>
              ))}
              <th className="px-2 sm:px-4 py-3 text-center rounded-tr-md whitespace-nowrap">
                Действия
              </th>
            </tr>
          </thead>

          <tbody className="overflow-visible">
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
                    <td key={String(col.key)} className="px-2 sm:px-4 py-1 whitespace-nowrap">
                      {col.render ? col.render(row) : String((row as any)[col.key])}
                    </td>
                  ))}

                  <td className="px-2 sm:px-4 py-2 text-center">
                    <button
                      ref={(el) => {
                        menuButtonRef.current[rowKey] = el;
                      }}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer row-action-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenRow(isOpen ? null : rowKey);
                      }}
                    >
                      <Settings2 size={18} />
                    </button>

                    {isOpen &&
                      menuStyle &&
                      createPortal(
                        <div
                          ref={dropdownRef}
                          style={menuStyle}
                          className="bg-white rounded-md shadow-lg min-w-[190px] whitespace-nowrap overflow-hidden row-action-menu"
                        >
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
                              router.push(`/admin/${config.pageName}/edit/${rowKey}`);
                            }}
                          >
                            <Pencil size={16} />
                            Редактировать
                          </button>
                          {deleteQuery && (
                            <button
                              className="w-full text-left px-3 py-2 text-md hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(String(rowKey));
                                setOpenRow(null);
                              }}
                            >
                              <Trash size={16} />
                              Удалить
                            </button>
                          )}
                        </div>,
                        document.body,
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Подтвердите удаление"
        confirmText={deleting ? 'Удаление...' : 'Удалить'}
        cancelText="Отмена"
      >
        Вы точно хотите удалить этот элемент?
      </AppModal>
    </div>
  );
};

export default DynamicTable;
