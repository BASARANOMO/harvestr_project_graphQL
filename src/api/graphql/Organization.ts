import { objectType, extendType, enumType } from '@nexus/schema'

export const ENTITY_TYPE = enumType({
  name: 'entity_type',
  members: ['Person', 'Organization'],
})

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
    t.field('organizations', {
      type: 'Organization',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.organization.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
