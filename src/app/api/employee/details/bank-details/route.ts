import { NextResponse } from 'next/server'
import { z } from 'zod'

// Mock database
let bankDetails = [
  { id: 1, employee_id: 1, bank_name: 'Bank A', employee_banking_name: 'John Doe', account_number: '1234567890', account_type: 'Savings' },
  { id: 2, employee_id: 2, bank_name: 'Bank B', employee_banking_name: 'Jane Smith', account_number: '0987654321', account_type: 'Current' },
]

export async function GET() {
  return NextResponse.json(bankDetails)
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = bankDetailsSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues }, { status: 400 })
  }

  const newBankDetail = { id: bankDetails.length + 1, ...result.data }
  bankDetails.push(newBankDetail)

  return NextResponse.json(newBankDetail, { status: 201 })
}