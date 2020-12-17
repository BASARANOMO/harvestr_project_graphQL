/// <reference types="zen-observable" />
declare module "useApolloClient" {
    import { ApolloClient } from '@apollo/client/core';
    export const DefaultApolloClient: unique symbol;
    export const ApolloClients: unique symbol;
    type ClientId = string;
    type ResolveClient<TCacheShape, TReturn = ApolloClient<TCacheShape>> = (clientId?: ClientId) => TReturn;
    export interface UseApolloClientReturn<TCacheShape> {
        resolveClient: ResolveClient<TCacheShape>;
        readonly client: ApolloClient<TCacheShape>;
    }
    export function useApolloClient<TCacheShape = any>(clientId?: ClientId): UseApolloClientReturn<TCacheShape>;
    export function provideApolloClient<TCacheShape = any>(client: ApolloClient<TCacheShape>): <TFnResult = any>(fn: () => TFnResult) => TFnResult;
}
declare module "util/ReactiveFunction" {
    export type ReactiveFunction<TParam> = () => TParam;
}
declare module "util/paramToRef" {
    import { Ref } from 'vue-demi';
    import { ReactiveFunction } from "util/ReactiveFunction";
    export function paramToRef<T>(param: T | Ref<T> | ReactiveFunction<T>): Ref<T>;
}
declare module "util/paramToReactive" {
    import { Ref } from 'vue-demi';
    import { ReactiveFunction } from "util/ReactiveFunction";
    export function paramToReactive<T extends object>(param: T | Ref<T> | ReactiveFunction<T>): T | Ref<T>;
}
declare module "util/useEventHook" {
    export function useEventHook<TParam = any>(): {
        on: (fn: (param: TParam) => void) => {
            off: () => void;
        };
        off: (fn: (param: TParam) => void) => void;
        trigger: (param: TParam) => void;
    };
}
declare module "util/loadingTracking" {
    import { Ref } from 'vue-demi';
    export interface LoadingTracking {
        queries: Ref<number>;
        mutations: Ref<number>;
        subscriptions: Ref<number>;
    }
    export interface AppLoadingTracking extends LoadingTracking {
        components: Map<any, LoadingTracking>;
    }
    export function getAppTracking(): {
        appTracking: AppLoadingTracking;
    };
    export function getCurrentTracking(): {
        appTracking: AppLoadingTracking;
        tracking: LoadingTracking;
    };
    export function trackQuery(loading: Ref<boolean>): void;
    export function trackMutation(loading: Ref<boolean>): void;
    export function trackSubscription(loading: Ref<boolean>): void;
}
declare module "useQuery" {
    import { Ref } from 'vue-demi';
    import { DocumentNode } from 'graphql';
    import { OperationVariables, WatchQueryOptions, ObservableQuery, ApolloQueryResult, SubscribeToMoreOptions, FetchMoreQueryOptions, FetchMoreOptions } from '@apollo/client/core';
    import { ReactiveFunction } from "util/ReactiveFunction";
    export interface UseQueryOptions<TResult = any, TVariables = OperationVariables> extends Omit<WatchQueryOptions<TVariables>, 'query' | 'variables'> {
        clientId?: string;
        enabled?: boolean;
        throttle?: number;
        debounce?: number;
        prefetch?: boolean;
    }
    export type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
    export type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>;
    export type OptionsParameter<TResult, TVariables> = UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>> | ReactiveFunction<UseQueryOptions<TResult, TVariables>>;
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
    export function useQuery<TResult = any>(document: DocumentParameter): UseQueryReturn<TResult, undefined>;
    /**
     * Use a query that has optional variables but not options
     */
    export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter): UseQueryReturn<TResult, TVariables>;
    /**
     * Use a query that has required variables but not options
     */
    export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>): UseQueryReturn<TResult, TVariables>;
    /**
     * Use a query that requires options but not variables.
     */
    export function useQuery<TResult = any>(document: DocumentParameter, variables: undefined | null, options: OptionsParameter<TResult, null>): UseQueryReturn<TResult, null>;
    /**
     * Use a query that requires variables and options.
     */
    export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>, options: OptionsParameter<TResult, TVariables>): UseQueryReturn<TResult, TVariables>;
    export function useQueryImpl<TResult, TVariables extends OperationVariables>(document: DocumentParameter, variables?: VariablesParameter<TVariables>, options?: OptionsParameter<TResult, TVariables>, lazy?: boolean): UseQueryReturn<TResult, TVariables>;
}
declare module "useLazyQuery" {
    import { DocumentNode } from 'graphql';
    import { DocumentParameter, VariablesParameter, OptionsParameter, UseQueryOptions } from "useQuery";
    export function useLazyQuery<TResult = any, TVariables = any>(document: DocumentParameter, variables?: VariablesParameter<TVariables>, options?: OptionsParameter<TResult, TVariables>): {
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
        subscribeToMore: <TSubscriptionVariables = Record<string, any>, TSubscriptionData = TResult>(options: import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData> | import("vue-demi").Ref<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>> | import("util/ReactiveFunction").ReactiveFunction<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>>) => void;
        onResult: (fn: (param: import("@apollo/client/core").ApolloQueryResult<TResult>) => void) => {
            off: () => void;
        };
        onError: (fn: (param: Error) => void) => {
            off: () => void;
        };
    };
}
declare module "useMutation" {
    import { DocumentNode } from 'graphql';
    import { MutationOptions, OperationVariables, FetchResult } from '@apollo/client/core';
    import { Ref } from 'vue-demi';
    import { ReactiveFunction } from "util/ReactiveFunction";
    /**
     * `useMutation` options for mutations that don't require `variables`.
     */
    export interface UseMutationOptions<TResult = any, TVariables = OperationVariables> extends Omit<MutationOptions<TResult, TVariables>, 'mutation'> {
        clientId?: string;
    }
    type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
    type OptionsParameter<TResult, TVariables> = UseMutationOptions<TResult, TVariables> | Ref<UseMutationOptions<TResult, TVariables>> | ReactiveFunction<UseMutationOptions<TResult, TVariables>>;
    export type MutateOverrideOptions = Pick<UseMutationOptions<any, OperationVariables>, 'update' | 'optimisticResponse' | 'context' | 'updateQueries' | 'refetchQueries' | 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy' | 'clientId'>;
    export type MutateResult<TResult> = Promise<FetchResult<TResult, Record<string, any>, Record<string, any>>>;
    export type MutateFunction<TResult, TVariables> = (variables?: TVariables, overrideOptions?: MutateOverrideOptions) => MutateResult<TResult>;
    export interface UseMutationReturn<TResult, TVariables> {
        mutate: MutateFunction<TResult, TVariables>;
        loading: Ref<boolean>;
        error: Ref<Error>;
        called: Ref<boolean>;
        onDone: (fn: (param: FetchResult<TResult, Record<string, any>, Record<string, any>>) => void) => {
            off: () => void;
        };
        onError: (fn: (param: Error) => void) => {
            off: () => void;
        };
    }
    export function useMutation<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, options?: OptionsParameter<TResult, TVariables>): UseMutationReturn<TResult, TVariables>;
}
declare module "useSubscription" {
    import { DocumentNode } from 'graphql';
    import { Ref } from 'vue-demi';
    import { OperationVariables, SubscriptionOptions, FetchResult, Observable } from '@apollo/client/core';
    import { ReactiveFunction } from "util/ReactiveFunction";
    export interface UseSubscriptionOptions<TResult = any, TVariables = OperationVariables> extends Omit<SubscriptionOptions<TVariables>, 'query' | 'variables'> {
        clientId?: string;
        enabled?: boolean;
        throttle?: number;
        debounce?: number;
    }
    type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
    type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>;
    type OptionsParameter<TResult, TVariables> = UseSubscriptionOptions<TResult, TVariables> | Ref<UseSubscriptionOptions<TResult, TVariables>> | ReactiveFunction<UseSubscriptionOptions<TResult, TVariables>>;
    export interface UseSubscriptionReturn<TResult, TVariables> {
        result: Ref<TResult>;
        loading: Ref<boolean>;
        error: Ref<Error>;
        start: () => void;
        stop: () => void;
        restart: () => void;
        document: Ref<DocumentNode>;
        variables: Ref<TVariables>;
        options: UseSubscriptionOptions<TResult, TVariables> | Ref<UseSubscriptionOptions<TResult, TVariables>>;
        subscription: Ref<Observable<FetchResult<TResult, Record<string, any>, Record<string, any>>>>;
        onResult: (fn: (param: FetchResult<TResult, Record<string, any>, Record<string, any>>) => void) => {
            off: () => void;
        };
        onError: (fn: (param: Error) => void) => {
            off: () => void;
        };
    }
    /**
     * Use a subscription that does not require variables or options.
     * */
    export function useSubscription<TResult = any>(document: DocumentParameter): UseSubscriptionReturn<TResult, undefined>;
    /**
     * Use a subscription that requires options but not variables.
     */
    export function useSubscription<TResult = any>(document: DocumentParameter, variables: undefined | null, options: OptionsParameter<TResult, null>): UseSubscriptionReturn<TResult, null>;
    /**
     * Use a subscription that requires variables.
     */
    export function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>): UseSubscriptionReturn<TResult, TVariables>;
    /**
     * Use a subscription that has optional variables.
     */
    export function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter): UseSubscriptionReturn<TResult, TVariables>;
    /**
     * Use a subscription that requires variables and options.
     */
    export function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>, options: OptionsParameter<TResult, TVariables>): UseSubscriptionReturn<TResult, TVariables>;
}
declare module "util/ExtractSingleKey" {
    /**
     * Check if a type is a union, and return true if so, otherwise false.
     */
    export type IsUnion<T, U = T> = U extends any ? ([T] extends [U] ? false : true) : never;
    /**
     * Extracts an inner type if T has a single key K, otherwise it returns T.
     */
    export type ExtractSingleKey<T, K extends keyof T = keyof T> = IsUnion<K> extends true ? T : T[K];
}
declare module "useResult" {
    import { Ref } from 'vue-demi';
    import { ExtractSingleKey } from "util/ExtractSingleKey";
    export type UseResultReturn<T> = Readonly<Ref<Readonly<T>>>;
    /**
     * Resolve a `result`, returning either the first key of the `result` if there
     * is only one, or the `result` itself. The `value` of the ref will be
     * `undefined` until it is resolved.
     *
     * @example
     * const { result } = useQuery(...)
     * const user = useResult(result)
     * // user is `undefined` until the query resolves
     *
     * @param  {Ref<TResult>} result A `result` returned from `useQuery` to resolve.
     * @returns Readonly ref with `undefined` or the resolved `result`.
     */
    export function useResult<TResult, TResultKey extends keyof TResult = keyof TResult>(result: Ref<TResult>): UseResultReturn<undefined | ExtractSingleKey<TResult, TResultKey>>;
    /**
     * Resolve a `result`, returning either the first key of the `result` if there
     * is only one, or the `result` itself. The `value` of the ref will be
     * `defaultValue` until it is resolved.
     *
     * @example
     * const { result } = useQuery(...)
     * const profile = useResult(result, {})
     * // profile is `{}` until the query resolves
     *
     * @param  {Ref<TResult>} result A `result` returned from `useQuery` to resolve.
     * @param  {TDefaultValue} defaultValue The default return value before `result` is resolved.
     * @returns Readonly ref with the `defaultValue` or the resolved `result`.
     */
    export function useResult<TResult, TDefaultValue, TResultKey extends keyof TResult = keyof TResult>(result: Ref<TResult>, defaultValue: TDefaultValue): UseResultReturn<TDefaultValue | ExtractSingleKey<TResult, TResultKey>>;
    /**
     * Resolve a `result`, returning the `result` mapped with the `pick` function.
     * The `value` of the ref will be `defaultValue` until it is resolved.
     *
     * @example
     * const { result } = useQuery(...)
     * const comments = useResult(result, undefined, (data) => data.comments)
     * // user is `undefined`, then resolves to the result's `comments`
     *
     * @param  {Ref<TResult>} result A `result` returned from `useQuery` to resolve.
     * @param  {TDefaultValue} defaultValue The default return value before `result` is resolved.
     * @param  {(data:TResult)=>TReturnValue} pick The function that receives `result` and maps a return value from it.
     * @returns Readonly ref with the `defaultValue` or the resolved and `pick`-mapped `result`
     */
    export function useResult<TResult, TDefaultValue, TReturnValue>(result: Ref<TResult>, defaultValue: TDefaultValue | undefined, pick: (data: TResult) => TReturnValue): UseResultReturn<TDefaultValue | TReturnValue>;
}
declare module "useLoading" {
    export function useQueryLoading(): import("vue-demi").ComputedRef<boolean>;
    export function useMutationLoading(): import("vue-demi").ComputedRef<boolean>;
    export function useSubscriptionLoading(): import("vue-demi").ComputedRef<boolean>;
    export function useGlobalQueryLoading(): import("vue-demi").ComputedRef<boolean>;
    export function useGlobalMutationLoading(): import("vue-demi").ComputedRef<boolean>;
    export function useGlobalSubscriptionLoading(): import("vue-demi").ComputedRef<boolean>;
}
declare module "index" {
    export { useQuery, UseQueryOptions, UseQueryReturn, } from "useQuery";
    export { useLazyQuery, } from "useLazyQuery";
    export { useMutation, UseMutationOptions, UseMutationReturn, MutateFunction, MutateOverrideOptions, MutateResult, } from "useMutation";
    export { useSubscription, UseSubscriptionOptions, UseSubscriptionReturn, } from "useSubscription";
    export { useResult, UseResultReturn, } from "useResult";
    export { useQueryLoading, useGlobalQueryLoading, useMutationLoading, useGlobalMutationLoading, useSubscriptionLoading, useGlobalSubscriptionLoading, } from "useLoading";
    export { DefaultApolloClient, ApolloClients, useApolloClient, UseApolloClientReturn, provideApolloClient, } from "useApolloClient";
}
