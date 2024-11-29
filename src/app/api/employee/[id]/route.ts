import { NextRequest, NextResponse } from 'next/server'
import nanosoftPrisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)
  try {
    const employee = await nanosoftPrisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        EmployeeBankDetails: true,
        EmployeeEmergencyContact: true,
        EmployeeHrDetails: {
          include: {
            Client: true,
          },
        },
        EmployeeLeaveBalance: {
          include: {
            LeaveType: true,
          },
        },
        EmployeeWorkHistory: true,
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error('Error fetching employee data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


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

    const updatedEmployee = await nanosoftPrisma.employee.update({
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
  }
}