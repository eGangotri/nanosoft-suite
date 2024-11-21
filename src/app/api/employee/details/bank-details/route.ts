import { bankDetailsSchema } from '@/components/employee/bank-details/constants'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const bankDetails = await prisma.employee_bank_details.findMany()
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
    const newBankDetail = await prisma.employee_bank_details.create({
      data: result.data,
    })

    return NextResponse.json(newBankDetail, { status: 201 })
  } catch (error) {
    console.error('Error creating bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}