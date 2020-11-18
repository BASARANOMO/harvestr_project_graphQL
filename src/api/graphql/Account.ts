import { objectType, extendType, enumType, stringArg } from '@nexus/schema'

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
      // Le passer dans le findMany
      args: {
        id: stringArg(),
      },
      type: 'Account',
      //list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.account.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
