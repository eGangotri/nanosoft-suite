import { NextRequest, NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';
import { employeeHrDetailsSchema } from '@/components/employee/details/hr/constants';


export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  try {
    const body = await request.json();
    const validatedData = employeeHrDetailsSchema.parse(body);

    if (id === 0) {
      // Create new entry
      const newEmployeeHrDetails = await nanosoftPrisma.employeeHrDetails.create({
        data: validatedData,
      });
      return NextResponse.json(newEmployeeHrDetails, { status: 201 });
    } else {
      // Update existing entry
      const updatedEmployeeHrDetails = await nanosoftPrisma.employeeHrDetails.update({
        where: { id },
        data: validatedData,
      });
      return NextResponse.json(updatedEmployeeHrDetails);
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation Error', details: error.errors }, { status: 400 });
    }
    console.error('Error updating employee HR details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

