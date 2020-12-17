"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullable = exports.NexusNullDef = void 0;
const graphql_1 = require("graphql");
const wrapping_1 = require("./wrapping");
const _types_1 = require("./_types");
class NexusNullDef {
    constructor(ofNexusType) {
        this.ofNexusType = ofNexusType;
        // @ts-ignore
        // Required field for TS to differentiate NonNull from Null from List
        this._isNexusNullDef = true;
        if (typeof ofNexusType !== 'string' && !wrapping_1.isNexusStruct(ofNexusType) && !graphql_1.isType(ofNexusType)) {
            throw new Error('Cannot wrap unknown types in nullable(). Saw ' + ofNexusType);
        }
    }
}
exports.NexusNullDef = NexusNullDef;
_types_1.withNexusSymbol(NexusNullDef, _types_1.NexusTypes.Null);
/**
 * null()
 */
function nullable(type) {
    if (wrapping_1.isNexusNonNullTypeDef(type)) {
        return new NexusNullDef(type.ofNexusType);
    }
    if (wrapping_1.isNexusNullTypeDef(type)) {
        return type;
    }
    return new NexusNullDef(type);
}
exports.nullable = nullable;
//# sourceMappingURL=nullable.js.map