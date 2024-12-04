import nanosoftPrisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { employeeId: string } }) {
  const employeeId = params.employeeId;
  const empId = Number(employeeId);

  if (isNaN(empId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

  try {
    const contacts = await nanosoftPrisma.employeeEmergencyContact.findMany({
      where: { employeeId: empId },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching employee emergency contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}