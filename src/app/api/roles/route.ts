import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSessionWithDefaultAuthOptions } from "../auth/[...nextauth]/route";
import { isAdmin, isAdminOrSuperAdmin, isSuperAdmin } from "@/utils/utils";
import { is } from "date-fns/locale";

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const session = await getServerSessionWithDefaultAuthOptions();
    if (!session || !session.user || !isAdminOrSuperAdmin(session.user.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const userRoles = await prisma.role.findMany({
            select: {
                id: true,
                name: true
            }
        })

        if (isAdmin(session.user.role)) {
            return NextResponse.json(userRoles.filter(role => !isSuperAdmin(role.name)))
        }
        else {
            return NextResponse.json(userRoles)
        }
    } catch (error) {
        console.error("Error fetching user roles:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

