import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getUser = () => {
  return prisma.user.findFirst({
    where: {
      email: 'alice@prisma.io'
    },
  })
}