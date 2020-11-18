import { objectType, extendType } from '@nexus/schema'

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
    t.field('discovery', {
      type: 'Discovery',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.discovery.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
