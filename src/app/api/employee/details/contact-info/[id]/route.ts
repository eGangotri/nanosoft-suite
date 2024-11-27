import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { employeeEmergencyContactSchema } from '../../../schemas/employeeEmergencyContactSchema';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const contactId = Number(id);

  if (isNaN(contactId)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(contactId, res);
    case 'PUT':
      return handlePut(contactId, req, res);
    case 'DELETE':
      return handleDelete(contactId, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(id: number, res: NextApiResponse) {
  try {
    const contact = await prisma.employeeEmergencyContact.findUnique({
      where: { id },
    });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Emergency contact not found' });
    }
  } catch (error) {
    console.error('Error fetching emergency contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePut(id: number, req: NextApiRequest, res: NextApiResponse) {
  try {
    const validatedData = employeeEmergencyContactSchema.parse(req.body);
    const updatedContact = await prisma.employeeEmergencyContact.update({
      where: { id },
      data: validatedData,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    if (error.name === 'ZodError') {
      res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2025') {
      res.status(404).json({ message: 'Emergency contact not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

async function handleDelete(id: number, res: NextApiResponse) {
  try {
    await prisma.employeeEmergencyContact.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2025') {
      res.status(404).json({ message: 'Emergency contact not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

