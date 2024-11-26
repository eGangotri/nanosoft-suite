import { NextResponse } from 'next/server';
import nanosoftPrisma from '@/lib/prisma';

export async function GET() {
    try {
        const clients = await nanosoftPrisma.client.findMany({
            select: { id: true, companyName: true },
        });

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

