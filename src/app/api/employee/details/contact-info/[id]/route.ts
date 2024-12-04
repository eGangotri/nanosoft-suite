import nanosoftPrisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const contacts = await nanosoftPrisma.employeeEmergencyContact.findUnique({
      where: { id: contactId },
    });
    if (contacts) {
      NextResponse.json(contacts);
    } else {
      NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching emergency contact:', error);
    NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const validatedData = employeeEmergencyContactSchema.parse(req.body);
    const updatedContact = await nanosoftPrisma.employeeEmergencyContact.update({
      where: { id: contactId },
      data: validatedData,
    });
    NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      NextResponse.json({ error: 'Invalid input data', errors: (error as any).errors }, { status: 400 });
    } else if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2025') {
      NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    } else {
      NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextApiRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const contactId = Number(id);

  if (isNaN(contactId)) {
    NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await nanosoftPrisma.employeeEmergencyContact.delete({
      where: { id: contactId },
    });
    NextResponse.json({ "message": "Emergency contact deleted successfully" });
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError' && (error as any).code === 'P2025') {
      NextResponse.json({ error: 'Emergency contact not found' }, { status: 404 });
    } else {
      NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
}