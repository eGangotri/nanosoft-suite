import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nanosoftPrisma from '@/lib/prisma';
import { tenantSchema } from '@/components/tenantRegistration/schema';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validate the input data
    const validatedData = tenantSchema.parse(body);

    // Create a new tenant using Prisma
    const newTenant = await nanosoftPrisma.tenant.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password, // Note: In a real application, you should hash this password
        companyName: validatedData.companyName,
        uenNo: validatedData.uenNo,
        entityType: validatedData.entityType,
        industry: validatedData.industry,
        contactNo: validatedData.contactNo,
        domain: validatedData.domain,
        updatedAt: new Date(), // Set the updatedAt field manually
      },
    });

    return NextResponse.json({ success: true, id: newTenant.id }, { status: 201 });
  } catch (error) {
    console.error('Error in tenant registration:', error);
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: Request) {
  const tenants = await nanosoftPrisma.tenant.findMany({
    where: {
      active: true,
      deleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      email: true,
      companyName: true,
      uenNo: true,
      entityType: true,
      industry: true,
      contactNo: true,
      domain: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json(tenants)
}


