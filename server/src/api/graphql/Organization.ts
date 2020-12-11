import { objectType, extendType, stringArg } from "@nexus/schema";

export const Organization = objectType({
	name: "Organization",
	definition(t) {
		t.model.projectId();
		t.model.id();
		t.model.name();
		t.model.project();
		t.model.contributorAttributeValues();
		t.model.persons()
	},
});

export const OrganizationQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.organizations();
		t.crud.organization();
	},
});

export const OrganizationMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneOrganization({
			alias: "createOrganization",
		});

		t.crud.deleteOneOrganization({
			alias: "deleteOrganization",
		});

		t.crud.deleteManyOrganization({
			alias: "deleteOrganizations",
		});
	},
});

