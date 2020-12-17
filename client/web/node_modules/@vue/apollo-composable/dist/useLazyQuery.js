var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isRef } from 'vue-demi';
import { useQueryImpl } from './useQuery';
export function useLazyQuery(document, variables, options) {
    var query = useQueryImpl(document, variables, options, true);
    function load(document, variables, options) {
        if (document) {
            query.document.value = document;
        }
        if (variables) {
            query.variables.value = variables;
        }
        if (options) {
            Object.assign(isRef(query.options) ? query.options.value : query.options, options);
        }
        query.forceDisabled.value = false;
    }
    return __assign(__assign({}, query), { load: load });
}
//# sourceMappingURL=useLazyQuery.js.map