import { objectType, extendType } from '@nexus/schema'

export const Message = objectType({
    name: 'Message',
    definition(t) {
        t.model.projectId()
        t.model.id()
        t.model.requesterId()
        t.model.submitterId()
        t.model.clientId()
        t.model.title()
        t.model.content()
        t.model.project()
        //t.model.person_Message_requesterIdToPerson()
        //t.model.person_Message_submitterIdToPerson()
        t.model.chunks()
        //t.model.subMessages()
    },
})

export const MessageQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('message', {
            type: 'Message',
            list: true,
            resolve(_, args, ctx) {
                return ctx.prisma.message.findMany()
                //return [{id: 1, username: 'Jack'}]
            },
        })
    },
})