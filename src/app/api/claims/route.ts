import { NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';
import { claimSchema } from '@/components/claims/ClaimSchema';
import { isAnyManagerialRole } from '@/utils/utils';
import { getServerSessionWithDefaultAuthOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSessionWithDefaultAuthOptions();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  console.log('GET /api/claims', JSON.stringify(session.user, null, 2))

  if (!isAnyManagerialRole(session.user.role)) {
    console.log('!isAnyManagerialRole')
    const claims = await nanosoftPrisma.claim.findMany({
      where: { tenantId: session.user.tenantId, employeeId: session.user.employeeId },
      include: { Employee: true },
    })
    const formattedApplications = claims.map(claim => ({
      ...claim,
      employeeName: `${claim.Employee.firstName} ${claim.Employee.lastName}`,
    }))

    return NextResponse.json(formattedApplications)
  }

  else {
    console.log('else !isAnyManagerialRole')

    const claims = await nanosoftPrisma.claim.findMany({
      where: { tenantId: session.user.tenantId },
      include: { Employee: true },
    })

    const formattedApplications = claims.map(claim => ({
      ...claim,
      employeeName: `${claim.Employee.firstName} ${claim.Employee.lastName}`,
    }))

    return NextResponse.json(formattedApplications)
  }

}

export async function POST(req: Request) {
  const session = await getServerSessionWithDefaultAuthOptions();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log('POST /api/claims', JSON.stringify(body, null, 2));
    const validatedClaim = claimSchema.parse(body);

    const newClaim = await nanosoftPrisma.claim.create({
      data: validatedClaim,
    });

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}