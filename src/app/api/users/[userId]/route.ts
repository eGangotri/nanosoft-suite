import { userSchema } from '@/components/users/schema'
import nanosoftPrisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId
    console.log('userId:', userId)
    const user = await nanosoftPrisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        tenantId: true,
        Tenant: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formattedUser = {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      tenantName: user.Tenant.name,
    }

    return NextResponse.json(formattedUser)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId
    const body = await request.json()

    // Validate the request body
    const validatedData = userSchema.parse(body) as any

    // If a new password is provided, you should hash it here
    // For example: if (validatedData.password) validatedData.password = await bcrypt.hash(validatedData.password, 10)

    const updatedUser = await nanosoftPrisma.user.update({
      where: { id: userId },
      data: validatedData,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        tenantId: true,
        Tenant: {
          select: {
            name: true,
          },
        },
      },
    })

    const formattedUser = {
      ...updatedUser,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
      tenantName: updatedUser.Tenant.name,
    }

    return NextResponse.json(formattedUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

