import { PrismaClient } from '@prisma/client';
import { employeeEmergencyContactSchema } from '@/components/employee/details/contact-info/constants';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const contacts = await prisma.employeeEmergencyContact.findMany();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    delete body.id;
    delete body.employee;
    console.log('Creating emergency contact:', JSON.stringify(body));
    const validatedData = employeeEmergencyContactSchema.parse(body);
    const newContact = await prisma.employeeEmergencyContact.create({
      data: validatedData,
    });
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating emergency contact:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data', errors: (error as any).errors }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}