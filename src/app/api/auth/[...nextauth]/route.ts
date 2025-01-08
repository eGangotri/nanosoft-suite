import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { UserRole } from "@prisma/client"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import { isWithinGeoFence } from "@/utils/geofence"
import nanosoftPrisma from "@/lib/prisma"
import { getEmployeeByUserId } from "@/services/UserService"
import { NANOSOFT_ROLES } from "@/globalConstants"


interface ExtendedSession extends DefaultSession {
  user: {
    id: string;
    role: string;
    roleId?: number;
    isWithinGeoFence: boolean;
    tenantId?: number;
  } & DefaultSession["user"]
}

interface ExtendedToken extends JWT {
  role?: string;
  roleId?: number;
  isWithinGeoFence?: boolean;
  tenantId?: number;
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(nanosoftPrisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await nanosoftPrisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            UserRole: {
              include: {
                Role: true,
              },
            },
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }


        // Get the user's location from the request headers
        const latitude = parseFloat(req?.headers?.['x-vercel-ip-latitude'] as string || '0')
        const longitude = parseFloat(req?.headers?.['x-vercel-ip-longitude'] as string || '0')

        const roleName = user.UserRole[0]?.Role?.name || "ERROR"; // Default to 'Employee' if no role is found
        const roleId = user.UserRole[0]?.Role?.id || 0;

        const tenantId = user.tenantId;
        const authValues = {
          id: user.id,
          email: user.email,
          name: user.name,
          isWithinGeoFence: isWithinGeoFence(latitude, longitude),
          role: roleName,
          roleId,
          tenantId
        }
        console.log(`authValues: ${JSON.stringify(authValues)}`)
        return authValues
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isWithinGeoFence = user.isWithinGeoFence;
        token.roleId = user.roleId;
        token.tenantId = user.tenantId;
      }
      return token as ExtendedToken;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.isWithinGeoFence = token.isWithinGeoFence as boolean;
        session.user.role = token.role as string;
        session.user.roleId = token.roleId as number;
        session.user.tenantId = token.tenantId as number;
      }
      return session as ExtendedSession;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }