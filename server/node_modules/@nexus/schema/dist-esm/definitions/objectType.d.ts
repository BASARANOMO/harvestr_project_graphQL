import { InterfaceFieldsFor } from '../typegenTypeHelpers';
import { AbstractTypes, NonNullConfig, Omit, RootTypingDef } from './_types';
import { OutputDefinitionBlock, OutputDefinitionBuilder } from './definitionBlocks';
import { Implemented, FieldModificationDef, FieldModification } from './interfaceType';
export interface ObjectDefinitionBuilder extends OutputDefinitionBuilder {
    addInterfaces(toAdd: Implemented[]): void;
    addModification(toAdd: FieldModificationDef<any, any>): void;
}
export declare class ObjectDefinitionBlock<TypeName extends string> extends OutputDefinitionBlock<TypeName> {
    protected typeBuilder: ObjectDefinitionBuilder;
    constructor(typeBuilder: ObjectDefinitionBuilder);
    /**
     * @param interfaceName
     */
    implements(...interfaceName: Array<Implemented>): void;
    /**
     * Modifies a field added via an interface
     */
    modify<FieldName extends Extract<InterfaceFieldsFor<TypeName>, string>>(field: FieldName, modifications: FieldModification<TypeName, FieldName>): void;
}
export declare type NexusObjectTypeConfig<TypeName extends string> = {
    name: TypeName;
    definition(t: ObjectDefinitionBlock<TypeName>): void;
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
} & AbstractTypes.MaybeTypeDefConfigFieldIsTypeOf<TypeName> & NexusGenPluginTypeConfig<TypeName>;
export declare class NexusObjectTypeDef<TypeName extends string> {
    readonly name: TypeName;
    protected config: NexusObjectTypeConfig<TypeName>;
    constructor(name: TypeName, config: NexusObjectTypeConfig<TypeName>);
    get value(): NexusObjectTypeConfig<TypeName>;
}
export declare function objectType<TypeName extends string>(config: NexusObjectTypeConfig<TypeName>): NexusObjectTypeDef<TypeName>;
export declare function queryType(config: Omit<NexusObjectTypeConfig<'Query'>, 'name'>): NexusObjectTypeDef<"Query">;
export declare function mutationType(config: Omit<NexusObjectTypeConfig<'Mutation'>, 'name'>): NexusObjectTypeDef<"Mutation">;
