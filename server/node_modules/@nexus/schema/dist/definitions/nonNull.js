"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonNull = exports.NexusNonNullDef = void 0;
const wrapping_1 = require("./wrapping");
const _types_1 = require("./_types");
const graphql_1 = require("graphql");
class NexusNonNullDef {
    constructor(ofNexusType) {
        this.ofNexusType = ofNexusType;
        // @ts-ignore
        // Required field for TS to differentiate NonNull from Null from List
        this._isNexusNonNullDef = true;
        if (typeof ofNexusType !== 'string' && !wrapping_1.isNexusStruct(ofNexusType) && !graphql_1.isType(ofNexusType)) {
            throw new Error('Cannot wrap unknown types in a nonNull(). Saw ' + ofNexusType);
        }
    }
}
exports.NexusNonNullDef = NexusNonNullDef;
_types_1.withNexusSymbol(NexusNonNullDef, _types_1.NexusTypes.NonNull);
function nonNull(type) {
    if (wrapping_1.isNexusNonNullTypeDef(type) || graphql_1.isNonNullType(type)) {
        return type;
    }
    if (wrapping_1.isNexusNullTypeDef(type)) {
        return new NexusNonNullDef(type.ofNexusType);
    }
    return new NexusNonNullDef(type);
}
exports.nonNull = nonNull;
//# sourceMappingURL=nonNull.js.map