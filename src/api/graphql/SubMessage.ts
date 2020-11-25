import { objectType, extendType, stringArg } from '@nexus/schema'

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
    t.list.field('sub_messages', {
      // Call sub_messages as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {
        id: stringArg(),
      },
      type: 'SubMessage',
      resolve(_, args, ctx) {
        return ctx.prisma.subMessage.findMany()
        //return ctx.prisma.subMessage.findMany({
        //  where: { id: 1 },
        //})
      },
    })
  },
})
