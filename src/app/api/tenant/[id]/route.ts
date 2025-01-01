import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { tenantSchema } from '@/components/tenantRegistration/schema';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: parseInt(params.id) },
      });
  
      if (!tenant) {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
      }
  
      return NextResponse.json(tenant);
    } catch (error) {
      console.error('Error fetching tenant:', error);
      return NextResponse.json({ error: 'Failed to fetch tenant' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const body = await req.json();
      const validatedData = tenantSchema.parse(body);
  
      const updatedTenant = await prisma.tenant.update({
        where: { id: parseInt(params.id) },
        data: {
          name: validatedData.name,
          email: validatedData.email,
          companyName: validatedData.companyName,
          uenNo: validatedData.uenNo,
          entityType: validatedData.entityType,
          industry: validatedData.industry,
          contactNo: validatedData.contactNo,
          domain: validatedData.domain,
        },
      });
  
      return NextResponse.json({ success: true, id: updatedTenant.id });
    } catch (error) {
      console.error('Error updating tenant:', error);
      return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  
  

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)

  try {
    await prisma.tenant.update({
      where: { id },
      data: { active: false },
    })

    return NextResponse.json({ message: 'Tenant deactivated successfully' })
  } catch (error) {
    console.error('Error deactivating tenant:', error)
    return NextResponse.json({ error: 'Failed to deactivate tenant' }, { status: 500 })
  }
}

