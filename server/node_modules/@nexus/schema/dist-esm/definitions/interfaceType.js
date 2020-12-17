import { assertValidName } from 'graphql';
import { NexusTypes, withNexusSymbol } from './_types';
import { OutputDefinitionBlock } from './definitionBlocks';
import { messages } from '../messages';
export class InterfaceDefinitionBlock extends OutputDefinitionBlock {
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
        console.error(new Error(messages.removedResolveType(this.typeBuilder.typeName)));
        this.typeBuilder.setLegacyResolveType(fn);
    }
}
export class NexusInterfaceTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(NexusInterfaceTypeDef, NexusTypes.Interface);
/**
 * Defines a GraphQLInterfaceType
 * @param config
 */
export function interfaceType(config) {
    return new NexusInterfaceTypeDef(config.name, config);
}
//# sourceMappingURL=interfaceType.js.map