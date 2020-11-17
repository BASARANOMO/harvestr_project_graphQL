import { objectType, extendType } from '@nexus/schema'

export const SubMessage = objectType({
    name: 'SubMessage',
    definition(t) {
        t.model.id()
        t.model.submitterId()
        t.model.content()
        t.model.messageId()
        t.model.message()
        t.model.person()
    },
})

export const SubMessageQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('sub_messages', {
            type: 'SubMessage',
            list: true,
            resolve(_, args, ctx) {
                return ctx.prisma.subMessage.findMany()
                //return [{id: 1, username: 'Jack'}]
            },
        })
    },
})