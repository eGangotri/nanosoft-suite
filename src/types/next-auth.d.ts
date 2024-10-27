/* eslint-disable @typescript-eslint/no-unused-vars */

// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
  }
}