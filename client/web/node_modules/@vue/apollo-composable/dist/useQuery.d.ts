import { Ref } from 'vue-demi';
import { DocumentNode } from 'graphql';
import { OperationVariables, WatchQueryOptions, ObservableQuery, ApolloQueryResult, SubscribeToMoreOptions, FetchMoreQueryOptions, FetchMoreOptions } from '@apollo/client/core';
import { ReactiveFunction } from './util/ReactiveFunction';
export interface UseQueryOptions<TResult = any, TVariables = OperationVariables> extends Omit<WatchQueryOptions<TVariables>, 'query' | 'variables'> {
    clientId?: string;
    enabled?: boolean;
    throttle?: number;
    debounce?: number;
    prefetch?: boolean;
}
export declare type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
export declare type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>;
export declare type OptionsParameter<TResult, TVariables> = UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>> | ReactiveFunction<UseQueryOptions<TResult, TVariables>>;
export interface UseQueryReturn<TResult, TVariables> {
    result: Ref<TResult>;
    loading: Ref<boolean>;
    networkStatus: Ref<number>;
    error: Ref<Error>;
    start: () => void;
    stop: () => void;
    restart: () => void;
    forceDisabled: Ref<boolean>;
    document: Ref<DocumentNode>;
    variables: Ref<TVariables>;
    options: UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>>;
    query: Ref<ObservableQuery<TResult, TVariables>>;
    refetch: (variables?: TVariables) => Promise<ApolloQueryResult<TResult>>;
    fetchMore: <K extends keyof TVariables>(options: FetchMoreQueryOptions<TVariables, K> & FetchMoreOptions<TResult, TVariables>) => Promise<ApolloQueryResult<TResult>>;
    subscribeToMore: <TSubscriptionVariables = OperationVariables, TSubscriptionData = TResult>(options: SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData> | Ref<SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>> | ReactiveFunction<SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>>) => void;
    onResult: (fn: (param: ApolloQueryResult<TResult>) => void) => {
        off: () => void;
    };
    onError: (fn: (param: Error) => void) => {
        off: () => void;
    };
}
/**
 * Use a query that does not require variables or options.
 * */
export declare function useQuery<TResult = any>(document: DocumentParameter): UseQueryReturn<TResult, undefined>;
/**
 * Use a query that has optional variables but not options
 */
export declare function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter): UseQueryReturn<TResult, TVariables>;
/**
 * Use a query that has required variables but not options
 */
export declare function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>): UseQueryReturn<TResult, TVariables>;
/**
 * Use a query that requires options but not variables.
 */
export declare function useQuery<TResult = any>(document: DocumentParameter, variables: undefined | null, options: OptionsParameter<TResult, null>): UseQueryReturn<TResult, null>;
/**
 * Use a query that requires variables and options.
 */
export declare function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>, options: OptionsParameter<TResult, TVariables>): UseQueryReturn<TResult, TVariables>;
export declare function useQueryImpl<TResult, TVariables extends OperationVariables>(document: DocumentParameter, variables?: VariablesParameter<TVariables>, options?: OptionsParameter<TResult, TVariables>, lazy?: boolean): UseQueryReturn<TResult, TVariables>;
