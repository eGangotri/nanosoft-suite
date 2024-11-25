import { NextRequest, NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';
import { employeeHrDetailsSchema } from '@/components/employee/details/hr/constants';

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    const validatedData = employeeHrDetailsSchema.parse(body);

    // Create new entry
    const newEmployeeHrDetails = await nanosoftPrisma.employeeHrDetails.create({
      data: validatedData,
    });
    return NextResponse.json(newEmployeeHrDetails, { status: 201 });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation Error', details: error.errors }, { status: 400 });
    }
    console.error('Error updating employee HR details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

