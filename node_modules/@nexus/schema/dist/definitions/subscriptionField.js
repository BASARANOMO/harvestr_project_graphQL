"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionField = void 0;
const extendType_1 = require("./extendType");
/**
 * Add one field to the Subscription type
 */
function subscriptionField(fieldName, config) {
    return extendType_1.extendType({
        type: 'Subscription',
        definition(t) {
            const finalConfig = typeof config === 'function' ? config() : config;
            t.field(fieldName, finalConfig);
        },
    });
}
exports.subscriptionField = subscriptionField;
//# sourceMappingURL=subscriptionField.js.map