"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.ProjectQuery = exports.Project = void 0;
const schema_1 = require("@nexus/schema");
exports.Project = schema_1.objectType({
    name: 'Project',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.accounts();
        t.model.chunks();
        t.model.contributorAttributes();
        t.model.discoverys();
        t.model.messages();
        //t.model.organizations()
        //t.model.persons()
    },
});
exports.ProjectQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('projects', {
            type: 'Project',
            resolve(_, args, ctx) {
                return ctx.prisma.project.findMany();
            },
        }),
            t.list.field('project', {
                args: {
                    id: schema_1.intArg({ nullable: false }),
                },
                type: 'Project',
                resolve(_, args, ctx) {
                    return ctx.prisma.project.findMany({
                        where: {
                            id: args.id,
                        },
                    });
                },
            });
    },
});
/*
 * cascade delete not supported
 * first delete referencing row then delete referenced row
 */
exports.deleteProject = schema_1.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('deleteProject', {
            type: 'Project',
            args: {
                id: schema_1.intArg({ required: true }),
            },
            resolve(_, args, ctx) {
                return ctx.prisma.project.delete({
                    where: { id: args.id },
                });
            },
        });
        t.crud.createOneProject({
            alias: 'createProject',
        });
    },
});
//# sourceMappingURL=Project.js.map