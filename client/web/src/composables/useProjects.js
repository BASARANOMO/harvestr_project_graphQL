import { useQuery, useResult } from "@vue/apollo-composable";
import projectsQuery from "@/graphql/queries/projects.gql";

export const useProjectsQuery = function() {
	const { result, loading, error, onResult, onError } = useQuery(projectsQuery);
	const projects = useResult(result, null, (data) => data.projects);

	return {
		// States
		projects,
		loading,
		error,

		// Event hooks
		onResult,
		onError,
	};
};
