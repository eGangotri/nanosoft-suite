import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { employeeEmergencyContactSchema } from '@/components/employee/details/contact-info/constants';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contacts = await prisma.employeeEmergencyContact.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validatedData = employeeEmergencyContactSchema.parse(req.body);
    const newContact = await prisma.employeeEmergencyContact.create({
      data: validatedData,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating emergency contact:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Invalid input data', errors: (error as any).errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}