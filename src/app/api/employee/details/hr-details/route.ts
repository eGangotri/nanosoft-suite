import { NextRequest, NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';
import { employeeHrDetailsSchema } from '@/components/employee/details/hr/constants';

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    if (body.employee) {
      delete body.employee;
    }
    const clientIds = body.clientIds;
    delete body.clientIds;
    //const validatedData = employeeHrDetailsSchema.parse(body);
    const result = employeeHrDetailsSchema.safeParse(body)

    // Create new entry
    const newEmployeeHrDetails = await nanosoftPrisma.employeeHrDetails.create({
      data: {
        ...result.data,
        EmployeeHrDetailsClients: {
          create: clientIds.map((clientId: number) => ({
            clientId,
            assignedDate: new Date(),
          })),
        }
      },
        include: {
          EmployeeHrDetailsClients: {
            include: {
              Client: true,
            },
          },
        }
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

