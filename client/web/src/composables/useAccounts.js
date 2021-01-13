import { useQuery, useResult } from "@vue/apollo-composable";
import accountsQuery from "../graphql/queries/accounts.gql";

export const useAccountsQuery = function() {
	const { result, loading, error, onResult, onError } = useQuery(accountsQuery);
	const accounts = useResult(result, null, (data) => data.accounts);

	return {
		// States
		accounts,
		loading,
		error,

		// Event Hooks
		onResult,
		onError,
	};
};
