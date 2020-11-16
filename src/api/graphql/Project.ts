import { objectType, extendType } from '@nexus/schema'
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"

export const Project = objectType({
    name: 'Project',
    definition(t) {
        t.model.id(),
        t.model.name()
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