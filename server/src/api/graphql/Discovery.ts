import { objectType, extendType, stringArg } from "@nexus/schema";

export const Discovery = objectType({
	name: "Discovery",
	definition(t) {
		t.model.projectId();
		t.model.id();
		t.model.title();
		t.model.description();
		t.model.project();
		t.model.chunks();
	},
});

export const DiscoveryQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.discoveries();
		t.crud.discovery();
	},
});

export const DiscoveryMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneDiscovery({
			alias: "createDiscovery",
		});

		t.crud.deleteOneDiscovery({
			alias: "deleteDiscovery",
		});

		t.crud.deleteManyDiscovery({
			alias: "deleteDiscoverys",
		});
	},
});
