import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { BrandsItem } from '@/features/brands/types';

export const brandsApiSlice = createApi({
  reducerPath: 'brandsApi',
  baseQuery: defaultBaseQuery(),
  endpoints: builder => ({
    getBrands: builder.query<BrandsItem[], void>({
      query: () => ({
        url: Path.Brands.fetchAll,
        method: 'GET'
      }),
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApiSlice;
