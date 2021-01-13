import { useQuery, useResult } from "@vue/apollo-composable";
import messagesQuery from "../graphql/queries/messages.gql";

export const useMessagesQuery = function() {
	const { result, loading, error, onResult, onError } = useQuery(messagesQuery);
	const messages = useResult(result, null, (data) => data.messages);

	return {
		// States
		messages,
		loading,
		error,

		// Event hooks
		onResult,
		onError,
	};
};
