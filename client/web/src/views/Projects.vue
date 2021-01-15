<template>
	<div>
		<h1>Project page</h1>
		<div v-if="loading">Queries are loading</div>
		<div v-else v-for="project in projects" :key="project.id">
			{{ project.name }}
		</div>
	</div>
</template>

<script>
import { useProjectsQuery } from "@/composables/useProjects.js";

export default {
	setup() {
		const { projects, loading, error } = useProjectsQuery();

		return { projects, loading, error };
	},
};
</script>

<style lang="scss" scoped></style>
