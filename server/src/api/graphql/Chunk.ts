import { objectType, extendType, stringArg } from "@nexus/schema";

export const Chunk = objectType({
	name: "Chunk",
	definition(t) {
		t.model.projectId();
		t.model.id();
		t.model.messageId();
		t.model.discoveryId();
		t.model.discovery()
		t.model.message()
		t.model.project()
		t.model.textSelections()
	},
});

export const ChunkQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.chunks();
		t.crud.chunk();
	},
});

export const ChunkMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneChunk({
			alias: "createChunk",
		});

		t.crud.deleteOneChunk({
			alias: "deleteChunk",
		});

		t.crud.deleteManyChunk({
			alias: "deleteChunks",
		});
	},
});

