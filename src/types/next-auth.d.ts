/* eslint-disable @typescript-eslint/no-unused-vars */

// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
      isWithinGeoFence: boolean
      roleId?: number
      tenantId?: number;
      employeeId?: number;
      employeeName?: string;
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    isWithinGeoFence: boolean
    roleId?: number
    tenantId?: number;
    employeeId?: number;
    employeeName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    isWithinGeoFence?: boolean
    roleId?: number
    tenantId?: number;
    employeeId?: number;
    employeeName?: string;
  }
}
