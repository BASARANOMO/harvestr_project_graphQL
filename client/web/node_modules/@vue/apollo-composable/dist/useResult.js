import { computed } from 'vue-demi';
export function useResult(result, defaultValue, pick) {
    return computed(function () {
        var value = result.value;
        if (value) {
            if (pick) {
                try {
                    return pick(value);
                }
                catch (e) {
                    // Silent error
                }
            }
            else {
                var keys = Object.keys(value);
                if (keys.length === 1) {
                    // Automatically take the only key in result data
                    return value[keys[0]];
                }
                else {
                    // Return entire result data
                    return value;
                }
            }
        }
        return defaultValue;
    });
}
//# sourceMappingURL=useResult.js.map