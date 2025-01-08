import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nanosoftPrisma from '@/lib/prisma';

export async function GET() {
  try {
    const claims = await nanosoftPrisma.claim.findMany();
    return NextResponse.json(claims);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching claims' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, amount, description, date, tenantId } = await request.json();
    const claim = await nanosoftPrisma.claim.create({
      data: {
        employeeId,
        amount,
        description,
        date: new Date(date),
        tenantId
      },
    });
    return NextResponse.json(claim, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating claim' }, { status: 500 });
  }
}

