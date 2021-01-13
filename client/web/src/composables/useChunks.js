import { useQuery, useResult } from "@vue/apollo-composable";
import chunksQuery from "@/graphql/queries/chunks.gql"

export const useChunksQuery = function(){
    const { result, loading, error, onResult, onError} = useQuery(chunksQuery);
    const chunks = useResult(result, null, (data ) => data.chunks)
    
    return {
        // State
        chunks,
        loading,
        error,
        
        // Event hooks
        onError,
        onResult
    }
}