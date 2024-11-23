import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const nanosoftPrisma = global.prisma ?? prismaClientSingleton()

export default nanosoftPrisma

if (process.env.NODE_ENV !== 'production') global.prisma = nanosoftPrisma