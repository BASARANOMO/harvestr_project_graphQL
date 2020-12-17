import { DMMF } from '@prisma/client/runtime';
import { PaginationStrategy } from '../pagination';
import { GlobalComputedInputs, GlobalMutationResolverParams, LocalComputedInputs } from '../utils';
import { DmmfDocument } from './DmmfDocument';
import { InternalDMMF } from './DmmfTypes';
export declare type TransformOptions = {
    atomicOperations?: boolean;
    globallyComputedInputs?: GlobalComputedInputs;
    paginationStrategy?: PaginationStrategy;
};
export declare const getTransformedDmmf: (prismaClientPackagePath: string, options?: TransformOptions | undefined) => DmmfDocument;
export declare function transform(document: DMMF.Document, options?: TransformOptions): InternalDMMF.Document;
declare type AddComputedInputParams = {
    inputType: InternalDMMF.InputType;
    params: GlobalMutationResolverParams;
    dmmf: DmmfDocument;
    locallyComputedInputs: LocalComputedInputs<any>;
};
export declare function addComputedInputs({ dmmf, inputType, locallyComputedInputs, params, }: AddComputedInputParams): Promise<{
    data: {
        [x: string]: any;
    };
}>;
export {};
//# sourceMappingURL=transformer.d.ts.map