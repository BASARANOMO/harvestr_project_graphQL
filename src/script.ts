import { prisma } from './context'

const NB_PROJECTS = 3;
const NB_ACCOUNTS = 10000;

async function main() {

  for (let i = 1; i <= NB_PROJECTS; i++) {

    const project = await prisma.project.create({
      data: {
        name: 'Project ' + i,
      },
    })

    for (let j = 1; j <= NB_ACCOUNTS; j++) {
      var k = (i-1) * NB_ACCOUNTS + j; 
      const account = await prisma.account.create({
        data: {
          username: 'Username ' + k,
          hashedPassword: 'pw ' + k,
          project: {
            connect: { id: i },
          },
          person: {
            create: {
              name: 'Name ' + k,
              email: 'email ' + k,
              organization: {
                create: {
                  name: 'Organization ' + k,
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
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
