"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributorAttributeValueQuery = exports.ContributorAttributeValue = void 0;
const schema_1 = require("@nexus/schema");
exports.ContributorAttributeValue = schema_1.objectType({
    name: 'ContributorAttributeValue',
    definition(t) {
        t.model.id();
        //t.model.contributorAttributeId()
        //t.model.contributorAttributeType()
        //t.model.personId()
        //t.model.organizationId()
        t.model.valuetext();
        t.model.contributorAttribute();
        t.model.organization();
        t.model.person();
    },
});
exports.ContributorAttributeValueQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('contributor_attribute_value', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'ContributorAttributeValue',
            resolve(_, args, ctx) {
                return ctx.prisma.contributorAttributeValue.findMany();
            },
        });
    },
});
//# sourceMappingURL=ContributorAttributeValue.js.map