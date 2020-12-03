import { objectType, extendType, stringArg } from '@nexus/schema'

export const Discovery = objectType({
  name: 'Discovery',
  definition(t) {
    t.model.projectId()
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.project()
    t.model.chunks()
  },
})

export const DiscoveryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('discovery', {
      args: {
        id: stringArg(),
      },
      type: 'Discovery',
      resolve(_, args, ctx) {
        return ctx.prisma.discovery.findMany()
      },
    })
  },
})
