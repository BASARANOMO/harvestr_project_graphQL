import { objectType, extendType, stringArg } from '@nexus/schema'

export const Person = objectType({
  name: 'Person',
  definition(t) {
    t.model.projectId()
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.organizationId()
    t.model.organization()
    t.model.project()
    t.model.accounts()
    t.model.contributorAttributeValues()
    t.model.message_Message_requesterIdToPersons()
    t.model.message_Message_submitterIdToPersons()
    //t.model.subMessages()
  },
})

export const PersonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('persons', {
      // Call persons as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {
        id: stringArg(),
      },
      type: 'Person',
      resolve(_, args, ctx) {
        return ctx.prisma.person.findMany()
        //return ctx.prisma.person.findMany({
        //  where: { id: 1 },
        //})
      },
    })
  },
})

export const createPerson = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePerson({
      alias: 'createPerson',
    })
  },
})
