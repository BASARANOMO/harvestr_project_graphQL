import { objectType, extendType, stringArg } from '@nexus/schema'

export const ContributorAttributeValue = objectType({
  name: 'ContributorAttributeValue',
  definition(t) {
    t.model.id()
    t.model.contributorAttributeId()
    //t.model.contributorAttributeType()
    t.model.personId()
    t.model.organizationId()
    t.model.valuetext()
    t.model.contributorAttribute()
    //t.model.organization()
    //t.model.person()
  },
})

export const ContributorAttributeValueQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('contributor_attribute_value', {
      args: {
        id: stringArg(),
      },
      type: 'ContributorAttributeValue',
      resolve(_, args, ctx) {
        return ctx.prisma.contributorAttributeValue.findMany()
      },
    })
  },
})
