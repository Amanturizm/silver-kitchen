'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) return redirect('/admin/items');
  return redirect('/admin/login');
}
