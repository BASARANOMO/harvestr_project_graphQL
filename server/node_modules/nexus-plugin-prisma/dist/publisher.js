"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNexusTypesCompositionForOutput = exports.getNexusTypesCompositionForInput = exports.Publisher = void 0;
const Nexus = __importStar(require("@nexus/schema"));
const graphql_1 = require("./graphql");
const utils_1 = require("./utils");
class Publisher {
    constructor(dmmf, nexusBuilder, scalars) {
        this.dmmf = dmmf;
        this.nexusBuilder = nexusBuilder;
        this.scalars = scalars;
        this.typesPublished = {};
    }
    inputType(customArg) {
        const typeName = customArg.type.name;
        // If type is already published, just reference it
        if (this.isPublished(typeName)) {
            // NOTE the any cast is to get around this error in CI:
            // https://github.com/graphql-nexus/nexus-plugin-prisma/runs/1453859042#step:7:9
            return Nexus.arg({
                type: exports.getNexusTypesCompositionForInput(customArg.arg.inputType).reduceRight(utils_1.apply, customArg.type.name),
            });
        }
        if (customArg.arg.inputType.kind === 'scalar') {
            return this.publishScalar(customArg.type.name);
        }
        if (customArg.arg.inputType.kind === 'enum') {
            return this.publishEnum(customArg.type.name);
        }
        const inputType = customArg.type;
        return this.publishInputObjectType(inputType);
    }
    // Return type of 'any' to prevent a type mismatch with `type` property of nexus
    outputType(outputTypeName, field) {
        /**
         * Rules:
         * - If outputTypeName is already published
         * - Or if outputTypeName matches a prisma model name
         * - Then simply reference the type. Types that matches a prisma model name should be published manually by users.
         */
        if (this.isPublished(outputTypeName) || this.dmmf.hasModel(outputTypeName)) {
            return outputTypeName;
        }
        // If output object type, just reference the type
        if (field.outputType.kind === 'object') {
            return this.publishObject(outputTypeName);
        }
        if (this.dmmf.hasEnumType(outputTypeName)) {
            return this.publishEnum(outputTypeName);
        }
        if (field.outputType.kind === 'scalar') {
            return this.publishScalar(outputTypeName);
        }
        return outputTypeName;
    }
    publishObject(name) {
        const dmmfObject = this.dmmf.getOutputType(name);
        this.markTypeAsPublished(name);
        return Nexus.objectType({
            name,
            definition: (t) => {
                for (const field of dmmfObject.fields) {
                    // Cast any to avoid typegen errors
                    // https://github.com/graphql-nexus/nexus-plugin-prisma/pull/960/checks?check_run_id=1454008781#step:7:48
                    t.field(field.name, {
                        type: exports.getNexusTypesCompositionForOutput(field.outputType).reduceRight(utils_1.apply, field.outputType.type),
                    });
                }
            },
        });
    }
    publishScalar(typeName) {
        if (graphql_1.scalarsNameValues.includes(typeName)) {
            return typeName;
        }
        this.markTypeAsPublished(typeName);
        if (this.scalars[typeName]) {
            return this.scalars[typeName];
        }
        return Nexus.scalarType({
            name: typeName,
            serialize(value) {
                return value;
            },
        });
    }
    publishEnum(typeName) {
        const dmmfEnum = this.dmmf.getEnumType(typeName);
        this.markTypeAsPublished(typeName);
        return Nexus.enumType({
            name: typeName,
            members: dmmfEnum.values,
        });
    }
    publishInputObjectType(inputType) {
        this.markTypeAsPublished(inputType.name);
        return Nexus.inputObjectType({
            name: inputType.name,
            definition: (t) => {
                inputType.fields.forEach((field) => {
                    // TODO: Do not filter JsonFilter once Prisma implements them
                    // https://github.com/prisma/prisma/issues/2563
                    if (['JsonFilter', 'NullableJsonFilter'].includes(field.inputType.type)) {
                        return;
                    }
                    // Simply reference the field input type if it's already been visited, otherwise create it
                    let fieldType;
                    if (this.isPublished(field.inputType.type)) {
                        fieldType = field.inputType.type;
                    }
                    else {
                        fieldType = this.inputType({
                            arg: field,
                            type: this.getTypeFromArg(field),
                        });
                    }
                    t.field(field.name, {
                        type: exports.getNexusTypesCompositionForInput(field.inputType).reduceRight(utils_1.apply, fieldType),
                    });
                });
            },
        });
    }
    getTypeFromArg(arg) {
        const kindToType = {
            scalar: (typeName) => ({
                name: typeName,
            }),
            enum: (typeName) => this.dmmf.getEnumType(typeName),
            object: (typeName) => this.dmmf.getInputType(typeName),
        };
        return kindToType[arg.inputType.kind](arg.inputType.type);
    }
    isPublished(typeName) {
        // If the user's app has published a type of the same name treat it as an
        // override to us auto publishing.
        return this.nexusBuilder.hasType(typeName) || this.typesPublished[typeName];
    }
    markTypeAsPublished(typeName) {
        this.typesPublished[typeName] = true;
    }
}
exports.Publisher = Publisher;
/**
 * Get the composition-order pipeline of Nexus type def functions that will match the nullability and list types of the Prisma field type.
 *
 * For example { isList:true, isRequired: true } would result in array of funcs: [nonNull, list, nonNull]
 */
const getNexusTypesCompositionForInput = (fieldType) => {
    if (fieldType.isList) {
        return [Nexus.list, Nexus.nonNull];
    }
    else if (fieldType.isRequired === true) {
        return [Nexus.nonNull];
    }
    else if (fieldType.isRequired === false) {
        return [Nexus.nullable];
    }
    return [];
};
exports.getNexusTypesCompositionForInput = getNexusTypesCompositionForInput;
const getNexusTypesCompositionForOutput = (fieldType) => {
    if (fieldType.isList) {
        return [Nexus.nonNull, Nexus.list, Nexus.nonNull];
    }
    else if (fieldType.isRequired === true) {
        return [Nexus.nonNull];
    }
    else if (fieldType.isRequired === false) {
        return [Nexus.nullable];
    }
    return [];
};
exports.getNexusTypesCompositionForOutput = getNexusTypesCompositionForOutput;
//# sourceMappingURL=publisher.js.map