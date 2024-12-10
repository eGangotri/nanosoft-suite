import { NextRequest, NextResponse } from 'next/server'
import nanosoftPrisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  const employeeId = parseInt(params.employeeId);
  try {
    if (employeeId === 0) {
      // For new entry, return empty data
      return NextResponse.json({});
    }
    const workHistories = await nanosoftPrisma.employeeWorkHistory.findMany({
      where: { employeeId: employeeId },
      include: {
        Employee: true,
      }
    });

    if (!workHistories) {
      return NextResponse.json({ error: 'Employee HR Details not found' }, { status: 404 });
    }

    return NextResponse.json(workHistories);
  } catch (error) {
    console.error('Error fetching employee HR details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
