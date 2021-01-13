"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributorAttributeQuery = exports.ContributorAttribute = exports.ENTITY_TYPE = exports.CONTRIBUTOR_ATTRIBUTE_TYPE = void 0;
const schema_1 = require("@nexus/schema");
exports.CONTRIBUTOR_ATTRIBUTE_TYPE = schema_1.enumType({
    name: 'contributor_type',
    members: [
        'TEXT',
        'NUMERIC',
        'FINANCIAL',
        'DECIMAL',
        'RATING',
        'BOOLEAN',
        'DATE',
        'LIST',
        'URL',
    ],
});
exports.ENTITY_TYPE = schema_1.enumType({
    name: 'entity_type',
    members: ['Person', 'Organization'],
});
exports.ContributorAttribute = schema_1.objectType({
    name: 'ContributorAttribute',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.field('type', { type: 'entity_type' });
        t.model.name();
        t.field('type', { type: 'contributor_type' });
        t.model.project();
        t.model.contributorAttributeValues();
    },
});
exports.ContributorAttributeQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('contributor_attributes', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'ContributorAttribute',
            resolve(_, args, ctx) {
                return ctx.prisma.contributorAttribute.findMany();
            },
        });
    },
});
//# sourceMappingURL=ContributorAttribute.js.map