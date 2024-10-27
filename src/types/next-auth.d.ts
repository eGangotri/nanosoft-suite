/* eslint-disable @typescript-eslint/no-unused-vars */

// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

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

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  SUPERVISOR = "SUPERVISOR",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN"
}