import { employeeEmergencyContactSchema } from '@/components/employee/details/contact-info/constants';
import nanosoftPrisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { employeeId: string } }) {
    const employeeId = parseInt(params.employeeId)
    if (isNaN(employeeId)) {
      NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    try {
      const contacts = await nanosoftPrisma.employeeEmergencyContact.findMany({
        where: { employeeId: employeeId },
      });
      if (contacts.length > 0) {
        NextResponse.json(contacts);
      } else {
        NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching emergency contact:', error);
      NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  