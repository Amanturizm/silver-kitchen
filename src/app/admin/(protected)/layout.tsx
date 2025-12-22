import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppLayoutAdmin } from '@/widgets/layout-admin';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) redirect('/admin/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_TEST_API}/api/auth/me`, {
    method: 'GET',
    headers: {
      cookie: `access_token=${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) redirect('/admin/login');

  return <AppLayoutAdmin>{children}</AppLayoutAdmin>;
}
