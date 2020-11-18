import { objectType, extendType } from '@nexus/schema'

export const Chunk = objectType({
  name: 'Chunk',
  definition(t) {
    t.model.projectId()
    t.model.id()
    t.model.messageId()
    t.model.discoveryId()
    // t.model.discovery()
    // t.model.message()
    // t.model.project()
    //t.model.textSelections()
  },
})

export const ChunckQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('chunks', {
      type: 'Chunk',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.chunk.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
