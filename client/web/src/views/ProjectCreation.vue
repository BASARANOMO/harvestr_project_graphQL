<template>
	<div>
		<h1>Project Mutation</h1>
		<button @click="createProject({ name: NameOfProject })">
			Creer
		</button>
	</div>
</template>

<script>
import { useResult, useMutation } from "@vue/apollo-composable";
import createProjectMutation from "../graphql/mutations/createProject.gql";

export default {
	setup() {
		// States

		const nameOfProject = "Project created from the front with a button";

		// Mutation
		const { mutate: createProject } = useMutation(
			createProjectMutation,
			(nameOfProject) => ({
				data: {
					name: nameOfProject,
				},
			})
		);

		return {
			nameOfProject,
			createProject,
		};
	},
};
</script>

<style lang="scss" scoped></style>
