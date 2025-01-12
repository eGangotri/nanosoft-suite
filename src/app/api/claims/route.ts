import { NextRequest, NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { NANOSOFT_ROLES } from '@/globalConstants';
import { claimSchema } from '@/components/claims/ClaimSchema';

export async function GET() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if ([NANOSOFT_ROLES.EMPLOYEE, NANOSOFT_ROLES.SUPERVISOR, NANOSOFT_ROLES.MGR_TIER_ONE, NANOSOFT_ROLES.MGR_TIER_TWO].includes(session.user.role)) {
    const claims = await nanosoftPrisma.claim.findMany({
      where: { tenantId: session.user.tenantId, employeeId: session.user.employeeId },
      include: { Employee: true },
    })

    return NextResponse.json(claims)
  }

  else {
    const claims = await nanosoftPrisma.claim.findMany({
      where: { tenantId: session.user.tenantId },
      include: { Employee: true },
    })

    return NextResponse.json(claims);
  }
  
}

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedClaim = claimSchema.parse(body);

    const newClaim = await nanosoftPrisma.claim.create({
      data: validatedClaim,
    });

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}