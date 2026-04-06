import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin/dashboard and any deeper admin routes
  if (pathname.startsWith('/admin/dashboard')) {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    )

    if (!session.isLoggedIn) {
      const loginUrl = new URL('/admin', req.url)
      loginUrl.searchParams.set('redirected', '1')
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
