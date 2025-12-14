import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { Item, ItemsFilter, SearchResponse } from '@/features/items/types';

export const itemsApiSlice = createApi({
  reducerPath: 'itemsApi',
  baseQuery: defaultBaseQuery(),
  endpoints: builder => ({
    getItems: builder.query<SearchResponse<Item>, ItemsFilter>({
      query: (body: ItemsFilter) => ({
        url: Path.Items.search(body),
        method: 'GET'
      }),
    }),
  }),
});

export const { useGetItemsQuery } = itemsApiSlice;
