import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = parseInt(params.id, 10)
    console.log(`Updating employee with ID: ${employeeId}`)
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body))
    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
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
        addressLine2: body.addressLine2,
        city: body.city,
        country: body.country,
        postalCode: body.postalCode,
      },
    })

    return NextResponse.json(updatedEmployee, { status: 200 })
  } catch (error) {
    console.error('Error updating employee:', error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}