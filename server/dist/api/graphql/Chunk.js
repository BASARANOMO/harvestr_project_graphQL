"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunckQuery = exports.Chunk = void 0;
const schema_1 = require("@nexus/schema");
exports.Chunk = schema_1.objectType({
    name: 'Chunk',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.model.message();
        //t.model.messageId()
        //t.model.discoveryId()
        t.model.discovery();
        t.model.message();
        t.model.project();
        t.model.textSelections();
    },
});
exports.ChunckQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('chunks', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'Chunk',
            resolve(_, args, ctx) {
                return ctx.prisma.chunk.findMany();
            },
        });
    },
});
//# sourceMappingURL=Chunk.js.map