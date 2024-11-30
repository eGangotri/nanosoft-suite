import { bankDetailsSchema } from '@/components/employee/details/bank-details/schema'
import nanosoftPrisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const bankDetails = await nanosoftPrisma.employeeBankDetails.findMany()
    return NextResponse.json(bankDetails)
  } catch (error) {
    console.error('Error fetching bank details:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  try {
    const newBankDetail = await nanosoftPrisma.employeeBankDetails.create({
      data: result.data,
    })

    return NextResponse.json(newBankDetail, { status: 201 })
  } catch (error) {
    console.error('Error creating bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}