'use server';

import React from 'react';
import LoginPage from '@/(pages)/admin/login';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) redirect('/admin/items');

  return <LoginPage />;
};

export default Page;
