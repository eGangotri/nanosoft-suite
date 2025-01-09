import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { loanApplicationSchema } from '@/components/loan-applications/LoanApplicationSchema'
import { getUserEmployeeByEmail } from '@/prismaService/userService'
import { NANOSOFT_ROLES } from '@/globalConstants'
import nanosoftPrisma from '@/lib/prisma'


export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if ([NANOSOFT_ROLES.EMPLOYEE, NANOSOFT_ROLES.SUPERVISOR, NANOSOFT_ROLES.MGR_TIER_ONE, NANOSOFT_ROLES.MGR_TIER_TWO].includes(session.user.role)) {
      const user = await getUserEmployeeByEmail(`${session.user.email}`, session.user.tenantId as number)
      const loanApplications = await nanosoftPrisma.loanApplication.findMany({
        where: { tenantId: session.user.tenantId, employeeId: user?.UserEmployee?.employeeId },
        include: { Employee: true },
      })

      const formattedApplications = loanApplications.map(app => ({
        ...app,
        employeeName: `${app.Employee.firstName} ${app.Employee.lastName}`,
      }))

      return NextResponse.json(formattedApplications)
    }

    else {
      const loanApplications = await nanosoftPrisma.loanApplication.findMany({
        where: { tenantId: session.user.tenantId },
        include: { Employee: true },
      })

      const formattedApplications = loanApplications.map(app => ({
        ...app,
        employeeName: `${app.Employee.firstName} ${app.Employee.lastName}`,
      }))

      return NextResponse.json(formattedApplications);
    }

  } catch (error) {
    console.error('Failed to fetch loan applications:', error)
    return NextResponse.json({ error: 'Failed to fetch loan applications' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = loanApplicationSchema.parse(body)

    const user = await nanosoftPrisma.user.findUnique({
      where: { email: `${session.user.email}` },
      include: { UserEmployee: true },
    })

    if (!user || !user.UserEmployee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    const loanApplication = await nanosoftPrisma.loanApplication.create({
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

