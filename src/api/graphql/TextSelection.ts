import { objectType, extendType, stringArg } from '@nexus/schema'

export const TextSelection = objectType({
  name: 'TextSelection',
  definition(t) {
    t.model.id()
    t.model.offsetstart()
    t.model.length()
    t.model.submessagenumber()
    t.model.content()
    t.model.chunkId()
    t.model.chunk()
  },
})

export const TextSelectionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('text_selection', {
      // Call text_selection as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {
        id: stringArg(),
      },
      type: 'TextSelection',
      resolve(_, args, ctx) {
        return ctx.prisma.textSelection.findMany()
        //return ctx.prisma.textSelection.findMany({
        //  where: { id: 1 },
        //})
      },
    })
  },
})
