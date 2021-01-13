<template>
	<div>
		<h1>Persons page</h1>
		<div v-if="loading">Queries are loading</div>
		<div v-else v-for="person in persons" :key="person.id">{{person.name}}</div>
	</div>
</template>

<script>
import { usePersonsQuery } from "../composables/usePersons";

export default {
	setup() {
		const { persons, loading, error } = usePersonsQuery();

		return {
			persons,
			loading,
			error,
		};
	},
};
</script>

<style lang="scss" scoped></style>
