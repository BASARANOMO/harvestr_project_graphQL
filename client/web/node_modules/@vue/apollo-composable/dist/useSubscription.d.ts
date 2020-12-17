/// <reference types="zen-observable" />
import { DocumentNode } from 'graphql';
import { Ref } from 'vue-demi';
import { OperationVariables, SubscriptionOptions, FetchResult, Observable } from '@apollo/client/core';
import { ReactiveFunction } from './util/ReactiveFunction';
export interface UseSubscriptionOptions<TResult = any, TVariables = OperationVariables> extends Omit<SubscriptionOptions<TVariables>, 'query' | 'variables'> {
    clientId?: string;
    enabled?: boolean;
    throttle?: number;
    debounce?: number;
}
declare type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
declare type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>;
declare type OptionsParameter<TResult, TVariables> = UseSubscriptionOptions<TResult, TVariables> | Ref<UseSubscriptionOptions<TResult, TVariables>> | ReactiveFunction<UseSubscriptionOptions<TResult, TVariables>>;
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
export declare function useSubscription<TResult = any>(document: DocumentParameter): UseSubscriptionReturn<TResult, undefined>;
/**
 * Use a subscription that requires options but not variables.
 */
export declare function useSubscription<TResult = any>(document: DocumentParameter, variables: undefined | null, options: OptionsParameter<TResult, null>): UseSubscriptionReturn<TResult, null>;
/**
 * Use a subscription that requires variables.
 */
export declare function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>): UseSubscriptionReturn<TResult, TVariables>;
/**
 * Use a subscription that has optional variables.
 */
export declare function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter): UseSubscriptionReturn<TResult, TVariables>;
/**
 * Use a subscription that requires variables and options.
 */
export declare function useSubscription<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, variables: VariablesParameter<TVariables>, options: OptionsParameter<TResult, TVariables>): UseSubscriptionReturn<TResult, TVariables>;
export {};
