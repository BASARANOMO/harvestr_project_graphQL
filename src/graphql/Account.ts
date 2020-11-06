import { objectType, extendType } from '@nexus/schema'

export const Account = objectType({
    name: 'Account',
    definition(t) {
        t.int('id')
        t.string('username')
    },
})

export const AccountQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('accounts', {
            type: 'Account',
            list: true,
            resolve(_, args, ctx) {
                //return ctx.prisma.account.findMany()
                return [{id: 1, username: 'Jack'}]
            },
        })
    },
})