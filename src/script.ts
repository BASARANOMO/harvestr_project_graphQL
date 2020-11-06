import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  /*
  await prisma.project.create({
    data: {
      name: "Harvestr"
    }
  })
  */
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.project.findMany()
    console.log(allUsers)
  }

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


