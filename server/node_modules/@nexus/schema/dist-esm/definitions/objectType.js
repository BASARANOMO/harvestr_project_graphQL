import { assertValidName } from 'graphql';
import { NexusTypes, withNexusSymbol } from './_types';
import { OutputDefinitionBlock } from './definitionBlocks';
export class ObjectDefinitionBlock extends OutputDefinitionBlock {
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
}
export class NexusObjectTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(NexusObjectTypeDef, NexusTypes.Object);
export function objectType(config) {
    return new NexusObjectTypeDef(config.name, config);
}
export function queryType(config) {
    return objectType(Object.assign(Object.assign({}, config), { name: 'Query' }));
}
export function mutationType(config) {
    return objectType(Object.assign(Object.assign({}, config), { name: 'Mutation' }));
}
//# sourceMappingURL=objectType.js.map