import { objectType, extendType, stringArg } from "@nexus/schema";

export const ContributorAttributeValue = objectType({
	name: "ContributorAttributeValue",
	definition(t) {
		t.model.id();
		t.model.contributorAttributeId();
		t.model.contributorAttributeType()
		t.model.personId();
		t.model.organizationId();
		t.model.valuetext();
		t.model.contributorAttribute();
		t.model.organization()
		t.model.person()
	},
});

export const ContributorAttributeValueQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.contributorAttributeValues();
		t.crud.contributorAttributeValue();
	},
});

export const ContributorAttributeValueMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneContributorAttributeValue({
			alias: "createContributorAttributeValue",
		});

		t.crud.deleteOneContributorAttributeValue({
			alias: "deleteContributorAttributeValue",
		});

		t.crud.deleteManyContributorAttributeValue({
			alias: "deleteContributorAttributeValues",
		});
	},
});

