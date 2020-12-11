import { objectType, extendType, stringArg } from "@nexus/schema";

export const TextSelection = objectType({
	name: "TextSelection",
	definition(t) {
		t.model.id();
		t.model.offsetstart();
		t.model.length();
		t.model.submessagenumber();
		t.model.content();
		t.model.chunkId();
		t.model.chunk();
	},
});

export const TextSelectionQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.textSelections();
		t.crud.textSelection();
	},
});

export const TextSelectionMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneTextSelection({
			alias: "createTextSelection",
		});

		t.crud.deleteOneTextSelection({
			alias: "deleteTextSelection",
		});

		t.crud.deleteManyTextSelection({
			alias: "deleteTextSelections",
		});
	},
});

