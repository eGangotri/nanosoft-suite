import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const employee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        designation: body.designation,
        dateOfBirth: new Date(body.dateOfBirth),
        nationality: body.nationality,
        email: body.email,
        mobile: body.mobile,
        citizenshipStatus: body.citizenshipStatus,
        nricOrFinNo: body.nricOrFinNo,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        maritalStatus: body.maritalStatus,
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2 || null,
        city: body.city,
        country: body.country,
        postalCode: body.postalCode,
      },
    })
    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json({ error: 'Error creating employee' }, { status: 500 })
  }
}