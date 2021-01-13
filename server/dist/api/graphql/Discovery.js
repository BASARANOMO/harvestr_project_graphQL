"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryQuery = exports.Discovery = void 0;
const schema_1 = require("@nexus/schema");
exports.Discovery = schema_1.objectType({
    name: 'Discovery',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.model.title();
        t.model.description();
        t.model.project();
        t.model.chunks();
    },
});
exports.DiscoveryQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('discovery', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'Discovery',
            resolve(_, args, ctx) {
                return ctx.prisma.discovery.findMany();
            },
        });
    },
});
//# sourceMappingURL=Discovery.js.map