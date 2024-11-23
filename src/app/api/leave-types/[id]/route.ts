import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import nanosoftPrisma from '@/lib/prisma'
import { z } from 'zod'
import { leaveTypeSchema } from '@/components/leaves-type/constants'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = leaveTypeSchema.parse(body)
    
    const updatedLeaveType = await nanosoftPrisma.leave_Type.update({
      where: { id: Number(params.id) },
      data: validatedData
    })
    return NextResponse.json(updatedLeaveType)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'A leave type with this name or leave code already exists' }, { status: 409 })
      }
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 })
    }
    console.error('Error updating leave type:', error)
    return NextResponse.json({ message: 'Error updating leave type' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await nanosoftPrisma.leave_Type.delete({
      where: { id: Number(params.id) }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting leave type:', error)
    return NextResponse.json({ message: 'Error deleting leave type' }, { status: 500 })
  }
}