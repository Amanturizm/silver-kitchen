import { AppLayoutAdmin } from '@/widgets/layout-admin';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const cookieHeader = h.get('cookie');

  if (!cookieHeader || !cookieHeader.includes('access_token')) {
    redirect('/admin/login');
  }

  const protocol = h.get('x-forwarded-proto') ?? 'https';
  const host = h.get('host');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/auth/me`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    if (res.status === 401) {
      (await cookies()).delete('access_token');
    }
    redirect('/admin/login');
  }

  return <AppLayoutAdmin>{children}</AppLayoutAdmin>;
}
