"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccount = exports.AccountQuery = exports.Account = exports.ACCOUNT_TYPE = void 0;
const schema_1 = require("@nexus/schema");
//import { PersonDistinctFieldEnum } from '@prisma/client'
//import { receiveMessageOnPort } from 'worker_threads'
//import { Person } from './Person'
//import { Project } from './Project'
exports.ACCOUNT_TYPE = schema_1.enumType({
    name: 'account_type',
    members: ['MAIN_ADMIN', 'ADMIN', 'VIEWER'],
});
exports.Account = schema_1.objectType({
    name: 'Account',
    definition(t) {
        t.model.id();
        t.model.username();
        //t.model.hashedPassword()
        t.model.project();
        t.model.person();
        t.field('type', { type: 'account_type' });
    },
});
exports.AccountQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('accounts', {
            // Call account as a function, with id as input
            // Le passer dans le findMany pour filtrer
            args: {},
            type: 'Account',
            //list: true,
            resolve(_, args, ctx) {
                return ctx.prisma.account.findMany();
                //return ctx.prisma.account.findMany({where: { id: 1 },})
                //return [{id: 1, username: 'Jack'}]
            },
        }),
            t.list.field('filterAccountsByUsername', {
                args: {
                    username: schema_1.stringArg({ nullable: false }),
                },
                type: 'Account',
                resolve(_, args, ctx) {
                    return ctx.prisma.account.findMany({
                        where: {
                            username: args.username,
                        },
                    });
                },
            });
    },
});
//https://nexusjs.org/docs/getting-started/tutorial/chapter-adding-mutations-to-your-api
// Creates new account
exports.addAccount = schema_1.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addAccountThenConnect', {
            type: 'Account',
            args: {
                username: schema_1.stringArg({ required: true }),
                hashedPassword: schema_1.stringArg({ required: true }),
                projectId: schema_1.intArg({ nullable: false }),
                personId: schema_1.intArg({ nullable: false }),
            },
            resolve(_, args, ctx) {
                return ctx.prisma.account.create({
                    data: {
                        username: args.username,
                        hashedPassword: args.hashedPassword,
                        person: {
                            connect: { id: args.personId },
                        },
                        project: {
                            connect: { id: args.projectId },
                        },
                    },
                });
            },
        });
        t.field('addAccount', {
            type: 'Account',
            args: {
                username: schema_1.stringArg({ required: true }),
                hashedPassword: schema_1.stringArg({ required: true }),
                projectId: schema_1.intArg({ nullable: false }),
                organizationId: schema_1.intArg({ nullable: false }),
                personId: schema_1.intArg({ nullable: false }),
                personName: schema_1.stringArg({ nullable: false }),
                projectName: schema_1.stringArg({ nullable: false }),
                email: schema_1.stringArg({ nullable: false }),
            },
            resolve(_, args, ctx) {
                return ctx.prisma.account.create({
                    data: {
                        username: args.username,
                        hashedPassword: args.hashedPassword,
                        person: {
                            connectOrCreate: {
                                where: {
                                    id: args.personId,
                                },
                                create: {
                                    name: args.personName,
                                    email: args.email,
                                    organization: {
                                        connectOrCreate: {
                                            where: {
                                                id: args.organizationId,
                                            },
                                            create: {
                                                name: args.projectName,
                                                project: {
                                                    connectOrCreate: {
                                                        where: {
                                                            id: args.projectId,
                                                        },
                                                        create: {
                                                            name: args.projectName,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    project: {
                                        connectOrCreate: {
                                            where: {
                                                id: args.projectId,
                                            },
                                            create: {
                                                name: args.projectName,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        project: {
                            connectOrCreate: {
                                where: {
                                    id: args.projectId,
                                },
                                create: {
                                    name: args.projectName,
                                },
                            },
                        },
                    },
                });
            },
        });
        t.field('updateAccount', {
            type: 'Account',
            nullable: true,
            args: {
                id: schema_1.intArg({ required: true }),
                username: schema_1.stringArg({ nullable: false }),
                hashedPassword: schema_1.stringArg({ nullable: false }),
            },
            resolve(_, args, ctx) {
                return ctx.prisma.account.update({
                    where: { id: args.id },
                    data: {
                        username: args.username,
                        hashedPassword: args.hashedPassword,
                    },
                });
            },
        });
    },
});
//# sourceMappingURL=Account.js.map