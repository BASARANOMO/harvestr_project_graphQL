"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComputedInputs = exports.transform = exports.getTransformedDmmf = void 0;
const util_1 = require("util");
const pagination_1 = require("../pagination");
const DmmfDocument_1 = require("./DmmfDocument");
const helpers_1 = require("./helpers");
const utils_1 = require("./utils");
const getTransformedDmmf = (prismaClientPackagePath, options) => new DmmfDocument_1.DmmfDocument(transform(utils_1.getPrismaClientDmmf(prismaClientPackagePath), options));
exports.getTransformedDmmf = getTransformedDmmf;
const addDefaultOptions = (givenOptions) => (Object.assign({ globallyComputedInputs: {}, paginationStrategy: pagination_1.paginationStrategies.relay, atomicOperations: true }, givenOptions));
function transform(document, options) {
    const result = {
        datamodel: transformDatamodel(document.datamodel),
        schema: transformSchema(document.schema, addDefaultOptions(options)),
        operations: document.mappings.modelOperations,
    };
    return result;
}
exports.transform = transform;
function transformDatamodel(datamodel) {
    return {
        enums: datamodel.enums,
        models: datamodel.models.map((model) => (Object.assign(Object.assign({}, model), { fields: model.fields.map((field) => (Object.assign(Object.assign({}, field), { kind: field.kind === 'object' ? 'relation' : field.kind }))) }))),
    };
}
const paginationArgNames = ['cursor', 'take', 'skip'];
function transformSchema(schema, options) {
    var _a, _b, _c, _d, _e;
    const enumTypes = (_a = schema.enumTypes.model) !== null && _a !== void 0 ? _a : [];
    const inputTypes = (_c = (_b = schema.inputObjectTypes.model) === null || _b === void 0 ? void 0 : _b.map((type) => transformInputType(type, options.globallyComputedInputs, options.atomicOperations))) !== null && _c !== void 0 ? _c : [];
    const outputTypes = (_e = (_d = schema.outputObjectTypes.model) === null || _d === void 0 ? void 0 : _d.map((type) => {
        return transformOutputType(type, options);
    })) !== null && _e !== void 0 ? _e : [];
    // todo review if we want to keep model & prisma separated or not
    // since Prisma 2.12
    enumTypes.push(...schema.enumTypes.prisma);
    inputTypes.push(...schema.inputObjectTypes.prisma.map((type) => {
        return transformInputType(type, options.globallyComputedInputs, options.atomicOperations);
    }));
    outputTypes.push(...schema.outputObjectTypes.prisma.map((type) => {
        return transformOutputType(type, options);
    }));
    return {
        enums: enumTypes,
        inputTypes,
        outputTypes,
    };
}
function transformOutputType(type, options) {
    return Object.assign(Object.assign({}, type), { fields: type.fields.map((field) => {
            let args = field.args.map((arg) => transformArg(arg, options.atomicOperations));
            const argNames = args.map((a) => a.name);
            // If this field has pagination
            if (paginationArgNames.every((paginationArgName) => argNames.includes(paginationArgName))) {
                args = options.paginationStrategy.transformDmmfArgs({
                    args,
                    paginationArgNames,
                    field,
                });
            }
            return {
                name: field.name,
                args,
                outputType: {
                    type: helpers_1.getTypeName(field.outputType.type),
                    kind: getKind(field.outputType),
                    isRequired: field.isRequired,
                    isNullable: field.isNullable,
                    isList: field.outputType.isList,
                },
            };
        }) });
}
/**
 * Conversion from a Prisma Client arg type to a GraphQL arg type using
 * heuristics. A conversion is needed because GraphQL does not
 * support union types on args, but Prisma Client does.
 */
function transformArg(arg, atomicOperations) {
    const inputType = argTypeUnionToArgType(arg.inputTypes, atomicOperations);
    return {
        name: arg.name,
        inputType: {
            type: helpers_1.getTypeName(inputType.type),
            isList: inputType.isList,
            kind: getKind(inputType),
            isNullable: arg.isNullable,
            isRequired: arg.isRequired,
        },
    };
}
/**
 * Prisma Client supports union types but GraphQL doesn't.
 * Because of that, we need to choose a member of the union type that we'll expose on our GraphQL schema.
 *
 * Apart from some exceptions, we're generally trying to pick the broadest member type of the union.
 */
function argTypeUnionToArgType(argTypeContexts, atomicOperations) {
    var _a, _b, _c, _d;
    // Remove atomic operations if needed
    const filteredArgTypeContexts = atomicOperations === false
        ? argTypeContexts.filter((argTypeCtx) => !helpers_1.getTypeName(argTypeCtx.type).endsWith('OperationsInput'))
        : argTypeContexts;
    const result = (_d = (_c = (_b = (_a = 
    // We're intentionally ignoring the `<Model>RelationFilter` member of some union type for now and using the `<Model>WhereInput` instead to avoid making a breaking change
    filteredArgTypeContexts.find((argTypeCtx) => isInputObjectType(argTypeCtx) &&
        argTypeCtx.isList &&
        helpers_1.getTypeName(argTypeCtx.type).endsWith('WhereInput'))) !== null && _a !== void 0 ? _a : 
    // Same here
    filteredArgTypeContexts.find((argTypeCtx) => isInputObjectType(argTypeCtx) && helpers_1.getTypeName(argTypeCtx.type).endsWith('WhereInput'))) !== null && _b !== void 0 ? _b : 
    // [AnyType]
    filteredArgTypeContexts.find((argTypeCtx) => isInputObjectType(argTypeCtx) && argTypeCtx.isList)) !== null && _c !== void 0 ? _c : 
    // AnyType
    filteredArgTypeContexts.find((argTypeCtx) => isInputObjectType(argTypeCtx))) !== null && _d !== void 0 ? _d : 
    // fallback to the first member of the union
    argTypeContexts[0];
    return result;
    function isInputObjectType(argTypeCtx) {
        return argTypeCtx.location === 'inputObjectTypes';
    }
}
/**
 * Recursively looks for inputs that need a value from globallyComputedInputs
 * and populates them
 */
function addGloballyComputedInputs({ inputType, params, dmmf, data, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(data)) {
            return Promise.all(data.map((value) => addGloballyComputedInputs({
                inputType,
                dmmf,
                params,
                data: value,
            })));
        }
        // Get values for computedInputs corresponding to keys that exist in inputType
        const computedInputValues = Object.keys(inputType.computedInputs).reduce((values, key) => __awaiter(this, void 0, void 0, function* () {
            return (Object.assign(Object.assign({}, (yield values)), { [key]: yield inputType.computedInputs[key](params) }));
        }), Promise.resolve({}));
        // Combine computedInputValues with values provided by the user, recursing to add
        // global computedInputs to nested types
        return Object.keys(data).reduce((deeplyComputedData, fieldName) => __awaiter(this, void 0, void 0, function* () {
            const field = inputType.fields.find((_) => _.name === fieldName);
            const fieldValue = field.inputType.kind === 'object'
                ? yield addGloballyComputedInputs({
                    inputType: dmmf.getInputType(field.inputType.type),
                    dmmf,
                    params,
                    data: data[fieldName],
                })
                : data[fieldName];
            return Object.assign(Object.assign({}, (yield deeplyComputedData)), { [fieldName]: fieldValue });
        }), computedInputValues);
    });
}
function addComputedInputs({ dmmf, inputType, locallyComputedInputs, params, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, params.args), { data: Object.assign(Object.assign({}, (yield addGloballyComputedInputs({
                inputType,
                dmmf,
                params,
                data: params.args.data,
            }))), (yield Object.entries(locallyComputedInputs).reduce((args, [fieldName, computeFieldValue]) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, (yield args)), { [fieldName]: yield computeFieldValue(params) }));
            }), Promise.resolve({})))) });
    });
}
exports.addComputedInputs = addComputedInputs;
function transformInputType(inputType, globallyComputedInputs, atomicOperations) {
    const fieldNames = inputType.fields.map((field) => field.name);
    /**
     * Only global computed inputs are removed during schema transform.
     * Resolver level computed inputs are filtered as part of the
     * projecting process. They are then passed to addComputedInputs
     * at runtime so their values can be inferred alongside the
     * global values.
     */
    const globallyComputedInputsInType = Object.keys(globallyComputedInputs).reduce((args, key) => fieldNames.includes(key) ? Object.assign(args, { [key]: globallyComputedInputs[key] }) : args, {});
    return Object.assign(Object.assign({}, inputType), { fields: inputType.fields
            .filter((field) => !(field.name in globallyComputedInputs))
            .map((field) => transformArg(field, atomicOperations)), computedInputs: globallyComputedInputsInType });
}
function getKind(arg) {
    const type = arg.type;
    if (arg.location === 'scalar') {
        return 'scalar';
    }
    if (arg.location === 'enumTypes') {
        return 'enum';
    }
    if (arg.location === 'inputObjectTypes') {
        return 'object';
    }
    if (arg.location === 'outputObjectTypes') {
        return 'object';
    }
    throw new Error(`Failed to transform DMMF into internal DMMF because cannot get arg kind for given type because it is unknown or malformed. The type data is:\n\n${util_1.inspect(type)}`);
}
//# sourceMappingURL=transformer.js.map