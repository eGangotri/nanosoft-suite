import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import prisma from '@/lib/prisma'
import { LeaveTypeSchema } from '@/lib/schemas';

export async function GET() {
  try {
    const leaveTypes = await prisma.leave_Type.findMany()
    return NextResponse.json(leaveTypes)
  } catch (error) {
    console.error('Error fetching leave types:', error)
    return NextResponse.json({ message: 'Error fetching leave types' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = LeaveTypeSchema.parse(body)
    
    const newLeaveType = await prisma.leave_Type.create({
      data: validatedData
    })
    return NextResponse.json(newLeaveType, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 })
    }
    console.error('Error creating leave type:', error)
    return NextResponse.json({ message: 'Error creating leave type' }, { status: 500 })
  }
}