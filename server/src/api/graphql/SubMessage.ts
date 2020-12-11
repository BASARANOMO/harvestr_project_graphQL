import { objectType, extendType, stringArg } from "@nexus/schema";

export const SubMessage = objectType({
	name: "SubMessage",
	definition(t) {
		t.model.id();
		t.model.submitterId();
		t.model.content();
		t.model.messageId();
		t.model.message();
		t.model.person();
	},
});

/* export const SubMessageQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.SubMessages();
		t.crud.SubMessage();
	},
}); */

/*
export const SubMessageMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneSubMessage({
			alias: "createSubMessage",
		});

		t.crud.deleteOneSubMessage({
			alias: "deleteSubMessage",
		});

		t.crud.deleteManySubMessage({
			alias: "deleteSubMessages",
		});
	},
});
*/
