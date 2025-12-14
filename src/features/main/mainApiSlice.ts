import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { GlobalSearchResponse } from '@/features/main/types';

export const mainApiSlice = createApi({
  reducerPath: 'mainApi',
  baseQuery: defaultBaseQuery(),
  endpoints: builder => ({
    globalSearch: builder.query<GlobalSearchResponse, string>({
      query: (searchText: string) => ({
        url: Path.Main.globalSearch(searchText),
        method: 'GET'
      }),
    }),
  }),
});

export const { useGlobalSearchQuery } = mainApiSlice;
