import { claimSchema } from '@/components/claims/ClaimForm';
import nanosoftPrisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// GET: Fetch all leaves or a specific leave
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch a specific leave
    const claims = await nanosoftPrisma.claim.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!claims) {
      return NextResponse.json({ message: 'Claim not found' }, { status: 404 });
    }
    return NextResponse.json(claims);
  } catch (error) {
    console.error('Error fetching claim(s):', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update an existing leave
export async function PUT(request: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const validatedData = claimSchema.parse(body)

    const updatedClaim = await nanosoftPrisma.claim.update({
      where: { id: parseInt(params.id) },
      data: validatedData
    });

    return NextResponse.json(updatedClaim);
  } catch (error: any) {
    console.error('Error updating leave:', error);
    if (error && error?.code && error.code === 'P2025') {
      return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

