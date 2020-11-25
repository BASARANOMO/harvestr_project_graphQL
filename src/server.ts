import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'
import { prisma } from './context'
import { Organization } from './api/graphql'

const NB_PROJECTS = 10;

const server = new ApolloServer({ schema, context: createContext() })

async function main() {

  const allProjects = await prisma.project.findMany()

  if (allProjects.length == 0) {

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
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
