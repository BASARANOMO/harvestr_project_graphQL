"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationQuery = exports.Organization = void 0;
const schema_1 = require("@nexus/schema");
exports.Organization = schema_1.objectType({
    name: 'Organization',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.model.name();
        t.model.project();
        t.model.contributorAttributeValues();
        t.model.persons();
    },
});
exports.OrganizationQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('organizations', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'Organization',
            resolve(_, args, ctx) {
                return ctx.prisma.organization.findMany();
            },
        });
    },
});
//# sourceMappingURL=Organization.js.map