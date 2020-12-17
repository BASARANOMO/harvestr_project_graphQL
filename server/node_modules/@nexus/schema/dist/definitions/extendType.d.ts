import { AllOutputTypesPossible } from '../typegenTypeHelpers';
import { OutputDefinitionBlock } from './definitionBlocks';
import { IsSubscriptionType, SubscriptionBuilder } from './subscriptionType';
export interface NexusExtendTypeConfig<TypeName extends string> {
    type: TypeName;
    definition(t: IsSubscriptionType<TypeName> extends true ? SubscriptionBuilder : OutputDefinitionBlock<TypeName>): void;
}
export declare class NexusExtendTypeDef<TypeName extends string> {
    readonly name: TypeName;
    protected config: NexusExtendTypeConfig<TypeName> & {
        name: TypeName;
    };
    constructor(name: TypeName, config: NexusExtendTypeConfig<TypeName> & {
        name: TypeName;
    });
    get value(): NexusExtendTypeConfig<TypeName> & {
        name: TypeName;
    };
}
/**
 * Adds new fields to an existing objectType in the schema. Useful when
 * splitting your schema across several domains.
 *
 * @see https://nexusjs.org/docs/api/extend-type
 */
export declare function extendType<TypeName extends AllOutputTypesPossible>(config: NexusExtendTypeConfig<TypeName>): NexusExtendTypeDef<any>;
