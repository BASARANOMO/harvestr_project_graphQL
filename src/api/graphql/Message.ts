import { objectType, extendType, stringArg } from '@nexus/schema'

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
    t.list.field('message', {
      // Call message as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {
        id: stringArg(),
      },
      type: 'Message',
      resolve(_, args, ctx) {
        return ctx.prisma.message.findMany()
        //return ctx.prisma.message.findMany({
        //  where: { id: 1 },
        //})
      },
    })
  },
})
