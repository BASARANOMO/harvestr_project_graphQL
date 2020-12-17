import { InternalDMMF } from './dmmf';
export interface ArgsNamingStrategy {
    whereInput: (typeName: string, fieldName: string) => string;
    orderByInput: (typeName: string, fieldName: string) => string;
    relationFilterInput: (typeName: string, fieldName: string) => string;
}
export declare const defaultArgsNamingStrategy: ArgsNamingStrategy;
export declare type OperationName = Exclude<keyof InternalDMMF.Mapping, 'model' | 'plural'>;
export declare type FieldNamingStrategy = Record<OperationName, (fieldName: string, modelName: string) => string>;
export declare const defaultFieldNamingStrategy: FieldNamingStrategy;
//# sourceMappingURL=naming-strategies.d.ts.map