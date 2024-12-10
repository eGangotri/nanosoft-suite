import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leaveBalances = await prisma.employeeLeaveBalance.findMany({
      include: {
        employee: {
          select: {
            name: true,
          },
        },
        leaveType: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedLeaveBalances = leaveBalances.map((balance) => ({
      id: balance.id,
      employeeId: balance.employeeId,
      leaveTypeId: balance.leaveTypeId,
      totalEntitlement: balance.totalEntitlement,
      usedDays: balance.usedDays,
      remainingDays: balance.totalEntitlement - balance.usedDays,
      employeeName: balance.employee.name,
      leaveTypeName: balance.leaveType.name,
    }));

    return NextResponse.json(formattedLeaveBalances);
  } catch (error) {
    console.error('Error fetching employee leave balances:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

