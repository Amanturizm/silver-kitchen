import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { BrandRequest, BrandsItem } from '@/features/brands/types';

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

    createBrand: builder.mutation<BrandsItem, BrandRequest>({
      query: (body) => {
        const formData = new FormData();

        for (const key of Object.keys(body)) {
          const value = body[key];
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        }

        return {
          url: Path.Brands.create,
          method: 'POST',
          credentials: 'include',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetBrandsQuery, useCreateBrandMutation } = brandsApiSlice;
