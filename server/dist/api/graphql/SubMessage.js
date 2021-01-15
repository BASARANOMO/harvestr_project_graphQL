"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMessageQuery = exports.SubMessage = void 0;
const schema_1 = require("@nexus/schema");
exports.SubMessage = schema_1.objectType({
    name: 'SubMessage',
    definition(t) {
        t.model.id();
        //t.model.submitterId()
        t.model.content();
        //t.model.messageId()
        t.model.message();
        t.model.person();
    },
});
exports.SubMessageQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('sub_messages', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'SubMessage',
            resolve(_, args, ctx) {
                return ctx.prisma.subMessage.findMany();
            },
        });
    },
});
//# sourceMappingURL=SubMessage.js.map