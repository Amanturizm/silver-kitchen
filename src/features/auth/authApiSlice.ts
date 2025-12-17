import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { LoginRequest, LoginResponse } from '@/features/auth/types';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: defaultBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: Path.Auth.login,
        method: 'POST',
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: Path.Auth.logout,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation
} = authApiSlice;
