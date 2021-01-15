import { objectType, extendType, stringArg } from '@nexus/schema'

export const Chunk = objectType({
  name: 'Chunk',
  definition(t) {
    //t.model.projectId()
    t.model.id()
    t.model.message()
    //t.model.messageId()
    //t.model.discoveryId()
    t.model.discovery()
    t.model.message()
    t.model.project()
    t.model.textSelections()
  },
})

export const ChunckQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('chunks', {
      args: {
        id: stringArg(),
      },
      type: 'Chunk',
      resolve(_, args, ctx) {
        return ctx.prisma.chunk.findMany()
      },
    })
  },
})
