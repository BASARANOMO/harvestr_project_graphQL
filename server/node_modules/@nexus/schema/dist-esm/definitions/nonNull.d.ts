import { NexusNonNullableTypes } from './wrapping';
export declare class NexusNonNullDef<TypeName extends NexusNonNullableTypes> {
    readonly ofNexusType: TypeName;
    private _isNexusNonNullDef;
    constructor(ofNexusType: TypeName);
}
export declare function nonNull<TypeName extends NexusNonNullableTypes>(type: TypeName): NexusNonNullDef<any> | (TypeName & import("graphql").GraphQLNonNull<any>);
