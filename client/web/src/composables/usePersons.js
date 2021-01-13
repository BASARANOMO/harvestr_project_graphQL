import { useResult, useQuery } from "@vue/apollo-composable";
import personsQuery from "../graphql/queries/persons.gql"

export const usePersonsQuery = function(){
    const {result, loading, error,onResult, onError } = useQuery(personsQuery)
    const persons = useResult(result, null, (data ) => data.persons)
    
    return {
        // States
        persons,
        loading,
        error,
        
        // Even Hooks
        onError,
        onResult
    }
}