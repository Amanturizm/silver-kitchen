import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { CategoriesItem } from '@/features/categories/types';

export const categoriesApiSlice = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: defaultBaseQuery(),
  endpoints: builder => ({
    getCategories: builder.query<CategoriesItem[], void>({
      query: () => ({
        url: Path.Categories.search(null),
        method: 'GET'
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
