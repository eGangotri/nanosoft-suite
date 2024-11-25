import { NextRequest, NextResponse } from 'next/server'
import nanosoftPrisma from '@/lib/prisma';
import { employeeHrDetailsSchema } from '@/components/employee/details/hr/constants';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const employeeId = parseInt(params.id);
  try {
    if (employeeId === 0) {
      // For new entry, return empty data
      return NextResponse.json({});
    }
    const employeeHrDetails = await nanosoftPrisma.employeeHrDetails.findUnique({
      where: { id: employeeId },
      include: {
        client: true,
        employee: true
      }
    });

    if (!employeeHrDetails) {
      return NextResponse.json({ error: 'Employee HR Details not found' }, { status: 404 });
    }

    return NextResponse.json(employeeHrDetails);
  } catch (error) {
    console.error('Error fetching employee HR details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)
  const body = await request.json()
  const result = employeeHrDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  try {
    const updatedHRDetail = await nanosoftPrisma.employeeHrDetails.update({
      where: { employeeId: employeeId },
      data: result.data,
    })

    if (!updatedHRDetail.id) {
      return NextResponse.json({ error: 'Hr detail not found for this employee' }, { status: 404 })
    }

    // Fetch the updated record to return
    const fetchedHrDetail = await nanosoftPrisma.employeeHrDetails.findFirst({
      where: { employeeId: employeeId }
    })

    return NextResponse.json(fetchedHrDetail)
  } catch (error) {
    console.error('Error updating Hr detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id);
  try {
    const deletedHrDetail = await nanosoftPrisma.employeeHrDetails.delete({
      where: { employeeId: employeeId },
    })

    if (!deletedHrDetail) {
      return NextResponse.json({ error: 'Hr detail not found for this employee' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Hr detail deleted successfully' })
  } catch (error) {
    console.error('Error deleting Hr detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}