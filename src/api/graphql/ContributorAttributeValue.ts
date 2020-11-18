import { objectType, extendType } from '@nexus/schema'

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
    t.field('contributor_attribute_value', {
      type: 'ContributorAttributeValue',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.contributorAttributeValue.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
