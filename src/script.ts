import { prisma } from './context'

const NB_PROJECTS = 10;

async function main() {

  for (let i = 1; i <= NB_PROJECTS; i++) {

    const project = await prisma.project.create({
      data: {
        name: 'Project ' + i,
      },
    })

    const account = await prisma.account.create({
      data: {
        username: 'Username ' + i,
        hashedPassword: 'pw ' + i,
        project: {
          connect: { id: i },
        },
        person: {
          create: {
            name: 'Name ' + i,
            email: 'email ' + i,
            organization: {
              create: {
                name: 'Organization ' + i,
                project: {
                  connect: { id: i },
                },
              }
            },
            project: {
              connect: { id: i },
            },
          },
        },
      },
    })
  }
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
