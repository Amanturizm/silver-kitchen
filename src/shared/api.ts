import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  credentials: 'include',
});

export const defaultBaseQuery = (): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { error } = result;
    if (error.status === 'PARSING_ERROR' && typeof error.data === 'string') {
      return {
        error: {
          status: error.originalStatus,
          data: { message: error.data },
        },
      };
    }
  }

  return result;
};
