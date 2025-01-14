import nanosoftPrisma from '@/lib/prisma';
import { create } from 'domain';
import { NextResponse } from 'next/server'
import { getServerSessionWithDefaultAuthOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: Request) {
  console.log('Request body:', JSON.stringify(request.body));
  const session = await getServerSessionWithDefaultAuthOptions();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  
  try {
    const body = await request.json()
    const empId = createEmpId(body);
    if (!session.user.tenantId) {
      return NextResponse.json({ error: 'Tenant ID is missing' }, { status: 400 });
    }

    const employee = await nanosoftPrisma.employee.create({
      data: {
        empId: empId,
        tenantId: session.user.tenantId,
        mobile: body.mobile,
        firstName: body.firstName,
        middleName: body.middleName || "",
        lastName: body.lastName,
        designation: body.designation,
        dateOfBirth: new Date(body.dateOfBirth),
        nationality: body.nationality,
        email: body.email,
        citizenshipStatus: body.citizenshipStatus,
        nricOrFinNo: body.nricOrFinNo,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        localAddressLine1: body.localAddressLine1,
        localAddressLine2: body.localAddressLine2,
        maritalStatus: body.maritalStatus,
        localPostalCode: body.localPostalCode,

        foreignAddressLine1: body.foreignAddressLine1,
        foreignAddressLine2: body.foreignAddressLine2,
        foreignAddressCity: body.foreignAddressCity,
        foreignAddressState: body.foreignAddressState,
        foreignAddressCountry: body.foreignAddressCountry,
        foreignAddressPostalCode: body.foreignAddressPostalCode
      },
    })
    return NextResponse.json(employee, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : String(error),
        msg: `Error creating employee`
      },
      { status: 400 }
    )
  }
}

function createEmpId(employee:Employee): string {
  const dob = new Date(employee.dateOfBirth);
  const dobString = `${(dob.getMonth() + 1).toString().padStart(2, '0')}`;
  return `${employee.firstName[0]}${employee.lastName[0]}-${employee.nationality[0]}-${dobString}-${employee.nricOrFinNo.slice(1,4)}`.toUpperCase();
}


