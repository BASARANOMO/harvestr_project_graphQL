import { prisma } from './context'

const NB_PROJECTS = 3;
const NB_ACCOUNTS = 10500;
const NB_MESSAGES = 51000;
const NB_DISCOVERIES = 30000;


async function main() {

  for (let i = 1; i <= NB_PROJECTS; i++) {

    const project = await prisma.project.create({
      data: {
        name: 'Project ' + i,
      },
    })

    for (let j = 1; j <= NB_ACCOUNTS/NB_PROJECTS; j++) {
      var k = (i - 1) * NB_ACCOUNTS/NB_PROJECTS + j;

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
      const contributorAttribute = await prisma.contributorAttribute.create({
        data: {
          name: 'Contributor attribute ' + k,
          type: 'TEXT',
          project: {
            connect: { id: i },
          },
        },
      })
      // const contributorAttributeValue = await prisma.contributorAttributeValue.create({
      //   data: {
      //     //valuetext: 'Value text ' + 1,
      //     person: {
      //       connect: { id: k },
      //     },
      //     organization: {
      //       connect: { id: k },
      //     },
      //     contributorAttribute: {
      //       connect: { id_type: { id: k, type: 'TEXT' } },
      //     },
      //   },
      // })
    }
    for (let m = 1; m <= NB_MESSAGES / NB_PROJECTS; m++) {
      var k = (i - 1) * NB_MESSAGES / NB_PROJECTS + m;
      var p = Math.floor(Math.random() * (NB_ACCOUNTS / NB_PROJECTS -1) + (i - 1) * NB_ACCOUNTS / NB_PROJECTS);
      console.log(p);
      const message = await prisma.message.create({
        data: {
          content: 'Message ' + k,
          project: {
            connect: { id: i },
          },
          person_Message_requesterIdToPerson: {
            connect: { id: p+1 },
          },
          person_Message_submitterIdToPerson: {
            connect: { id: p+2 },
          },
        },
      })
    }
    for (let n = 1; n <= NB_DISCOVERIES / NB_PROJECTS; n++) {
      var k = (i - 1) * NB_DISCOVERIES / NB_PROJECTS + n;
      const discovery = await prisma.discovery.create({
        data: {
          title: 'Discovery ' + k,
          project: {
            connect: { id: i },
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
