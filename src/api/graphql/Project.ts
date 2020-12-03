import { objectType, extendType, stringArg } from '@nexus/schema'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.accounts()
    t.model.chunks()
    t.model.contributorAttributes()
    t.model.discoverys()
    t.model.messages()
    //t.model.organizations()
    //t.model.persons()
  },
})

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('projects', {
      // Call projects as a function, with id as input
      // Le passer dans le findMany pour filtrer
      args: {
        id: stringArg(),
      },
      type: 'Project',
      resolve(_, args, ctx) {
        return ctx.prisma.project.findMany()
        //return ctx.prisma.project.findMany({where: { id: 1 },})
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})

export const createProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProject({
      alias: 'createProject'
    })
  }
})