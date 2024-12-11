import nanosoftPrisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId
  console.log('userId:', userId);
  try {
    const userWithEmployee = await getUserWithEmployee(userId);
    if (!userWithEmployee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    const emp = userWithEmployee?.Employee;
    return NextResponse.json(emp);

  } catch (error) {
    console.error('Error fetching Employee for User:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function getUserWithEmployee(userId: string) {
  return nanosoftPrisma.userEmployee.findUnique({
    where: { userId: userId },
    include: { Employee: true }
  })
}
