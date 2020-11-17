import { objectType, extendType, enumType } from '@nexus/schema'

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
    t.model.personId()
    t.model.projectId()
    //t.model.type()
  },
})

export const AccountQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('accounts', {
      type: 'Account',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.account.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
