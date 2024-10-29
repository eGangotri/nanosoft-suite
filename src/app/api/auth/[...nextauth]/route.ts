import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { PrismaClient, UserRole } from "@prisma/client"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import { isWithinCBD } from "@/utils/geofence"

const prisma = new PrismaClient()

interface ExtendedSession extends DefaultSession {
  user: {
    id: string;
    role: UserRole;
    isWithinCBD: boolean;
  } & DefaultSession["user"]
}

interface ExtendedToken extends JWT {
  role?: UserRole;
  isWithinCBD?: boolean;
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
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

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isWithinCBD: isWithinCBD(latitude, longitude)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isWithinCBD = user.isWithinCBD;
      }
      return token as ExtendedToken;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as UserRole;
        session.user.isWithinCBD = token.isWithinCBD as boolean;
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