import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppLayoutAdmin } from '@/widgets/layout-admin';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) return redirect('/admin/login');

  const h = await headers();
  const protocol = h.get('x-forwarded-proto') ?? 'http';
  const host = h.get('host');

  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/auth/me`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) return redirect('/admin/login');

  return <AppLayoutAdmin>{children}</AppLayoutAdmin>;
}
