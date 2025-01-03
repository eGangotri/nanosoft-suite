import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { loanApplicationSchema } from '@/components/loan-applications/LoanApplicationSchema'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = loanApplicationSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { Email: session.user.email },
      include: { UserEmployee: true },
    })

    if (!user || !user.UserEmployee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const loanApplication = await prisma.loanApplication.create({
      data: {
        ...validatedData,
        employeeId: user.UserEmployee.employeeId,
        tenantId: user.tenantId,
      },
    })

    return NextResponse.json(loanApplication)
  } catch (error) {
    console.error('Failed to create loan application:', error)
    return NextResponse.json({ error: 'Failed to create loan application' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { UserRole: true },
    })

    if (!user || !user.UserRole.some(role => ['MANAGER', 'ADMIN', 'SUPERADMIN'].includes(role.Role.name))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const loanApplications = await prisma.loanApplication.findMany({
      where: { tenantId: user.tenantId },
      include: { Employee: true },
    })

    const formattedApplications = loanApplications.map(app => ({
      ...app,
      employeeName: `${app.Employee.firstName} ${app.Employee.lastName}`,
    }))

    return NextResponse.json(formattedApplications)
  } catch (error) {
    console.error('Failed to fetch loan applications:', error)
    return NextResponse.json({ error: 'Failed to fetch loan applications' }, { status: 500 })
  }
}

