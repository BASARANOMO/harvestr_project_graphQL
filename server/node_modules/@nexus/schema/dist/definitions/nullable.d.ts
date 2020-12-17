import { NexusNullableTypes } from './wrapping';
export declare class NexusNullDef<TypeName extends NexusNullableTypes> {
    readonly ofNexusType: TypeName;
    private _isNexusNullDef;
    constructor(ofNexusType: TypeName);
}
/**
 * null()
 */
export declare function nullable<TypeName extends NexusNullableTypes>(type: TypeName): NexusNullDef<any>;
