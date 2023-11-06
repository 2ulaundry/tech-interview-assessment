import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    invoices: {
      create: [
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian',
          invoiceNumber: '123456',
          total: 100,
          remittanceAddress: '123 Main St',
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    invoices: {
      create: [
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 2',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 3',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 4',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 4',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    invoices: {
      create: [
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 7',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 8',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
        {
          invoiceDate: new Date(),
          dueDate: new Date(),
          vendorName: 'Cristian 9',
          invoiceNumber: '123457',
          total: 101.2,
          remittanceAddress: '123 Main St',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
