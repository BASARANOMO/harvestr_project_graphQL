import { objectType, extendType, enumType } from '@nexus/schema'

export const Account_Type = enumType({
    name: "Type",
    members: ["MAIN_ADMIN","ADMIN","VIEWER"]
  });


export const Account = objectType({
    name: 'Account',
    definition(t) {
        t.int("id"),
        t.string("username"),
        t.string("hashedPassword"),
        t.int("personId"),
        t.int("projectId")
    },
})


export const AccountQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('accounts', {
            type: 'Account',
            list: true,
            resolve(_, args, ctx) {
                return ctx.prisma.account.findMany()
                //return [{id: 1, username: 'Jack'}]
            },
        })
    },
})