import * as Nexus from '@nexus/schema';
import { GraphQLScalarType } from 'graphql';
import { CustomInputArg } from './builder';
import { DmmfDocument, InternalDMMF } from './dmmf';
import { Index } from './utils';
export declare class Publisher {
    dmmf: DmmfDocument;
    nexusBuilder: Nexus.PluginBuilderLens;
    scalars: Record<string, GraphQLScalarType>;
    typesPublished: Index<boolean>;
    constructor(dmmf: DmmfDocument, nexusBuilder: Nexus.PluginBuilderLens, scalars: Record<string, GraphQLScalarType>);
    inputType(customArg: CustomInputArg): string | Nexus.core.NexusInputObjectTypeDef<string> | Nexus.core.NexusEnumTypeDef<string> | Nexus.core.NexusScalarTypeDef<string> | Nexus.core.NexusArgDef<any> | GraphQLScalarType;
    outputType(outputTypeName: string, field: InternalDMMF.SchemaField): any;
    protected publishObject(name: string): Nexus.core.NexusObjectTypeDef<string>;
    protected publishScalar(typeName: string): string | GraphQLScalarType | Nexus.core.NexusScalarTypeDef<string>;
    protected publishEnum(typeName: string): Nexus.core.NexusEnumTypeDef<string>;
    publishInputObjectType(inputType: InternalDMMF.InputType): Nexus.core.NexusInputObjectTypeDef<string>;
    protected getTypeFromArg(arg: InternalDMMF.SchemaArg): CustomInputArg['type'];
    isPublished(typeName: string): boolean;
    markTypeAsPublished(typeName: string): void;
}
/**
 * Get the composition-order pipeline of Nexus type def functions that will match the nullability and list types of the Prisma field type.
 *
 * For example { isList:true, isRequired: true } would result in array of funcs: [nonNull, list, nonNull]
 */
export declare const getNexusTypesCompositionForInput: (fieldType: InternalDMMF.SchemaArg['inputType']) => Function[];
export declare const getNexusTypesCompositionForOutput: (fieldType: InternalDMMF.SchemaField['outputType']) => Function[];
//# sourceMappingURL=publisher.d.ts.map