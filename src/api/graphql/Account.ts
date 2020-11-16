<<<<<<< HEAD
import { objectType, extendType } from '@nexus/schema'
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
=======
import { objectType, extendType, enumType } from '@nexus/schema'

export const Account_Type = enumType({
    name: "Type",
    members: ["MAIN_ADMIN","ADMIN","VIEWER"]
  });
>>>>>>> b413341561acc131ad27055793ceb68e5419551c

export const Account = objectType({
    name: 'Account',
    definition(t) {
<<<<<<< HEAD
        t.model.id(),
        t.model.username()
    },
=======
        t.int('id')
        t.string('username')
        t.string('hashedPassword')
        t.int('personId')
        t.int('projectId')
    }
>>>>>>> b413341561acc131ad27055793ceb68e5419551c
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