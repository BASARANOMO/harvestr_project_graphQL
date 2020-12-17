import { GraphQLFieldResolver } from 'graphql';
import { AllInputTypes, FieldResolver, GetGen, GetGen3, HasGen3, NeedsResolver } from '../typegenTypeHelpers';
import { ArgsRecord } from './args';
import { AllNexusInputTypeDefs, AllNexusOutputTypeDefs, NexusWrapKind } from './wrapping';
import { BaseScalars } from './_types';
export interface CommonFieldConfig {
    /**
     * The description to annotate the GraphQL SDL
     */
    description?: string | null;
    /**
     * Info about a field deprecation. Formatted as a string and provided with the
     * deprecated directive on field/enum types and as a comment on input fields.
     */
    deprecation?: string;
}
export declare type CommonOutputFieldConfig<TypeName extends string, FieldName extends string> = CommonFieldConfig & {
    /**
     * Arguments for the field
     */
    args?: ArgsRecord;
} & NexusGenPluginFieldConfig<TypeName, FieldName>;
export declare type CommonInputFieldConfig<TypeName extends string, FieldName extends string> = CommonFieldConfig & {
    /**
     * The default value for the field, if any
     */
    default?: GetGen3<'inputTypes', TypeName, FieldName>;
} & NexusGenPluginFieldConfig<TypeName, FieldName>;
/**
 * Deprecated, prefer core.CommonInputFieldConfig
 *
 * TODO(tim): Remove at 1.0
 */
export interface ScalarInputFieldConfig<T> extends CommonInputFieldConfig<any, any> {
    default?: T;
}
export interface OutputScalarConfig<TypeName extends string, FieldName extends string> extends CommonOutputFieldConfig<TypeName, FieldName> {
    /**
     * Resolve method for the field
     */
    resolve?: FieldResolver<TypeName, FieldName>;
}
export interface NexusOutputFieldConfig<TypeName extends string, FieldName extends string> extends OutputScalarConfig<TypeName, FieldName> {
    type: GetGen<'allOutputTypes', string> | AllNexusOutputTypeDefs;
}
export declare type NexusOutputFieldDef = NexusOutputFieldConfig<string, any> & {
    name: string;
    configFor: 'outputField';
    parentType: string;
    subscribe?: GraphQLFieldResolver<any, any>;
    wrapping?: NexusWrapKind[];
};
export declare type ScalarOutSpread<TypeName extends string, FieldName extends string> = NeedsResolver<TypeName, FieldName> extends true ? [ScalarOutConfig<TypeName, FieldName>] : HasGen3<'argTypes', TypeName, FieldName> extends true ? [ScalarOutConfig<TypeName, FieldName>] : [ScalarOutConfig<TypeName, FieldName>] | [];
export declare type ScalarOutConfig<TypeName extends string, FieldName extends string> = NeedsResolver<TypeName, FieldName> extends true ? OutputScalarConfig<TypeName, FieldName> & {
    resolve: FieldResolver<TypeName, FieldName>;
} : OutputScalarConfig<TypeName, FieldName>;
export declare type FieldOutConfig<TypeName extends string, FieldName extends string> = NeedsResolver<TypeName, FieldName> extends true ? NexusOutputFieldConfig<TypeName, FieldName> & {
    resolve: FieldResolver<TypeName, FieldName>;
} : NexusOutputFieldConfig<TypeName, FieldName>;
export interface OutputDefinitionBuilder {
    typeName: string;
    addField(config: NexusOutputFieldDef): void;
    addDynamicOutputMembers(block: OutputDefinitionBlock<any>, wrapping?: NexusWrapKind[]): void;
    warn(msg: string): void;
}
export interface InputDefinitionBuilder {
    typeName: string;
    addField(config: NexusInputFieldDef): void;
    addDynamicInputFields(block: InputDefinitionBlock<any>, wrapping?: NexusWrapKind[]): void;
    warn(msg: string): void;
}
export interface OutputDefinitionBlock<TypeName extends string> extends NexusGenCustomOutputMethods<TypeName>, NexusGenCustomOutputProperties<TypeName> {
}
/**
 * The output definition block is passed to the "definition"
 * function property of the "objectType" / "interfaceType"
 */
export declare class OutputDefinitionBlock<TypeName extends string> {
    protected typeBuilder: OutputDefinitionBuilder;
    protected wrapping?: NexusWrapKind[] | undefined;
    readonly typeName: string;
    constructor(typeBuilder: OutputDefinitionBuilder, wrapping?: NexusWrapKind[] | undefined);
    get list(): OutputDefinitionBlock<TypeName>;
    get nonNull(): Omit<OutputDefinitionBlock<TypeName>, 'nonNull' | 'nullable'>;
    get nullable(): Omit<OutputDefinitionBlock<TypeName>, 'nonNull' | 'nullable'>;
    string<FieldName extends string>(fieldName: FieldName, ...opts: ScalarOutSpread<TypeName, FieldName>): void;
    int<FieldName extends string>(fieldName: FieldName, ...opts: ScalarOutSpread<TypeName, FieldName>): void;
    boolean<FieldName extends string>(fieldName: FieldName, ...opts: ScalarOutSpread<TypeName, FieldName>): void;
    id<FieldName extends string>(fieldName: FieldName, ...opts: ScalarOutSpread<TypeName, FieldName>): void;
    float<FieldName extends string>(fieldName: FieldName, ...opts: ScalarOutSpread<TypeName, FieldName>): void;
    field<FieldName extends string>(name: FieldName, fieldConfig: FieldOutConfig<TypeName, FieldName>): void;
    protected _wrapClass(kind: NexusWrapKind): OutputDefinitionBlock<TypeName>;
    protected addScalarField(fieldName: string, typeName: BaseScalars, opts: [] | ScalarOutSpread<TypeName, any>): void;
}
export interface NexusInputFieldConfig<TypeName extends string, FieldName extends string> extends CommonInputFieldConfig<TypeName, FieldName> {
    type: AllInputTypes | AllNexusInputTypeDefs<string>;
}
export declare type NexusInputFieldDef = NexusInputFieldConfig<string, string> & {
    configFor: 'inputField';
    name: string;
    wrapping?: NexusWrapKind[];
    parentType: string;
};
export interface InputDefinitionBlock<TypeName extends string> extends NexusGenCustomInputMethods<TypeName> {
}
export declare class InputDefinitionBlock<TypeName extends string> {
    protected typeBuilder: InputDefinitionBuilder;
    protected wrapping?: NexusWrapKind[] | undefined;
    readonly typeName: string;
    constructor(typeBuilder: InputDefinitionBuilder, wrapping?: NexusWrapKind[] | undefined);
    get list(): InputDefinitionBlock<string>;
    get nonNull(): Omit<InputDefinitionBlock<TypeName>, 'nonNull' | 'nullable'>;
    get nullable(): Omit<InputDefinitionBlock<TypeName>, 'nonNull' | 'nullable'>;
    string<FieldName extends string>(fieldName: FieldName, opts?: CommonInputFieldConfig<TypeName, FieldName>): void;
    int<FieldName extends string>(fieldName: FieldName, opts?: CommonInputFieldConfig<TypeName, FieldName>): void;
    boolean<FieldName extends string>(fieldName: FieldName, opts?: CommonInputFieldConfig<TypeName, FieldName>): void;
    id<FieldName extends string>(fieldName: FieldName, opts?: CommonInputFieldConfig<TypeName, FieldName>): void;
    float<FieldName extends string>(fieldName: FieldName, opts?: CommonInputFieldConfig<TypeName, FieldName>): void;
    field<FieldName extends string>(fieldName: FieldName, fieldConfig: NexusInputFieldConfig<TypeName, FieldName>): void;
    protected _wrapClass(kind: NexusWrapKind): InputDefinitionBlock<string>;
    protected addScalarField(fieldName: string, typeName: BaseScalars, opts?: CommonInputFieldConfig<any, any>): void;
}
