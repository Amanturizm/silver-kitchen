import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) redirect('/admin/items');
  redirect('/admin/login');
}
