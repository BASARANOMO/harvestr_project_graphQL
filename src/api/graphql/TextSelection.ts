import { objectType, extendType, stringArg } from '@nexus/schema'

export const TextSelection = objectType({
  name: 'TextSelection',
  definition(t) {
    t.model.id()
    t.model.offsetstart()
    t.model.length()
    t.model.submessagenumber()
    t.model.content()
    //t.model.chunkId()
    t.model.chunk()
  },
})

export const TextSelectionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('text_selection', {
      args: {
        id: stringArg(),
      },
      type: 'TextSelection',
      resolve(_, args, ctx) {
        return ctx.prisma.textSelection.findMany()
      },
    })
  },
})
