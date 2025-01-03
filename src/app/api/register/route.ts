import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import nanosoftPrisma from '@/lib/prisma'


export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, password, role } = body

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const existingUser = await nanosoftPrisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await nanosoftPrisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    })

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 })
  }
}