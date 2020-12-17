import { GraphQLResolveInfo } from 'graphql';
import { ArgsValue, GetGen, MaybePromise, MaybePromiseDeep, ResultValue } from '../typegenTypeHelpers';
import { IsEqual } from '../typeHelpersInternal';
import { CommonOutputFieldConfig } from './definitionBlocks';
import { AllNexusOutputTypeDefs } from './wrapping';
export interface SubscriptionTypeConfigBase<FieldName extends string, Event = any> {
    resolve(root: Event, args: ArgsValue<'Subscription', FieldName>, context: GetGen<'context'>, info: GraphQLResolveInfo): MaybePromise<ResultValue<'Subscription', FieldName>> | MaybePromiseDeep<ResultValue<'Subscription', FieldName>>;
    subscribe(root: object, args: ArgsValue<'Subscription', FieldName>, ctx: GetGen<'context'>, info: GraphQLResolveInfo): MaybePromise<AsyncIterator<Event>> | MaybePromiseDeep<AsyncIterator<Event>>;
}
export declare type SubscriptionScalarConfig<FieldName extends string, Event> = CommonOutputFieldConfig<'Subscription', FieldName> & SubscriptionTypeConfigBase<FieldName, Event>;
export interface SubscriptionTypeConfig<FieldName extends string, Event> extends SubscriptionScalarConfig<FieldName, Event> {
    type: GetGen<'allOutputTypes'> | AllNexusOutputTypeDefs;
}
export interface SubscriptionBuilder {
    list: SubscriptionBuilder;
    nonNull: Omit<SubscriptionBuilder, 'nonNull' | 'nullable'>;
    nullable: Omit<SubscriptionBuilder, 'nonNull' | 'nullable'>;
    string<FieldName extends string, Event>(fieldName: FieldName, config: SubscriptionScalarConfig<FieldName, Event>): void;
    int<FieldName extends string, Event>(fieldName: FieldName, config: SubscriptionScalarConfig<FieldName, Event>): void;
    boolean<FieldName extends string, Event>(fieldName: FieldName, opts: SubscriptionScalarConfig<FieldName, Event>): void;
    id<FieldName extends string, Event>(fieldName: FieldName, config: SubscriptionScalarConfig<FieldName, Event>): void;
    float<FieldName extends string, Event>(fieldName: FieldName, config: SubscriptionScalarConfig<FieldName, Event>): void;
    field<FieldName extends string, Event>(name: FieldName, fieldConfig: SubscriptionTypeConfig<FieldName, Event>): void;
}
export declare type SubscriptionTypeParams = {
    definition(t: SubscriptionBuilder): void;
};
export declare function subscriptionType(config: SubscriptionTypeParams): import("./objectType").NexusObjectTypeDef<string>;
export declare type IsSubscriptionType<T> = IsEqual<T, 'Subscription'>;
