<template>
	<div>
		<h1>Message page</h1>
		<div v-if="loading">Queries are loading</div>
		<div v-else v-for="message in messages" :key="message.id">
			{{ message.content }}
		</div>
	</div>
</template>

<script>
import { useMessagesQuery } from "../composables/useMessages.js";

export default {
	setup() {
		const { messages, loading, error } = useMessagesQuery();

		return {
			messages,
			loading,
			error,
		};
	},
};
</script>

<style lang="scss" scoped></style>
