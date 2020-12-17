import { DocumentNode } from 'graphql';
import { DocumentParameter, VariablesParameter, OptionsParameter, UseQueryOptions } from './useQuery';
export declare function useLazyQuery<TResult = any, TVariables = any>(document: DocumentParameter, variables?: VariablesParameter<TVariables>, options?: OptionsParameter<TResult, TVariables>): {
    load: (document?: DocumentNode, variables?: TVariables, options?: UseQueryOptions) => void;
    result: import("vue-demi").Ref<TResult>;
    loading: import("vue-demi").Ref<boolean>;
    networkStatus: import("vue-demi").Ref<number>;
    error: import("vue-demi").Ref<Error>;
    start: () => void;
    stop: () => void;
    restart: () => void;
    forceDisabled: import("vue-demi").Ref<boolean>;
    document: import("vue-demi").Ref<DocumentNode>;
    variables: import("vue-demi").Ref<TVariables>;
    options: UseQueryOptions<TResult, TVariables> | import("vue-demi").Ref<UseQueryOptions<TResult, TVariables>>;
    query: import("vue-demi").Ref<import("@apollo/client/core").ObservableQuery<TResult, TVariables>>;
    refetch: (variables?: TVariables) => Promise<import("@apollo/client/core").ApolloQueryResult<TResult>>;
    fetchMore: <K extends keyof TVariables>(options: import("@apollo/client/core").FetchMoreQueryOptions<TVariables, K, any> & import("@apollo/client/core").FetchMoreOptions<TResult, TVariables>) => Promise<import("@apollo/client/core").ApolloQueryResult<TResult>>;
    subscribeToMore: <TSubscriptionVariables = Record<string, any>, TSubscriptionData = TResult>(options: import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData> | import("vue-demi").Ref<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>> | import("./util/ReactiveFunction").ReactiveFunction<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>>) => void;
    onResult: (fn: (param: import("@apollo/client/core").ApolloQueryResult<TResult>) => void) => {
        off: () => void;
    };
    onError: (fn: (param: Error) => void) => {
        off: () => void;
    };
};
