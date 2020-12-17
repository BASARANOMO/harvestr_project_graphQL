import { getCurrentTracking, getAppTracking } from './util/loadingTracking';
import { computed } from 'vue-demi';
export function useQueryLoading() {
    var tracking = getCurrentTracking().tracking;
    return computed(function () { return tracking.queries.value > 0; });
}
export function useMutationLoading() {
    var tracking = getCurrentTracking().tracking;
    return computed(function () { return tracking.mutations.value > 0; });
}
export function useSubscriptionLoading() {
    var tracking = getCurrentTracking().tracking;
    return computed(function () { return tracking.subscriptions.value > 0; });
}
export function useGlobalQueryLoading() {
    var appTracking = getAppTracking().appTracking;
    return computed(function () { return appTracking.queries.value > 0; });
}
export function useGlobalMutationLoading() {
    var appTracking = getAppTracking().appTracking;
    return computed(function () { return appTracking.mutations.value > 0; });
}
export function useGlobalSubscriptionLoading() {
    var appTracking = getAppTracking().appTracking;
    return computed(function () { return appTracking.subscriptions.value > 0; });
}
//# sourceMappingURL=useLoading.js.map