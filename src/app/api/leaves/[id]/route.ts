import nanosoftPrisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// GET: Fetch all leaves or a specific leave
  export async function GET(
    request: NextRequest,
    { params }: { params: { employeeId: string } }
  ) {
    const employeeId = parseInt(params.employeeId);
    console.log('employeeId:', employeeId);
    try {
      if (employeeId && employeeId > 0) {
        // Fetch a specific leave
        const leaves = await nanosoftPrisma.Leave.findMany({
          where: { employeeId },
          include: {
            leaveType: true, // This includes the associated LeaveType
          },
          orderBy: {
            startDate: 'desc', // Optional: Order by start date, most recent first
          },
        });
        if (!leaves || leaves.length === 0) {
          return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
        }
        return NextResponse.json(leaves);
      } else {
        // Fetch all leaves
        const leaves = await nanosoftPrisma.Leave.findMany();
        return NextResponse.json(leaves);
      }
    } catch (error) {
      console.error('Error fetching leave(s):', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

  // POST: Create a new leave
  export async function POST(request: NextRequest) {
    try {
      const { employeeId, startDate, endDate, leaveTypeId, status } = await request.json();

      const newLeave = await nanosoftPrisma.Leave.create({
        data: {
          employeeId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          leaveTypeId,
          status,
        },
      });

      return NextResponse.json(newLeave, { status: 201 });
    } catch (error) {
      console.error('Error creating leave:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

  // PUT: Update an existing leave
  export async function PUT(request: NextRequest) {
    try {
      const { id, employeeId, startDate, endDate, leaveTypeId, status } = await request.json();

      const updatedLeave = await nanosoftPrisma.Leave.update({
        where: { id: parseInt(id) },
        data: {
          employeeId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          leaveTypeId,
          status,
        },
      });

      return NextResponse.json(updatedLeave);
    } catch (error:any) {
      console.error('Error updating leave:', error);
      if (error && error?.code && error.code === 'P2025') {
        return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

  // DELETE: Delete a leave
  export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Leave ID is required' }, { status: 400 });
    }

    try {
      await nanosoftPrisma.Leave.delete({
        where: { id: parseInt(id) },
      });

      return NextResponse.json({ message: 'Leave deleted successfully' });
    } catch (error:any) {
      console.error('Error deleting leave:', error);
      if (error?.code === 'P2025') {
        return NextResponse.json({ message: 'Leave not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

