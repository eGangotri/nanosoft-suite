import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const employeeId = parseInt(params.id)
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        employee_bank_details: true,
        employee_emergency_contact: true,
        employee_hr_details: {
          include: {
            client: true,
          },
        },
        employee_leave_balances: {
          include: {
            Leave_Type: true,
          },
        },
        employee_work_history: true,
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