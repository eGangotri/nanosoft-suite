import { claimSchema } from '@/components/claims/ClaimSchema';
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


export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid claim ID' }, { status: 400 })
    }

    const body = await request.json()
    console.log('PUT /api/claims/:id body:', JSON.stringify(body))
    const validatedData = claimSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const updatedClaim = await nanosoftPrisma.claim.update({
      where: { id },
      data: validatedData.data,
    })

    return NextResponse.json(updatedClaim)
  } catch (error) {
    console.error('Error updating claim:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the claim' },
      { status: 500 }
    )
  }
}