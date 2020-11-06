import { extendType } from './extendType';
/**
 * Add one field to the Subscription type
 */
export function subscriptionField(fieldName, config) {
    return extendType({
        type: 'Subscription',
        definition(t) {
            const finalConfig = typeof config === 'function' ? config() : config;
            t.field(fieldName, finalConfig);
        },
    });
}
//# sourceMappingURL=subscriptionField.js.map