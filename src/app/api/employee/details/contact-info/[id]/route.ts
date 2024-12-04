import { employeeEmergencyContactSchema } from '@/components/employee/details/contact-info/constants';
import nanosoftPrisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const contacts = await nanosoftPrisma.employeeEmergencyContact.findUnique({
      where: { id: contactId },
    });
    if (contacts) {
      return NextResponse.json(contacts);
    } else {
      return NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching emergency contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    console.log('Validated data:', JSON.stringify(req.body));
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body));

    const validatedData = employeeEmergencyContactSchema.parse(req.body);
    console.log('Validated data:', JSON.stringify(validatedData));
    const updatedContact = await nanosoftPrisma.employeeEmergencyContact.update({
      where: { id: contactId },
      data: validatedData,
    });
    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data', errors: (error as any).errors }, { status: 400 });
    } else if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    } else {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await nanosoftPrisma.employeeEmergencyContact.delete({
      where: { id: contactId },
    });
    return NextResponse.json({ "message": "Emergency contact deleted successfully" });
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2025') {
      return NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    } else {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}