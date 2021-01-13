"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSelectionQuery = exports.TextSelection = void 0;
const schema_1 = require("@nexus/schema");
exports.TextSelection = schema_1.objectType({
    name: 'TextSelection',
    definition(t) {
        t.model.id();
        t.model.offsetstart();
        t.model.length();
        t.model.submessagenumber();
        t.model.content();
        //t.model.chunkId()
        t.model.chunk();
    },
});
exports.TextSelectionQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('text_selection', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'TextSelection',
            resolve(_, args, ctx) {
                return ctx.prisma.textSelection.findMany();
            },
        });
    },
});
//# sourceMappingURL=TextSelection.js.map