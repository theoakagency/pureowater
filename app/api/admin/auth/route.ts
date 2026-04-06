import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.isLoggedIn = true
  session.username = username
  await session.save()

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
  return NextResponse.json({ success: true })
}
