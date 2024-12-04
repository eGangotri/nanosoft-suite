import nanosoftPrisma from "@/lib/prisma";
import {  NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse) {
  const { employeeId } = req.query;
  const empId = Number(employeeId);

  if (isNaN(empId)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }

  try {
    const contacts = await nanosoftPrisma.employeeEmergencyContact.findMany({
      where: { employeeId: empId },
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching employee emergency contacts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}