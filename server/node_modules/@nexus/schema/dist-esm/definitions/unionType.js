import { assertValidName } from 'graphql';
import { NexusTypes, withNexusSymbol } from './_types';
import { messages } from '../messages';
export class UnionDefinitionBlock {
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
        console.error(new Error(messages.removedResolveType(this.typeBuilder.typeName)));
        this.typeBuilder.setLegacyResolveType(fn);
    }
}
export class NexusUnionTypeDef {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        assertValidName(name);
    }
    get value() {
        return this.config;
    }
}
withNexusSymbol(NexusUnionTypeDef, NexusTypes.Union);
/**
 * Defines a new `GraphQLUnionType`
 * @param config
 */
export function unionType(config) {
    return new NexusUnionTypeDef(config.name, config);
}
//# sourceMappingURL=unionType.js.map