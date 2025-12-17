import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
  //   const cookie = req.cookies.get('access_token');
  //
  //   if (!cookie) {
  //     url.pathname = '/admin/login';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
