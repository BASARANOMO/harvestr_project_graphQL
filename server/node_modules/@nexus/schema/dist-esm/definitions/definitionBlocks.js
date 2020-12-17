import { messages } from '../messages';
/**
 * The output definition block is passed to the "definition"
 * function property of the "objectType" / "interfaceType"
 */
export class OutputDefinitionBlock {
    constructor(typeBuilder, wrapping) {
        this.typeBuilder = typeBuilder;
        this.wrapping = wrapping;
        this.typeName = typeBuilder.typeName;
        this.typeBuilder.addDynamicOutputMembers(this, this.wrapping);
    }
    get list() {
        return this._wrapClass('List');
    }
    get nonNull() {
        return this._wrapClass('NonNull');
    }
    get nullable() {
        return this._wrapClass('Null');
    }
    string(fieldName, ...opts) {
        this.addScalarField(fieldName, 'String', opts);
    }
    int(fieldName, ...opts) {
        this.addScalarField(fieldName, 'Int', opts);
    }
    boolean(fieldName, ...opts) {
        this.addScalarField(fieldName, 'Boolean', opts);
    }
    id(fieldName, ...opts) {
        this.addScalarField(fieldName, 'ID', opts);
    }
    float(fieldName, ...opts) {
        this.addScalarField(fieldName, 'Float', opts);
    }
    field(name, fieldConfig) {
        this.typeBuilder.addField(Object.assign(Object.assign({ name }, fieldConfig), { configFor: 'outputField', wrapping: this.wrapping, parentType: this.typeName }));
    }
    _wrapClass(kind) {
        var _a;
        const previousWrapping = (_a = this.wrapping) === null || _a === void 0 ? void 0 : _a[0];
        if ((kind === 'NonNull' || kind === 'Null') &&
            (previousWrapping === 'NonNull' || previousWrapping === 'Null')) {
            return new OutputDefinitionBlock(this.typeBuilder, this.wrapping || []);
        }
        return new OutputDefinitionBlock(this.typeBuilder, [kind].concat(this.wrapping || []));
    }
    addScalarField(fieldName, typeName, opts) {
        let config = {
            name: fieldName,
            type: typeName,
            parentType: this.typeName,
            configFor: 'outputField',
        };
        /* istanbul ignore if */
        if (typeof opts[0] === 'function') {
            config.resolve = opts[0];
            console.warn(messages.removedFunctionShorthand(typeName, fieldName));
        }
        else {
            config = Object.assign(Object.assign({}, config), opts[0]);
        }
        this.typeBuilder.addField(Object.assign(Object.assign({}, config), { wrapping: this.wrapping }));
    }
}
export class InputDefinitionBlock {
    constructor(typeBuilder, wrapping) {
        this.typeBuilder = typeBuilder;
        this.wrapping = wrapping;
        this.typeName = typeBuilder.typeName;
        this.typeBuilder.addDynamicInputFields(this, this.wrapping);
    }
    get list() {
        return this._wrapClass('List');
    }
    get nonNull() {
        return this._wrapClass('NonNull');
    }
    get nullable() {
        return this._wrapClass('Null');
    }
    string(fieldName, opts) {
        this.addScalarField(fieldName, 'String', opts);
    }
    int(fieldName, opts) {
        this.addScalarField(fieldName, 'Int', opts);
    }
    boolean(fieldName, opts) {
        this.addScalarField(fieldName, 'Boolean', opts);
    }
    id(fieldName, opts) {
        this.addScalarField(fieldName, 'ID', opts);
    }
    float(fieldName, opts) {
        this.addScalarField(fieldName, 'Float', opts);
    }
    field(fieldName, fieldConfig) {
        this.typeBuilder.addField(Object.assign(Object.assign({ name: fieldName }, fieldConfig), { wrapping: this.wrapping, parentType: this.typeName, configFor: 'inputField' }));
    }
    _wrapClass(kind) {
        var _a;
        const previousWrapping = (_a = this.wrapping) === null || _a === void 0 ? void 0 : _a[0];
        if ((kind === 'NonNull' || kind === 'Null') &&
            (previousWrapping === 'NonNull' || previousWrapping === 'Null')) {
            return new InputDefinitionBlock(this.typeBuilder, this.wrapping || []);
        }
        return new InputDefinitionBlock(this.typeBuilder, [kind].concat(this.wrapping || []));
    }
    addScalarField(fieldName, typeName, opts = {}) {
        this.typeBuilder.addField(Object.assign(Object.assign({ name: fieldName, type: typeName }, opts), { wrapping: this.wrapping, parentType: this.typeName, configFor: 'inputField' }));
    }
}
//# sourceMappingURL=definitionBlocks.js.map