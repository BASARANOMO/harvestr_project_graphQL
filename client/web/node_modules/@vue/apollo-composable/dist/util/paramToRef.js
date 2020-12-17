import { isRef, computed, ref } from 'vue-demi';
export function paramToRef(param) {
    if (isRef(param)) {
        return param;
    }
    else if (typeof param === 'function') {
        return computed(param);
    }
    else {
        return ref(param);
    }
}
//# sourceMappingURL=paramToRef.js.map