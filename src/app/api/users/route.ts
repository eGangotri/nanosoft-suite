import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nanosoftPrisma from '@/lib/prisma'
import { formatedWithMidInitials } from '@/components/employee/EmployeeUtils'


export async function GET() {
    try {
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
            employeeName: user.UserEmployee?.Employee ? formatedWithMidInitials(user.UserEmployee?.Employee.firstName, user.UserEmployee?.Employee?.middleName || "", user.UserEmployee?.Employee.lastName): "N/A",
            employeeId: user.UserEmployee?.Employee.empId || "N/A"
        }))

        return NextResponse.json(formattedUsers)
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

