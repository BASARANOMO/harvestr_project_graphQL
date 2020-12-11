import { objectType, extendType, stringArg, intArg } from "@nexus/schema";

export const Project = objectType({
	name: "Project",
	definition(t) {
		t.model.id();
		t.model.name();
		t.model.accounts();
		t.model.chunks();
		t.model.contributorAttributes();
		t.model.discoverys();
		t.model.messages();
		t.model.organizations();
		t.model.persons();
	},
});

export const ProjectQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.projects();
		t.crud.project();
	},
});

export const ProjectMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneProject({
			alias: "createProject",
		});

		t.crud.deleteOneProject({
			alias: "deleteProject",
		});

		t.crud.deleteManyProject({
			alias: "deleteProjects",
		});
	},
});
