import nanosoftPrisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const claim = await nanosoftPrisma.claim.findUnique({
      where: { id: Number(params.id) },
    });
    if (claim) {
      return NextResponse.json(claim);
    } else {
      return NextResponse.json({ message: 'Claim not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching claim' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { employeeId, amount, description, date } = await request.json();
    const updatedClaim = await nanosoftPrisma.claim.update({
      where: { id: Number(params.id) },
      data: {
        employeeId,
        amount,
        description,
        date: new Date(date),
      },
    });
    return NextResponse.json(updatedClaim);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating claim' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await nanosoftPrisma.claim.delete({
      where: { id: Number(params.id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting claim' }, { status: 500 });
  }
}

