import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { loanApplicationSchema } from '@/components/loan-applications/LoanApplicationSchema'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const loanApplication = await prisma.loanApplication.findUnique({
      where: { id: parseInt(params.id) },
    })

    if (!loanApplication) {
      return NextResponse.json({ error: 'Loan application not found' }, { status: 404 })
    }

    return NextResponse.json(loanApplication)
  } catch (error) {
    console.error('Failed to fetch loan application:', error)
    return NextResponse.json({ error: 'Failed to fetch loan application' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validatedData = loanApplicationSchema.parse(body)

    const updatedApplication = await prisma.loanApplication.update({
      where: { id: parseInt(params.id) },
      data: validatedData,
    })

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('Failed to update loan application:', error)
    return NextResponse.json({ error: 'Failed to update loan application' }, { status: 500 })
  }
}

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   const session = await getServerSession()
//   if (!session || !session.user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const { status } = await req.json()

//   try {
//     const user = await prisma.user.findUnique({
//       where: { Email: session.user.email },
//       include: { UserRole: true },
//     })

//     if (!user || !user.UserRole.some(role => ['MANAGER', 'ADMIN', 'SUPERADMIN'].includes(role.Role.name))) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
//     }

//     const updatedApplication = await prisma.loanApplication.update({
//       where: { id: parseInt(params.id) },
//       data: { status, approvedBy: user.id },
//     })

//     return NextResponse.json(updatedApplication)
//   } catch (error) {
//     console.error('Failed to update loan application:', error)
//     return NextResponse.json({ error: 'Failed to update loan application' }, { status: 500 })
//   }
// }

