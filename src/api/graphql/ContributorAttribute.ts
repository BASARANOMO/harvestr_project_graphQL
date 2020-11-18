import { objectType, extendType, enumType } from '@nexus/schema'

export const CONTRIBUTOR_ATTRIBUTE_TYPE = enumType({
  name: 'contributor_type',
  members: [
    'TEXT',
    'NUMERIC',
    'FINANCIAL',
    'DECIMAL',
    'RATING',
    'BOOLEAN',
    'DATE',
    'LIST',
    'URL',
  ],
})

export const ContributorAttribute = objectType({
  name: 'ContributorAttribute',
  definition(t) {
    t.model.projectId()
    t.model.id()
    //t.model.appliesTo()
    t.model.name()
    //t.model.type()
    t.model.project()
    //t.model.contributorAttributeValues()
  },
})

export const ContributorAttributeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('contributor_attributes', {
      type: 'ContributorAttribute',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.contributorAttribute.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
