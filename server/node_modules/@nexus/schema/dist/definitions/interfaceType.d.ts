import { GetGen, InterfaceFieldsFor, FieldResolver, ModificationType, AbstractTypeResolver } from '../typegenTypeHelpers';
import { AbstractTypes, NonNullConfig, RootTypingDef } from './_types';
import { OutputDefinitionBlock, OutputDefinitionBuilder } from './definitionBlocks';
import { ArgsRecord } from './args';
export declare type Implemented = GetGen<'interfaceNames'> | NexusInterfaceTypeDef<any>;
export interface FieldModification<TypeName extends string, FieldName extends string> {
    type?: ModificationType<TypeName, FieldName>;
    /**
     * The description to annotate the GraphQL SDL
     */
    description?: string | null;
    /**
     * The resolve method we should be resolving the field with
     */
    resolve?: FieldResolver<TypeName, FieldName>;
    /**
     * You are allowed to add non-required args when modifying a field
     */
    args?: ArgsRecord;
}
export interface FieldModificationDef<TypeName extends string, FieldName extends string> extends FieldModification<TypeName, FieldName> {
    field: FieldName;
}
export declare type NexusInterfaceTypeConfig<TypeName extends string> = {
    name: TypeName;
    definition(t: InterfaceDefinitionBlock<TypeName>): void;
    /**
     * Configures the nullability for the type, check the
     * documentation's "Getting Started" section to learn
     * more about GraphQL Nexus's assumptions and configuration
     * on nullability.
     */
    nonNullDefaults?: NonNullConfig;
    /**
     * The description to annotate the GraphQL SDL
     */
    description?: string | null;
    /**
     * Root type information for this type
     */
    rootTyping?: RootTypingDef;
} & AbstractTypes.MaybeTypeDefConfigFieldResolveType<TypeName>;
export interface InterfaceDefinitionBuilder<TypeName extends string> extends OutputDefinitionBuilder {
    setLegacyResolveType(fn: AbstractTypeResolver<TypeName>): void;
    addInterfaces(toAdd: Implemented[]): void;
    addModification(toAdd: FieldModificationDef<TypeName, any>): void;
}
export declare class InterfaceDefinitionBlock<TypeName extends string> extends OutputDefinitionBlock<TypeName> {
    protected typeBuilder: InterfaceDefinitionBuilder<TypeName>;
    constructor(typeBuilder: InterfaceDefinitionBuilder<TypeName>);
    /**
     * @param interfaceName
     */
    implements(...interfaceName: Array<Implemented>): void;
    /**
     * Modifies a field added via an interface
     */
    modify<FieldName extends Extract<InterfaceFieldsFor<TypeName>, string>>(field: FieldName, modifications: FieldModification<TypeName, FieldName>): void;
    protected resolveType(fn: AbstractTypeResolver<TypeName>): void;
}
export declare class NexusInterfaceTypeDef<TypeName extends string> {
    readonly name: TypeName;
    protected config: NexusInterfaceTypeConfig<TypeName>;
    constructor(name: TypeName, config: NexusInterfaceTypeConfig<TypeName>);
    get value(): NexusInterfaceTypeConfig<TypeName>;
}
/**
 * Defines a GraphQLInterfaceType
 * @param config
 */
export declare function interfaceType<TypeName extends string>(config: NexusInterfaceTypeConfig<TypeName>): NexusInterfaceTypeDef<TypeName>;
