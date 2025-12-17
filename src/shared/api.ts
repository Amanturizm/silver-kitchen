import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/shared/constants';

export const defaultBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  });