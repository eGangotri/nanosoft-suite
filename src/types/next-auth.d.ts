/* eslint-disable @typescript-eslint/no-unused-vars */

// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
      isWithinGeoFence: boolean

    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    isWithinGeoFence: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
    isWithinGeoFence?: boolean
  }
}
