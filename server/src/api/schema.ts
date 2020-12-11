// api/schema.ts
import { makeSchema } from "@nexus/schema";
import { nexusPrisma } from "nexus-plugin-prisma";
import { join } from "path";
import * as types from "./graphql";

export const schema = makeSchema({
	types, // 1
	plugins: [nexusPrisma({ experimentalCRUD: true })],
	outputs: {
		typegen: join(__dirname, "../../nexus-typegen.ts"), // 2
		schema: join(__dirname, "../../generated/schema.graphql"), // 3
	},
	typegenAutoConfig: {
		contextType: "Context.Context",
		sources: [
			{
				source: "@prisma/client",
				alias: "prisma",
			},
			{
				source: require.resolve("./context"),
				alias: "Context",
			},
		],
	},
});

/*

typegenAutoConfig: {
		sources: [
			{
				source: join(__dirname, "./context.ts"), // 1
				alias: "ContextModule", // 2
			},
		],
		contextType: "ContextModule.Context", // 3
	},
	
	*/
