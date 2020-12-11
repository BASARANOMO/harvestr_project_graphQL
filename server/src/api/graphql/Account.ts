import {
	objectType,
	extendType,
	enumType,
	stringArg,
	idArg,
	intArg,
} from "@nexus/schema";
import { receiveMessageOnPort } from "worker_threads";
import { Person } from "./Person";
import { Project } from "./Project";

export const ACCOUNT_TYPE = enumType({
	name: "account_type",
	members: ["MAIN_ADMIN", "ADMIN", "VIEWER"],
});

export const Account = objectType({
	name: "Account",
	definition(t) {
		t.model.id();
		t.model.username();
		t.model.hashedPassword();
		t.model.project();
		t.model.person();
		t.field("type", { type: "account_type" });
	},
});

export const AccountQuery = extendType({
	type: "Query",
	definition(t) {
		t.crud.accounts();
		t.crud.account();
	},
});

export const AccountMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.crud.createOneAccount({
			alias: "createAccount",
		});

		t.crud.deleteOneAccount({
			alias: "deleteAccount",
		});

		t.crud.deleteManyAccount({
			alias: "deleteAccounts",
		});
	},
});
