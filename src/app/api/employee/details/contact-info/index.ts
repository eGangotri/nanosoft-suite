import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { employeeEmergencyContactSchema } from '../../../schemas/employeeEmergencyContactSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contacts = await prisma.employeeEmergencyContact.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validatedData = employeeEmergencyContactSchema.parse(req.body);
    const newContact = await prisma.employeeEmergencyContact.create({
      data: validatedData,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating emergency contact:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

