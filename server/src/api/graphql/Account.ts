import {
  objectType,
  extendType,
  enumType,
  stringArg,
  idArg,
  intArg,
} from '@nexus/schema'
//import { PersonDistinctFieldEnum } from '@prisma/client'
//import { receiveMessageOnPort } from 'worker_threads'
//import { Person } from './Person'
//import { Project } from './Project'

export const ACCOUNT_TYPE = enumType({
  name: 'account_type',
  members: ['MAIN_ADMIN', 'ADMIN', 'VIEWER'],
})

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.id()
    t.model.username()
    //t.model.hashedPassword()
    t.model.project()
    t.model.person()
    t.field('type', { type: 'account_type' })
  },
})

export const AccountQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('accounts', {
      // Call account as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {},
      type: 'Account',
      //list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.account.findMany()
        //return ctx.prisma.account.findMany({where: { id: 1 },})
        //return [{id: 1, username: 'Jack'}]
      },
    }),
      t.list.field('filterAccountsByUsername', {
        args: {
          username: stringArg({ nullable: false }),
        },
        type: 'Account',
        resolve(_, args, ctx) {
          return ctx.prisma.account.findMany({
            where: {
              username: args.username,
            },
          })
        },
      })
  },
})

//https://nexusjs.org/docs/getting-started/tutorial/chapter-adding-mutations-to-your-api
// Creates new account
export const addAccount = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addAccountThenConnect', {
      type: 'Account',
      args: {
        username: stringArg({ required: true }),
        hashedPassword: stringArg({ required: true }),
        projectId: intArg({ nullable: false }),
        personId: intArg({ nullable: false }),
      },

      resolve(_, args, ctx) {
        return ctx.prisma.account.create({
          data: {
            username: args.username,
            hashedPassword: args.hashedPassword,
            person: {
              connect: { id: args.personId },
            },
            project: {
              connect: { id: args.projectId },
            },
          },
        })
      },
    })

    t.field('addAccount', {
      type: 'Account',
      args: {
        username: stringArg({ required: true }),
        hashedPassword: stringArg({ required: true }),
        projectId: intArg({ nullable: false }),
        organizationId: intArg({ nullable: false }),
        personId: intArg({ nullable: false }),
        personName: stringArg({ nullable: false }),
        projectName: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
      },

      resolve(_, args, ctx) {
        return ctx.prisma.account.create({
          data: {
            username: args.username,
            hashedPassword: args.hashedPassword,
            person: {
              connectOrCreate: {
                where: {
                  id: args.personId,
                },
                create: {
                  name: args.personName,
                  email: args.email,
                  organization: {
                    connectOrCreate: {
                      where: {
                        id: args.organizationId,
                      },
                      create: {
                        name: args.projectName,
                        project: {
                          connectOrCreate: {
                            where: {
                              id: args.projectId,
                            },
                            create: {
                              name: args.projectName,
                            },
                          },
                        },
                      },
                    },
                  },
                  project: {
                    connectOrCreate: {
                      where: {
                        id: args.projectId,
                      },
                      create: {
                        name: args.projectName,
                      },
                    },
                  },
                },
              },
            },
            project: {
              connectOrCreate: {
                where: {
                  id: args.projectId,
                },
                create: {
                  name: args.projectName,
                },
              },
            },
          },
        })
      },
    })

    t.field('updateAccount', {
      type: 'Account',
      nullable: true,
      args: {
        id: intArg({ required: true }),
        username: stringArg({ nullable: false }),
        hashedPassword: stringArg({ nullable: false }),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.account.update({
          where: { id: args.id },
          data: {
            username: args.username,
            hashedPassword: args.hashedPassword,
          },
        })
      },
    })
  },
})
