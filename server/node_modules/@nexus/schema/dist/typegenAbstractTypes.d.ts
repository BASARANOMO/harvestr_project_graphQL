import { GraphQLResolveInfo } from 'graphql';
import { AbstractTypeResolver, GetGen, GetGen2, IsFeatureEnabled2, MaybePromise, RootValue } from './typegenTypeHelpers';
import { ConditionalKeys, ConditionalPick, ValueOf } from './typeHelpersInternal';
/**
 * Returns a union of all the type names of the members of an abstract type
 *
 * @example
 *
 * union D = A | B | C
 * PossibleTypeNames<'D> // 'A' | 'B' | 'C'
 */
export declare type PossibleTypeNames<AbstractTypeName extends string> = ValueOf<ConditionalPick<GetGen<'abstractTypeMembers'>, AbstractTypeName>>;
/**
 * Returns a union of all the members of an abstract type
 *
 * @example
 * union D = A | B | C
 * PossibleTypes<'D> // A | B | C
 */
export declare type PossibleTypes<AbstractTypeName extends string> = RootValue<PossibleTypeNames<AbstractTypeName>>;
/**
 * Returns a union of all the abstract type names where TypeName is used
 *
 * @example
 * union D = A | B
 * union E = A
 * AbstractTypeNames<'A'> // 'D' | 'E'
 */
export declare type AbstractTypeNames<TypeName extends string> = ConditionalKeys<GetGen<'abstractTypeMembers'>, TypeName>;
/**
 * Returns whether all the abstract type names where TypeName is used have implemented `resolveType`
 */
export declare type IsStrategyResolveTypeImplementedInAllAbstractTypes<TypeName extends string> = AbstractTypeNames<TypeName> extends GetGen<'abstractsUsingStrategyResolveType'> ? true : false;
/**
 * Returns whether all the members of an abstract type have implemented `isTypeOf`
 */
export declare type IsStrategyIsTypeOfImplementedInAllMembers<AbstractTypeName extends string> = GetGen2<'abstractTypeMembers', AbstractTypeName> extends GetGen<'objectsUsingAbstractStrategyIsTypeOf'> ? true : false;
export declare type IsTypeOfHandler<TypeName extends string> = (source: PossibleTypes<TypeName>, // typed as never if TypeName is not a member of any abstract type
context: GetGen<'context'>, info: GraphQLResolveInfo) => MaybePromise<boolean>;
/**
 * Get an object with the `isTypeOf` field if applicable for the given object Type.
 *
 * @remarks
 *
 * Intersect the result of this with other things to build up the final options for a type def.
 */
export declare type MaybeTypeDefConfigFieldIsTypeOf<TypeName extends string> = IsFeatureEnabled2<'abstractTypeStrategies', 'isTypeOf'> extends false ? {} : IsStrategyResolveTypeImplementedInAllAbstractTypes<TypeName> extends true ? {
    isTypeOf?: IsTypeOfHandler<TypeName>;
} : IsFeatureEnabled2<'abstractTypeStrategies', '__typename'> extends true ? {
    isTypeOf?: IsTypeOfHandler<TypeName>;
} : AbstractTypeNames<TypeName> extends never ? {
    isTypeOf?: IsTypeOfHandler<TypeName>;
} : {
    isTypeOf: IsTypeOfHandler<TypeName>;
};
/**
 * Get an object with the `resolveType` field if applicable for the given abstract Type.
 *
 * @remarks
 *
 * Intersect the result of this with other things to build up the final options for a type def.
 */
export declare type MaybeTypeDefConfigFieldResolveType<TypeName extends string> = IsFeatureEnabled2<'abstractTypeStrategies', 'resolveType'> extends false ? {} : IsStrategyIsTypeOfImplementedInAllMembers<TypeName> extends true ? {
    /**
     * Optionally provide a custom type resolver function. If one is not provided,
     * the default implementation will call `isTypeOf` on each implementing
     * Object type.
     */
    resolveType?: AbstractTypeResolver<TypeName>;
} : IsFeatureEnabled2<'abstractTypeStrategies', '__typename'> extends true ? {
    /**
     * Optionally provide a custom type resolver function. If one is not provided,
     * the default implementation will call `isTypeOf` on each implementing
     * Object type.
     */
    resolveType?: AbstractTypeResolver<TypeName>;
} : {
    /**
     * Optionally provide a custom type resolver function. If one is not provided,
     * the default implementation will call `isTypeOf` on each implementing
     * Object type.
     */
    resolveType: AbstractTypeResolver<TypeName>;
};
