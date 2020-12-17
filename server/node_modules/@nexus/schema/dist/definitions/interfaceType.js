"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interfaceType = exports.NexusInterfaceTypeDef = exports.InterfaceDefinitionBlock = void 0;
const graphql_1 = require("graphql");
const _types_1 = require("./_types");
const definitionBlocks_1 = require("./definitionBlocks");
const messages_1 = require("../messages");
class InterfaceDefinitionBlock extends definitionBlocks_1.OutputDefinitionBlock {
    constructor(typeBuilder) {
        super(typeBuilder);
        this.typeBuilder = typeBuilder;
    }
    /**
     * @param interfaceName
     */
    implements(...interfaceName) {
        this.typeBuilder.addInterfaces(interfaceName);
    }
    /**
     * Modifies a field added via an interface
     */
    modify(field, modifications) {
        this.typeBuilder.addModification(Object.assign(Object.assign({}, modifications), { field }));
    }
    /* istanbul ignore next */
    resolveType(fn) {
        console.error(new Error(messages_1.messages.removedResolveType(this.typeBuilder.typeName)));
        this.typeBuilder.setLegacyResolveType(fn);
    }
}
exports.InterfaceDefinitionBlock = InterfaceDefinitionBlock;
class NexusInterfaceTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        graphql_1.assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
exports.NexusInterfaceTypeDef = NexusInterfaceTypeDef;
_types_1.withNexusSymbol(NexusInterfaceTypeDef, _types_1.NexusTypes.Interface);
/**
 * Defines a GraphQLInterfaceType
 * @param config
 */
function interfaceType(config) {
    return new NexusInterfaceTypeDef(config.name, config);
}
exports.interfaceType = interfaceType;
//# sourceMappingURL=interfaceType.js.map