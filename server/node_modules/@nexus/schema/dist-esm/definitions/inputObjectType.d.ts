import { NexusArgDef, NexusAsArgConfig } from './args';
import { InputDefinitionBlock } from './definitionBlocks';
import { NonNullConfig } from './_types';
export interface NexusInputObjectTypeConfig<TypeName extends string> {
    /**
     * Name of the input object type
     */
    name: TypeName;
    /**
     * Definition block for the input type
     */
    definition(t: InputDefinitionBlock<TypeName>): void;
    /**
     * The description to annotate the GraphQL SDL
     */
    description?: string | null;
    /**
     * Configures the nullability for the type, check the
     * documentation's "Getting Started" section to learn
     * more about GraphQL Nexus's assumptions and configuration
     * on nullability.
     */
    nonNullDefaults?: NonNullConfig;
}
export declare class NexusInputObjectTypeDef<TypeName extends string> {
    readonly name: TypeName;
    protected config: NexusInputObjectTypeConfig<any>;
    constructor(name: TypeName, config: NexusInputObjectTypeConfig<any>);
    get value(): NexusInputObjectTypeConfig<any>;
    asArg(cfg?: NexusAsArgConfig<any>): NexusArgDef<any>;
}
export declare function inputObjectType<TypeName extends string>(config: NexusInputObjectTypeConfig<TypeName>): NexusInputObjectTypeDef<TypeName>;
