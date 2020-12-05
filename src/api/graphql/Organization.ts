import { objectType, extendType, stringArg } from '@nexus/schema'

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.model.projectId()
    t.model.id()
    t.model.name()
    t.model.project()
    t.model.contributorAttributeValues()
    //t.model.persons()
  },
})

export const OrganizationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('organizations', {
      args: {
        id: stringArg(),
      },
      type: 'Organization',
      resolve(_, args, ctx) {
        return ctx.prisma.organization.findMany()
      },
    })
  },
})
