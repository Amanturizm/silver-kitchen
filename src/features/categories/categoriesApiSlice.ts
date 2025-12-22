import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { CategoriesItem, CategoryRequest } from '@/features/categories/types';
import { buildFormData } from '@/shared/constants';

export const categoriesApiSlice = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: defaultBaseQuery(),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesItem[], number | void>({
      query: (parentId) => ({
        url: Path.Categories.search(parentId || null),
        method: 'GET',
      }),
    }),

    getCategory: builder.query<CategoriesItem, string>({
      query: (id: string) => ({
        url: Path.Categories.get(id),
        method: 'GET',
      }),
    }),

    createCategory: builder.mutation<CategoriesItem, CategoryRequest>({
      query: (body) => {
        const formData = buildFormData(body);

        return {
          url: Path.Categories.create,
          method: 'POST',
          body: formData,
        };
      },
    }),

    updateCategory: builder.mutation<CategoriesItem, CategoryRequest & { active: string }>({
      query: ({ id, ...body }) => {
        const formData = buildFormData(body);

        return {
          url: Path.Categories.update(id || ''),
          method: 'PUT',
          body: formData,
        };
      },
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id: string) => ({
        url: Path.Categories.delete(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
