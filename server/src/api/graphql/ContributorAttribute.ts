import { objectType, extendType, enumType, stringArg } from "@nexus/schema";

export const CONTRIBUTOR_ATTRIBUTE_TYPE = enumType({
	name: "contributor_type",
	members: [
		"TEXT",
		"NUMERIC",
		"FINANCIAL",
		"DECIMAL",
		"RATING",
		"BOOLEAN",
		"DATE",
		"LIST",
		"URL",
	],
});

export const ENTITY_TYPE = enumType({
	name: "entity_type",
	members: ["Person", "Organization"],
});

export const ContributorAttribute = objectType({
	name: "ContributorAttribute",
	definition(t) {
		t.model.projectId();
		t.model.id();
		t.field("type", { type: "entity_type" });
		t.model.name();
		t.field("type", { type: "contributor_type" });
		t.model.project();
		t.model.contributorAttributeValues()
	},
});

export const ContributorAttributeQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.contributorAttributes();
		t.crud.contributorAttribute();
	},
});

export const ContributorAttributeMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneContributorAttribute({
			alias: "createContributorAttribute",
		});

		t.crud.deleteOneContributorAttribute({
			alias: "deleteContributorAttribute",
		});

		t.crud.deleteManyContributorAttribute({
			alias: "deleteContributorAttributes",
		});
	},
});

