"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionType = exports.NexusUnionTypeDef = exports.UnionDefinitionBlock = void 0;
const graphql_1 = require("graphql");
const _types_1 = require("./_types");
const messages_1 = require("../messages");
class UnionDefinitionBlock {
    constructor(typeBuilder) {
        this.typeBuilder = typeBuilder;
    }
    /**
     * All ObjectType names that should be part of the union, either
     * as string names or as references to the `objectType()` return value
     */
    members(...unionMembers) {
        this.typeBuilder.addUnionMembers(unionMembers);
    }
    /* istanbul ignore next */
    resolveType(fn) {
        console.error(new Error(messages_1.messages.removedResolveType(this.typeBuilder.typeName)));
        this.typeBuilder.setLegacyResolveType(fn);
    }
}
exports.UnionDefinitionBlock = UnionDefinitionBlock;
class NexusUnionTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        graphql_1.assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
exports.NexusUnionTypeDef = NexusUnionTypeDef;
_types_1.withNexusSymbol(NexusUnionTypeDef, _types_1.NexusTypes.Union);
/**
 * Defines a new `GraphQLUnionType`
 * @param config
 */
function unionType(config) {
    return new NexusUnionTypeDef(config.name, config);
}
exports.unionType = unionType;
//# sourceMappingURL=unionType.js.map