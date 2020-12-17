"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendType = exports.NexusExtendTypeDef = void 0;
const graphql_1 = require("graphql");
const _types_1 = require("./_types");
class NexusExtendTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        graphql_1.assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
exports.NexusExtendTypeDef = NexusExtendTypeDef;
_types_1.withNexusSymbol(NexusExtendTypeDef, _types_1.NexusTypes.ExtendObject);
/**
 * Adds new fields to an existing objectType in the schema. Useful when
 * splitting your schema across several domains.
 *
 * @see https://nexusjs.org/docs/api/extend-type
 */
function extendType(config) {
    return new NexusExtendTypeDef(config.type, Object.assign(Object.assign({}, config), { name: config.type }));
}
exports.extendType = extendType;
//# sourceMappingURL=extendType.js.map