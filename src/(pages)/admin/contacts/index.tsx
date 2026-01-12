'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddButton from '@/widgets/ui/AddButton';
import DynamicTable from '@/widgets/ui/DynamicTable';
import Pagination from '@/widgets/ui/Pagination';
import { toast } from 'sonner';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '@/features/contacts/contactsApiSlice';
import { contactsTableConfig } from '@/widgets/ui/DynamicTable/configs/contacts';

const Contacts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useGetContactsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  }, [isError]);

  const [deleteContact] = useDeleteContactMutation();

  const limit = 10;

  const pagedData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  }, [data, page, limit]);

  const totalPages = Math.ceil(data.length / limit);

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, data.length);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
      refetch();
      toast.success('Контакт успешно удалён');
    } catch {
      toast.error('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="text-xl sm:text-2xl font-medium">Контакты</span>
        <AddButton to="/admin/contacts/create" content="Создать контакт" />
      </div>

      <DynamicTable
        queryResult={{ data: pagedData, isLoading }}
        config={{
          ...contactsTableConfig,
          onRowClick: (row) => router.push(`/admin/contacts/${row.id}`),
        }}
        deleteQuery={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-gray-600 font-sans">
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />

          <span className="text-xs sm:text-sm">
            Показано {startItem}–{endItem} из {data.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default Contacts;
