import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSessionWithDefaultAuthOptions } from "../auth/[...nextauth]/route";
import { isAdmin, isAdminOrSuperAdmin, isSuperAdmin } from "@/utils/utils";
import nanosoftPrisma from "@/lib/prisma";


export async function GET(request: Request) {
    const session = await getServerSessionWithDefaultAuthOptions();
    if (!session || !session.user || !isAdminOrSuperAdmin(session.user.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const _roles = await nanosoftPrisma.role.findMany()

        if (isAdmin(session.user.role)) {
            return NextResponse.json(_roles.filter(role => !isSuperAdmin(role.name)))
        }
        else {
            return NextResponse.json(_roles)
        }
    } catch (error) {
        console.error("Error fetching user roles:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    } 
}

