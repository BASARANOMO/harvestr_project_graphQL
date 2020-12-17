import { watch, onUnmounted, ref, getCurrentInstance, onBeforeUnmount } from 'vue-demi';
export function getAppTracking() {
    var vm = getCurrentInstance();
    var root = vm.$root || vm.root;
    var appTracking;
    if (!root._apolloAppTracking) {
        // Add per Vue tracking
        appTracking = root._apolloAppTracking = {
            queries: ref(0),
            mutations: ref(0),
            subscriptions: ref(0),
            components: new Map(),
        };
    }
    else {
        appTracking = root._apolloAppTracking;
    }
    return {
        appTracking: appTracking,
    };
}
export function getCurrentTracking() {
    var vm = getCurrentInstance();
    if (!vm) {
        throw new Error('getCurrentTracking must be used during a component setup');
    }
    var appTracking = getAppTracking().appTracking;
    var tracking;
    if (!appTracking.components.has(vm)) {
        // Add per-component tracking
        appTracking.components.set(vm, tracking = {
            queries: ref(0),
            mutations: ref(0),
            subscriptions: ref(0),
        });
        // Cleanup
        onUnmounted(function () {
            appTracking.components.delete(vm);
        });
    }
    else {
        tracking = appTracking.components.get(vm);
    }
    return {
        appTracking: appTracking,
        tracking: tracking,
    };
}
function track(loading, type) {
    var _a = getCurrentTracking(), appTracking = _a.appTracking, tracking = _a.tracking;
    watch(loading, function (value, oldValue) {
        if (oldValue != null && value !== oldValue) {
            var mod = value ? 1 : -1;
            tracking[type].value += mod;
            appTracking[type].value += mod;
        }
    }, {
        immediate: true,
    });
    onBeforeUnmount(function () {
        if (loading.value) {
            tracking[type].value--;
            appTracking[type].value--;
        }
    });
}
export function trackQuery(loading) {
    track(loading, 'queries');
}
export function trackMutation(loading) {
    track(loading, 'mutations');
}
export function trackSubscription(loading) {
    track(loading, 'subscriptions');
}
//# sourceMappingURL=loadingTracking.js.map