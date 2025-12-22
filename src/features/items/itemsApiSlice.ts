import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { Item, ItemRequest, ItemsFilter, SearchResponse } from '@/features/items/types';
import { buildFormData } from '@/shared/constants';

export const itemsApiSlice = createApi({
  reducerPath: 'itemsApi',
  baseQuery: defaultBaseQuery(),
  endpoints: (builder) => ({
    getItems: builder.query<SearchResponse<Item>, ItemsFilter | void>({
      query: (filter: ItemsFilter = {}) => ({
        url: Path.Items.search(filter),
        method: 'GET',
      }),
    }),

    getItem: builder.query<Item, string>({
      query: (id: string) => ({
        url: Path.Items.get(id),
        method: 'GET',
      }),
    }),

    createItem: builder.mutation<Item, ItemRequest>({
      query: (body) => {
        const formData = buildFormData(body);

        return {
          url: Path.Items.create,
          method: 'POST',
          body: formData,
        };
      },
    }),

    updateItem: builder.mutation<Item, ItemRequest & { id: string }>({
      query: ({ id, ...body }) => {
        const formData = buildFormData(body);

        return {
          url: Path.Items.update(id),
          method: 'PUT',
          body: formData,
        };
      },
    }),

    deleteItem: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Path.Items.delete(id),
        method: 'DELETE',
      }),
    }),

    deleteItemImage: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Path.Items.deleteImage(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useDeleteItemImageMutation,
} = itemsApiSlice;
