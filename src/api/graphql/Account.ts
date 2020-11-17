import { objectType, extendType, enumType } from '@nexus/schema'

export const Account_Type = enumType({
    name: "Type",
    members: ["MAIN_ADMIN","ADMIN","VIEWER"]
  });


export const Account = objectType({
    name: 'Account',
    definition(t) {
        t.model.id()
        t.model.username()
        t.model.hashedPassword()
        t.model.personId()
        t.model.projectId()
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