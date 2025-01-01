import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || '');
  const month = parseInt(searchParams.get('month') || '');

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const payslips = await prisma.payslip.findMany({
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

    return NextResponse.json(payslips);
  } catch (error) {
    console.error('Error fetching payslips:', error);
    return NextResponse.json({ error: 'Failed to fetch payslips' }, { status: 500 });
  }
}

