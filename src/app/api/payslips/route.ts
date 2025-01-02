import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  try {
    let payslips;

    if (year && month) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);

      payslips = await prisma.payslip.findMany({
        where: {
          payPeriod: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          payPeriod: 'desc',
        },
      });
    } else {
      payslips = await prisma.payslip.findMany({
        orderBy: {
          payPeriod: 'desc',
        },
      });
    }

    return NextResponse.json(payslips);
  } catch (error) {
    console.error('Error fetching payslips:', error);
    return NextResponse.json({ error: 'Failed to fetch payslips' }, { status: 500 });
  }
}

