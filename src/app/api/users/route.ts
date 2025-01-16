import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nanosoftPrisma from '@/lib/prisma'
import { formatedWithMidInitials } from '@/components/employee/EmployeeUtils'
import { getServerSessionWithDefaultAuthOptions } from '../auth/[...nextauth]/route';
import { isAdmin, isAnyAdminRole, isAnyManagerialRole, isSuperAdmin } from '@/utils/utils';


export async function GET() {
    try {
        const session = await getServerSessionWithDefaultAuthOptions();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const users = await nanosoftPrisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                createdAt: true,
                updatedAt: true,
                tenantId: true,
                deleted: false,
                Tenant: {
                    select: {
                        name: true,
                    },
                },
                UserRole: {
                    include: {
                        Role: true
                    }
                },
                UserEmployee: {
                    include: {
                        Employee: true
                    }
                }
            },
        })

        if (isSuperAdmin(session.user.role)) {
            const formattedUsers = getFormattedUsers(users);
            return NextResponse.json(formattedUsers)
        }
        else if (isAdmin(session.user.role)) {
            const filteredUsers = users.filter(user => user.tenantId === session.user.tenantId);
            const formattedUsers = getFormattedUsers(filteredUsers);
            return NextResponse.json(formattedUsers)
        }
        else if (isAnyManagerialRole(session.user.role)) {

            return NextResponse.json({
                error: 'Unauthorized',
                title: "Unimplemented"
            }, {
                status: 401
            })
        }
        else {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

    }
    catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

const getFormattedUsers = (users: any[]) => {

    const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        tenantId: user.tenantId,
        tenantName: user.Tenant.name,
        role: user.UserRole[0]?.Role,
        roleName: user.UserRole[0]?.Role.name,
        employeeName: user.UserEmployee?.Employee ? formatedWithMidInitials(user.UserEmployee?.Employee.firstName, user.UserEmployee?.Employee?.middleName || "", user.UserEmployee?.Employee.lastName) : "N/A",
        employeeId: user.UserEmployee?.Employee.empId || "N/A"
    }))
    return formattedUsers;
}
