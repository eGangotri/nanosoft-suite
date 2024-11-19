import { NextResponse } from 'next/server'
import { z } from 'zod'

// Mock database (same as in the previous file)
let bankDetails = [
  { id: 1, employee_id: 1, bank_name: 'Bank A', employee_banking_name: 'John Doe', account_number: '1234567890', account_type: 'Savings' },
  { id: 2, employee_id: 2, bank_name: 'Bank B', employee_banking_name: 'Jane Smith', account_number: '0987654321', account_type: 'Current' },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const bankDetail = bankDetails.find(detail => detail.id === id)

  if (!bankDetail) {
    return NextResponse.json({ error: 'Bank detail not found' }, { status: 404 })
  }

  return NextResponse.json(bankDetail)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  const index = bankDetails.findIndex(detail => detail.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Bank detail not found' }, { status: 404 })
  }

  bankDetails[index] = { ...bankDetails[index], ...result.data }

  return NextResponse.json(bankDetails[index])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const index = bankDetails.findIndex(detail => detail.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Bank detail not found' }, { status: 404 })
  }

  bankDetails.splice(index, 1)

  return NextResponse.json({ message: 'Bank detail deleted successfully' })
}