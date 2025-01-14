import { getServerSessionWithDefaultAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { bankDetailsSchema } from '@/components/employee/details/bank-details/schema'
import nanosoftPrisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSessionWithDefaultAuthOptions();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bankDetails = await nanosoftPrisma.employeeBankDetails.findMany({
      where: { tenantId: session.user.tenantId },
    })

    return NextResponse.json(bankDetails)
  } catch (error) {
    console.error('Error fetching bank details:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSessionWithDefaultAuthOptions();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  delete body.id;
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  try {
    if (!session.user.tenantId) {
      return NextResponse.json({ error: 'Tenant ID is missing' }, { status: 400 });
    }

    const newBankDetail = await nanosoftPrisma.employeeBankDetails.create({
      data: {
        ...result.data,
        tenantId: session.user.tenantId,
      }
    })

    return NextResponse.json(newBankDetail, { status: 201 })
  } catch (error) {
    console.error('Error creating bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}