import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/utils/email'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // We don't want to reveal if a user exists or not, so we'll always return a success message
    return NextResponse.json({ message: 'If an account with that email exists, we have sent a password reset link.' })
  }

  // Generate a password reset token
  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  })

  // Send the password reset email
  await sendPasswordResetEmail(user.email!, resetToken)

  return NextResponse.json({ message: 'If an account with that email exists, we have sent a password reset link.' })
}