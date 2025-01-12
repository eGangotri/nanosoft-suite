import { claimSchema } from '@/components/claims/ClaimSchema';
import nanosoftPrisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';


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


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { status } = await req.json()
  try {
    const updatedApplication = await nanosoftPrisma.claim.update({
      where: { id: parseInt(params.id) },
      data: { status, approvedBy: session?.user?.id },
    })

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('Failed to update loan application:', error)
    return NextResponse.json({ error: 'Failed to update loan application' }, { status: 500 })
  }
}
