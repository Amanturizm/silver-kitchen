import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const defaultBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
  });
