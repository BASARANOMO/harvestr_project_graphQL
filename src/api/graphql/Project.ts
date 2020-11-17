import { objectType, extendType } from '@nexus/schema'

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
    t.field('projects', {
      type: 'Project',
      list: true,
      resolve(_, args, ctx) {
        return ctx.prisma.project.findMany()
        //return [{id: 1, username: 'Jack'}]
      },
    })
  },
})
