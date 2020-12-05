import { objectType, extendType, stringArg, intArg } from '@nexus/schema'

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
      args: {
        id: stringArg(),
      },
      type: 'Project',
      resolve(_, args, ctx) {
        return ctx.prisma.project.findMany()
      },
    })
  },
})

/*
 * cascade delete not supported
 * first delete referencing row then delete referenced row
 */
export const deleteProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteProject', {
      type: 'Project',
      args: {
        id: intArg({ required: true }),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.project.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

export const createProject = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneProject({
      alias: 'createProject',
    })
  },
})
