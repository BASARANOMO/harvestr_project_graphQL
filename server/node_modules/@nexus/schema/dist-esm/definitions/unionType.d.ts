import { GetGen, AbstractTypeResolver } from '../typegenTypeHelpers';
import { AbstractTypes, RootTypingDef } from './_types';
import { NexusObjectTypeDef } from './objectType';
export interface UnionDefinitionBuilder {
    typeName: string;
    addUnionMembers(members: UnionMembers): void;
    setLegacyResolveType(fn: AbstractTypeResolver<any>): void;
}
export declare type UnionMembers = Array<GetGen<'objectNames'> | NexusObjectTypeDef<any>>;
export declare class UnionDefinitionBlock {
    protected typeBuilder: UnionDefinitionBuilder;
    constructor(typeBuilder: UnionDefinitionBuilder);
    /**
     * All ObjectType names that should be part of the union, either
     * as string names or as references to the `objectType()` return value
     */
    members(...unionMembers: UnionMembers): void;
    protected resolveType(fn: AbstractTypeResolver<any>): void;
}
export declare type NexusUnionTypeConfig<TypeName extends string> = {
    /**
     * The name of the union type
     */
    name: TypeName;
    /**
     * Builds the definition for the union
     */
    definition(t: UnionDefinitionBlock): void;
    /**
     * The description to annotate the GraphQL SDL
     */
    description?: string | null;
    /**
     * Info about a field deprecation. Formatted as a string and provided with the
     * deprecated directive on field/enum types and as a comment on input fields.
     */
    deprecation?: string;
    /**
     * Root type information for this type
     */
    rootTyping?: RootTypingDef;
} & AbstractTypes.MaybeTypeDefConfigFieldResolveType<TypeName>;
export declare class NexusUnionTypeDef<TypeName extends string> {
    readonly name: TypeName;
    protected config: NexusUnionTypeConfig<TypeName>;
    constructor(name: TypeName, config: NexusUnionTypeConfig<TypeName>);
    get value(): NexusUnionTypeConfig<TypeName>;
}
/**
 * Defines a new `GraphQLUnionType`
 * @param config
 */
export declare function unionType<TypeName extends string>(config: NexusUnionTypeConfig<TypeName>): NexusUnionTypeDef<TypeName>;
