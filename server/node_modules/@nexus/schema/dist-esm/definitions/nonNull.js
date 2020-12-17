import { isNexusNonNullTypeDef, isNexusNullTypeDef, isNexusStruct } from './wrapping';
import { NexusTypes, withNexusSymbol } from './_types';
import { isNonNullType, isType } from 'graphql';
export class NexusNonNullDef {
    constructor(ofNexusType) {
        this.ofNexusType = ofNexusType;
        // @ts-ignore
        // Required field for TS to differentiate NonNull from Null from List
        this._isNexusNonNullDef = true;
        if (typeof ofNexusType !== 'string' && !isNexusStruct(ofNexusType) && !isType(ofNexusType)) {
            throw new Error('Cannot wrap unknown types in a nonNull(). Saw ' + ofNexusType);
        }
    }
}
withNexusSymbol(NexusNonNullDef, NexusTypes.NonNull);
export function nonNull(type) {
    if (isNexusNonNullTypeDef(type) || isNonNullType(type)) {
        return type;
    }
    if (isNexusNullTypeDef(type)) {
        return new NexusNonNullDef(type.ofNexusType);
    }
    return new NexusNonNullDef(type);
}
//# sourceMappingURL=nonNull.js.map