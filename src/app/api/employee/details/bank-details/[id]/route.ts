import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { bankDetailsSchema } from '@/components/employee/bank-details/constants'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)

  try {
    console.log(`Bank detail:(${employeeId}) ${params.id}`, employeeId);

    const bankDetail = await prisma.employee_bank_details.findFirst({
      where: { employee_id: employeeId }
    })

    if (!bankDetail) {
      return NextResponse.json({ error: 'Bank detail not found for this employee' }, { status: 404 })
    }
    console.log(`Bank detail:(${employeeId})`, JSON.stringify(bankDetail));
    return NextResponse.json(bankDetail)
  } catch (error) {
    console.error('Error fetching bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)
  const body = await request.json()
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  try {
    const updatedBankDetail = await prisma.employee_bank_details.updateMany({
      where: { employee_id: employeeId },
      data: result.data,
    })

    if (updatedBankDetail.count === 0) {
      return NextResponse.json({ error: 'Bank detail not found for this employee' }, { status: 404 })
    }

    // Fetch the updated record to return
    const fetchedBankDetail = await prisma.employee_bank_details.findFirst({
      where: { employee_id: employeeId }
    })

    return NextResponse.json(fetchedBankDetail)
  } catch (error) {
    console.error('Error updating bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)

  try {
    const deletedBankDetail = await prisma.employee_bank_details.deleteMany({
      where: { employee_id: employeeId },
    })

    if (deletedBankDetail.count === 0) {
      return NextResponse.json({ error: 'Bank detail not found for this employee' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Bank detail deleted successfully' })
  } catch (error) {
    console.error('Error deleting bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}