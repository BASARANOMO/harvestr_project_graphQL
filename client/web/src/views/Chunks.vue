<template>
	<div>
		<h1>Chunk page</h1>
		<div v-if="loading">Queries are loading</div>
		<div v-else v-for="chunk in chunks" :key="chunk.id">
			{{ chunk.message.content }}
		</div>
	</div>
</template>

<script>
import { useChunksQuery } from "@/composables/useChunks";

export default {
	setup() {
		const { chunks, loading, error } = useChunksQuery();

		return {
			chunks,
			loading,
			error,
		};
	},
};
</script>

<style lang="scss" scoped></style>
