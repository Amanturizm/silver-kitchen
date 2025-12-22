import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { BrandRequest, BrandsItem } from '@/features/brands/types';
import { buildFormData } from '@/shared/constants';

export const brandsApiSlice = createApi({
  reducerPath: 'brandsApi',
  baseQuery: defaultBaseQuery(),
  endpoints: (builder) => ({
    getBrands: builder.query<BrandsItem[], void>({
      query: () => ({
        url: Path.Brands.fetchAll,
        method: 'GET',
      }),
    }),

    getBrand: builder.query<BrandsItem, string>({
      query: (id: string) => ({
        url: Path.Brands.get(id),
        method: 'GET',
      }),
    }),

    createBrand: builder.mutation<BrandsItem, BrandRequest>({
      query: (body) => {
        const formData = buildFormData(body);

        return {
          url: Path.Brands.create,
          method: 'POST',
          body: formData,
        };
      },
    }),

    updateBrand: builder.mutation<BrandsItem, BrandRequest>({
      query: ({ id, ...body }) => {
        const formData = buildFormData(body);

        return {
          url: Path.Brands.update(id || ''),
          method: 'PUT',
          body: formData,
        };
      },
    }),

    deleteBrand: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Path.Brands.delete(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApiSlice;
