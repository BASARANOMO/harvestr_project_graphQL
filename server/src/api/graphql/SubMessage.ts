import { objectType, extendType, stringArg } from '@nexus/schema'

export const SubMessage = objectType({
  name: 'SubMessage',
  definition(t) {
    t.model.id()
    //t.model.submitterId()
    t.model.content()
    //t.model.messageId()
    t.model.message()
    t.model.person()
  },
})

export const SubMessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('sub_messages', {
      args: {
        id: stringArg(),
      },
      type: 'SubMessage',
      resolve(_, args, ctx) {
        return ctx.prisma.subMessage.findMany()
      },
    })
  },
})
