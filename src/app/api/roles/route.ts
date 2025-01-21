import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSessionWithDefaultAuthOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const session = await getServerSessionWithDefaultAuthOptions();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id;
    const tenantId = session.user.tenantId;
    try {
        const userRoles = await prisma.userRole.findMany({
            where: {
                tenantId: tenantId,
            },
            include: {
                Role: true,
            },
        })

        return NextResponse.json(userRoles)
    } catch (error) {
        console.error("Error fetching user roles:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

