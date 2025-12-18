import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children, params }: {
  children: React.ReactNode,
  params: { slug?: string }
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    redirect('/admin/login');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_TEST_API}/api/auth/me`, {
    method: 'GET',
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    cache: 'no-store',
  });

  if (res.ok && typeof slug === undefined) redirect('/admin/items');

  return children;
}
