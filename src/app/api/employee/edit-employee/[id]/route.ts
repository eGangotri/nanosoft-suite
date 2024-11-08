import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, Employee, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const employeeId = parseInt(params.id, 10)
  console.log(`Updating employee with ID: ${employeeId}`)
  try {
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body))
    // Create an object with only the fields present in the body
    const updateData: Prisma.EmployeeUpdateInput = Object.entries(body).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        switch (key) {
          case 'dateOfBirth':
          case 'expiryDate':
            if (value !== null) {
              acc[key] = new Date(value as string);
            }
            break;
          case 'deleted':
          case 'active':
            acc[key] = value as boolean;
            break;
          default:
            acc[key as keyof Prisma.EmployeeUpdateInput] = value as string;
        }
      }
      return acc;
    }, {} as Prisma.EmployeeUpdateInput)

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: updateData,
    })


    return NextResponse.json(updatedEmployee, { status: 200 })
  } catch (error) {
    console.error(`Error updating employee: ${employeeId}`, error)
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}