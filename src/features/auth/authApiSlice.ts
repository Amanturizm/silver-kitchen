import { createApi } from '@reduxjs/toolkit/query/react';
import { Path } from '@/shared/path';
import { defaultBaseQuery } from '@/shared/api';
import { LoginRequest, LoginResponse, MeResponse } from '@/features/auth/types';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: defaultBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: Path.Auth.login,
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem('user', JSON.stringify(data));
        } catch {
          // nothing
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: Path.Auth.logout,
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('user');
        } catch {
          // nothing
        }
      },
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({
        url: Path.Auth.me,
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem('user', JSON.stringify(data.user));
        } catch {
          // nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApiSlice;
