"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageQuery = exports.Message = void 0;
const schema_1 = require("@nexus/schema");
exports.Message = schema_1.objectType({
    name: 'Message',
    definition(t) {
        //t.model.projectId()
        t.model.id();
        t.model.person_Message_requesterIdToPerson();
        //t.model.requesterId()
        t.model.person_Message_submitterIdToPerson();
        //t.model.submitterId()
        //t.model.clientId()
        t.model.title();
        t.model.content();
        t.model.project();
        //t.model.person_Message_requesterIdToPerson()
        //t.model.person_Message_submitterIdToPerson()
        t.model.chunks();
        //t.model.subMessages()
    },
});
exports.MessageQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('message', {
            args: {
                id: schema_1.stringArg(),
            },
            type: 'Message',
            resolve(_, args, ctx) {
                return ctx.prisma.message.findMany();
            },
        });
    },
});
//# sourceMappingURL=Message.js.map