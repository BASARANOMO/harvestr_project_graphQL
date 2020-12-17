import { Index } from '../utils';
import { InternalDMMF } from './DmmfTypes';
export declare class DmmfDocument implements InternalDMMF.Document {
    datamodel: InternalDMMF.Datamodel;
    schema: InternalDMMF.Schema;
    operations: InternalDMMF.Mapping[];
    queryObject: OutputType;
    mutationObject: OutputType;
    outputTypesIndex: Index<InternalDMMF.OutputType>;
    inputTypesIndex: Index<InternalDMMF.InputType>;
    mappingsIndex: Index<InternalDMMF.Mapping>;
    enumsIndex: Index<InternalDMMF.SchemaEnum>;
    modelsIndex: Index<InternalDMMF.Model>;
    inputTypesIndexWithFields: InputTypeIndexWithField;
    customScalars: Array<string>;
    constructor({ datamodel, schema, operations }: InternalDMMF.Document);
    getInputType(inputTypeName: string): InternalDMMF.InputType;
    getInputTypeWithIndexedFields(inputTypeName: string): Pick<InternalDMMF.InputType, "name" | "constraints" | "computedInputs"> & {
        fields: Record<string, InternalDMMF.SchemaArg>;
    };
    getOutputType(outputTypeName: string): OutputType;
    hasOutputType(outputTypeName: string): boolean;
    getEnumType(enumTypeName: string): InternalDMMF.SchemaEnum;
    hasEnumType(enumTypeName: string): boolean;
    getModelOrThrow(modelName: string): InternalDMMF.Model;
    hasModel(modelName: string): boolean;
    getMapping(modelName: string): InternalDMMF.Mapping;
}
export declare class OutputType {
    protected outputType: InternalDMMF.OutputType;
    name: string;
    fields: InternalDMMF.SchemaField[];
    isEmbedded?: boolean;
    constructor(outputType: InternalDMMF.OutputType);
    getField(fieldName: string): InternalDMMF.SchemaField;
}
declare type InputTypeIndexWithField = Index<Omit<InternalDMMF.InputType, 'fields'> & {
    fields: Index<InternalDMMF.SchemaArg>;
}>;
export {};
//# sourceMappingURL=DmmfDocument.d.ts.map