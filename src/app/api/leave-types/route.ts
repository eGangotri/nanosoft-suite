import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import nanosoftPrisma from '@/lib/prisma'
import { leaveTypeSchema } from '@/components/leaves-type/constants'
import { z } from 'zod'

export async function GET() {
  try {
    const leaveTypes = await nanosoftPrisma.leave_Type.findMany()
    return NextResponse.json(leaveTypes)
  } catch (error) {
    console.error('Error fetching leave types:', error)
    return NextResponse.json({ message: 'Error fetching leave types' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leaveTypeSchema.parse(body)
    
    const newLeaveType = await nanosoftPrisma.leave_Type.create({
      data: validatedData
    })
    return NextResponse.json(newLeaveType, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'A leave type with this name or leave code already exists' }, { status: 409 })
      }
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 })
    }
    console.error('Error creating leave type:', error)
    return NextResponse.json({ message: 'Error creating leave type' }, { status: 500 })
  }
}