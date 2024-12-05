import { NextResponse } from 'next/server'
import nanosoftPrisma from '@/lib/prisma';
import { bankDetailsSchema } from '@/components/employee/details/bank-details/schema';

export async function GET(request: Request, { params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId)

  try {
    console.log(`Bank detail:(${employeeId}) ${params.employeeId}`, employeeId);

    const bankDetail = await nanosoftPrisma.employeeBankDetails.findUnique({
      where: { employeeId: employeeId }
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

export async function PUT(request: Request, { params }: { params: { employeeId: string } }) {
  const id = parseInt(params.employeeId)
  const body = await request.json()
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  try {
    const updatedBankDetail = await nanosoftPrisma.employeeBankDetails.update({
      where: { id },
      data: result.data,
    })

    if (!updatedBankDetail) {
      return NextResponse.json({ error: 'Bank detail not found for this employee' }, { status: 404 })
    }

    // Fetch the updated record to return
    const fetchedBankDetail = await nanosoftPrisma.employeeBankDetails.findFirst({
      where: { id }
    })

    return NextResponse.json(fetchedBankDetail)
  } catch (error) {
    console.error('Error updating bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { employeeId: string } }) {
  const employeeId = parseInt(params.employeeId)

  try {
    const deletedBankDetail = await nanosoftPrisma.employeeBankDetails.delete({
      where: { employeeId: employeeId },
    })

    if (!deletedBankDetail) {
      return NextResponse.json({ error: 'Bank detail not found for this employee' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Bank detail deleted successfully' })
  } catch (error) {
    console.error('Error deleting bank detail:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}