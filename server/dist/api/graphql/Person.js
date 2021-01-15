"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPerson = exports.PersonQuery = exports.Person = void 0;
const schema_1 = require("@nexus/schema");
exports.Person = schema_1.objectType({
    name: 'Person',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.model.name();
        t.model.email();
        //t.model.organizationId()
        t.model.organization();
        t.model.project();
        t.model.accounts();
        t.model.contributorAttributeValues();
        t.model.message_Message_requesterIdToPersons();
        t.model.message_Message_submitterIdToPersons();
        t.model.subMessages();
    },
});
exports.PersonQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('persons', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'Person',
            resolve(_, args, ctx) {
                return ctx.prisma.person.findMany();
            },
        });
    },
});
exports.createPerson = schema_1.extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.createOnePerson({
            alias: 'createPerson',
        });
    },
});
//# sourceMappingURL=Person.js.map