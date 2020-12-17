import { isType } from 'graphql';
import { isNexusNonNullTypeDef, isNexusNullTypeDef, isNexusStruct } from './wrapping';
import { NexusTypes, withNexusSymbol } from './_types';
export class NexusNullDef {
    constructor(ofNexusType) {
        this.ofNexusType = ofNexusType;
        // @ts-ignore
        // Required field for TS to differentiate NonNull from Null from List
        this._isNexusNullDef = true;
        if (typeof ofNexusType !== 'string' && !isNexusStruct(ofNexusType) && !isType(ofNexusType)) {
            throw new Error('Cannot wrap unknown types in nullable(). Saw ' + ofNexusType);
        }
    }
}
withNexusSymbol(NexusNullDef, NexusTypes.Null);
/**
 * null()
 */
export function nullable(type) {
    if (isNexusNonNullTypeDef(type)) {
        return new NexusNullDef(type.ofNexusType);
    }
    if (isNexusNullTypeDef(type)) {
        return type;
    }
    return new NexusNullDef(type);
}
//# sourceMappingURL=nullable.js.map