<template>
	<div>
		<h1>Account page</h1>
		<div v-if="loading">Queries are loading</div>
		<div v-else v-for="account in accounts" :key="account.id">
			{{ account.username }}
		</div>
	</div>
</template>

<script>
import { useAccountsQuery } from "../composables/useAccounts";

export default {
	setup() {
		const { accounts, loading, error } = useAccountsQuery();

		return { accounts, loading, error };
	},
};
</script>

<style></style>
