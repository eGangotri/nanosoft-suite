import nanosoftPrisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSessionWithDefaultAuthOptions } from '../../auth/[...nextauth]/route';

async function fetchEmployeeById(id: number, tenantId: number) {
  if (isNaN(id)) {
    throw new Error('Invalid employee ID');
  }

  console.log('fetchEmployeeById:', id);
  const employee = await nanosoftPrisma.employee.findUnique({
    where: {
      id: id,
      tenantId
    },
  });

  if (!employee) {
    console.log('No employee found with ID:', id);
    return null;
  }

  return employee;
}

async function fetchEmployees(tenantId: number, searchTerm: string, offset: number, limit: number) {
  const employees = await nanosoftPrisma.employee.findMany({
    where: {
      AND: [
        {
          OR: [
            { firstName: { contains: searchTerm, mode: 'insensitive' } },
            { lastName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        { deleted: false },
        {
          tenantId: tenantId
        }
      ],
    },
    skip: offset,
    take: limit,
    orderBy: { id: 'asc' },
  });

  const totalCount = await nanosoftPrisma.employee.count({
    where: {
      OR: [
        { firstName: { contains: searchTerm, mode: 'insensitive' } },
        { lastName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
  });

  return { employees, totalCount };
}

export async function GET(request: Request) {
  console.log('GET request received for employee:list');

  const session = await getServerSessionWithDefaultAuthOptions();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const searchTerm = searchParams.get('searchTerm') || '';
    const id = searchParams.get('id') || '0';
    const offset = (page - 1) * limit;

    if (parseInt(id) > 0) {
      console.log('Fetching employee with ID:', id);
      const employeeId = parseInt(id);
      const employee = await fetchEmployeeById(employeeId, session.user.tenantId || 0);

      if (!employee) {
        return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
      }

      return NextResponse.json(employee);
    } else {
      const { employees, totalCount } = await fetchEmployees(session.user.tenantId || 0, searchTerm, offset, limit);

      return NextResponse.json({
        employees,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      });
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}