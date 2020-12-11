import { objectType, extendType, stringArg } from "@nexus/schema";

export const Message = objectType({
	name: "Message",
	definition(t) {
		t.model.projectId();
		t.model.id();
		t.model.requesterId();
		t.model.submitterId();
		t.model.clientId();
		t.model.title();
		t.model.content();
		t.model.project();
		t.model.person_Message_requesterIdToPerson()
		t.model.person_Message_submitterIdToPerson()
		t.model.chunks();
		t.model.subMessages()
	},
});

export const MessageQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.messages();
		t.crud.message();
	},
});

export const MessageMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneMessage({
			alias: "createMessage",
		});

		t.crud.deleteOneMessage({
			alias: "deleteMessage",
		});

		t.crud.deleteManyMessage({
			alias: "deleteMessages",
		});
	},
});

