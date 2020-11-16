import { objectType, extendType } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'

export const Project = objectType({
    name: 'Project',
    definition(t) {
        t.int("id"),
        t.string("name")
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