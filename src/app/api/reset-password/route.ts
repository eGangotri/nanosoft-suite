import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import nanosoftPrisma from '@/lib/prisma'


export async function POST(req: Request) {
  const body = await req.json()
  const { token, password } = body

  if (!token || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const user = await nanosoftPrisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await nanosoftPrisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })

  return NextResponse.json({ message: 'Password reset successfully' })
}