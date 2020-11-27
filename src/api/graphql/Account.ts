import { objectType, extendType, enumType, stringArg } from '@nexus/schema'
import { receiveMessageOnPort } from 'worker_threads'
import { Person } from './Person'
import { Project } from './Project'

export const ACCOUNT_TYPE = enumType({
  name: 'account_type',
  members: ['MAIN_ADMIN', 'ADMIN', 'VIEWER'],
})

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.hashedPassword()
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
      args: {
        id: stringArg(),
      },
      type: 'Account',
      //list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.account.findMany()
        //return ctx.prisma.account.findMany({where: { id: 1 },})
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})

//https://nexusjs.org/docs/getting-started/tutorial/chapter-adding-mutations-to-your-api
// Creates new account
export const addAccount = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addAccount', {
      type: Account,
      args: {
        username: stringArg({required: true,}),
        hashedPassword: stringArg({required: true,}),
        //Not sur of these : stringArg ? or project type ?
        //type: stringArg(),
      },
      resolve(_, args, ctx) {
        const newAccount = {
          id: Account.value.definition.length + 1,
          username: args.username,
          hashedPassword: args.hashedPassword,
          //type: args.type
          person: {},
          project: {},
        }
        ctx.prisma.account.create({data:newAccount})
        return newAccount
      },
    })
  },
})