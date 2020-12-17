import { isRef, reactive, computed } from 'vue-demi';
export function paramToReactive(param) {
    if (isRef(param)) {
        return param;
    }
    else if (typeof param === 'function') {
        return computed(param);
    }
    else if (param) {
        return reactive(param);
    }
    else {
        return param;
    }
}
//# sourceMappingURL=paramToReactive.js.map