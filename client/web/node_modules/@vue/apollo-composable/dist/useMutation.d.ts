import { DocumentNode } from 'graphql';
import { MutationOptions, OperationVariables, FetchResult } from '@apollo/client/core';
import { Ref } from 'vue-demi';
import { ReactiveFunction } from './util/ReactiveFunction';
/**
 * `useMutation` options for mutations that don't require `variables`.
 */
export interface UseMutationOptions<TResult = any, TVariables = OperationVariables> extends Omit<MutationOptions<TResult, TVariables>, 'mutation'> {
    clientId?: string;
}
declare type DocumentParameter = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode>;
declare type OptionsParameter<TResult, TVariables> = UseMutationOptions<TResult, TVariables> | Ref<UseMutationOptions<TResult, TVariables>> | ReactiveFunction<UseMutationOptions<TResult, TVariables>>;
export declare type MutateOverrideOptions = Pick<UseMutationOptions<any, OperationVariables>, 'update' | 'optimisticResponse' | 'context' | 'updateQueries' | 'refetchQueries' | 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy' | 'clientId'>;
export declare type MutateResult<TResult> = Promise<FetchResult<TResult, Record<string, any>, Record<string, any>>>;
export declare type MutateFunction<TResult, TVariables> = (variables?: TVariables, overrideOptions?: MutateOverrideOptions) => MutateResult<TResult>;
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
export declare function useMutation<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter, options?: OptionsParameter<TResult, TVariables>): UseMutationReturn<TResult, TVariables>;
export {};
