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
import { ref, watch, isRef, computed, getCurrentInstance, onBeforeUnmount, nextTick, } from 'vue-demi';
import { throttle, debounce } from 'throttle-debounce';
import { paramToRef } from './util/paramToRef';
import { paramToReactive } from './util/paramToReactive';
import { useApolloClient } from './useApolloClient';
import { useEventHook } from './util/useEventHook';
import { trackSubscription } from './util/loadingTracking';
export function useSubscription(document, variables, options) {
    if (variables === void 0) { variables = null; }
    if (options === void 0) { options = null; }
    // Is on server?
    var vm = getCurrentInstance();
    var isServer = vm === null || vm === void 0 ? void 0 : vm.$isServer;
    if (variables == null)
        variables = ref();
    if (!options)
        options = {};
    var documentRef = paramToRef(document);
    var variablesRef = paramToRef(variables);
    var optionsRef = paramToReactive(options);
    var result = ref();
    var resultEvent = useEventHook();
    var error = ref(null);
    var errorEvent = useEventHook();
    var loading = ref(false);
    trackSubscription(loading);
    // Apollo Client
    var resolveClient = useApolloClient().resolveClient;
    var subscription = ref();
    var observer;
    var started = false;
    function start() {
        if (started || !isEnabled.value || isServer)
            return;
        started = true;
        loading.value = true;
        var client = resolveClient(currentOptions.value.clientId);
        subscription.value = client.subscribe(__assign({ query: currentDocument, variables: currentVariables }, currentOptions.value));
        observer = subscription.value.subscribe({
            next: onNextResult,
            error: onError,
        });
    }
    function onNextResult(fetchResult) {
        result.value = fetchResult.data;
        loading.value = false;
        resultEvent.trigger(fetchResult);
    }
    function onError(fetchError) {
        error.value = fetchError;
        loading.value = false;
        errorEvent.trigger(fetchError);
    }
    function stop() {
        if (!started)
            return;
        started = false;
        loading.value = false;
        if (subscription.value) {
            subscription.value = null;
        }
        if (observer) {
            observer.unsubscribe();
            observer = null;
        }
    }
    // Restart
    var restarting = false;
    /**
     * Queue a restart of the query (on next tick) if it is already active
     */
    function baseRestart() {
        if (!started || restarting)
            return;
        restarting = true;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        nextTick(function () {
            if (started) {
                stop();
                start();
            }
            restarting = false;
        });
    }
    var debouncedRestart;
    function updateRestartFn() {
        if (currentOptions.value.throttle) {
            debouncedRestart = throttle(currentOptions.value.throttle, baseRestart);
        }
        else if (currentOptions.value.debounce) {
            debouncedRestart = debounce(currentOptions.value.debounce, baseRestart);
        }
        else {
            debouncedRestart = baseRestart;
        }
    }
    function restart() {
        if (!debouncedRestart)
            updateRestartFn();
        debouncedRestart();
    }
    // Applying options
    var currentOptions = ref();
    watch(function () { return isRef(optionsRef) ? optionsRef.value : optionsRef; }, function (value) {
        if (currentOptions.value && (currentOptions.value.throttle !== value.throttle ||
            currentOptions.value.debounce !== value.debounce)) {
            updateRestartFn();
        }
        currentOptions.value = value;
        restart();
    }, {
        deep: true,
        immediate: true,
    });
    // Applying document
    var currentDocument;
    watch(documentRef, function (value) {
        currentDocument = value;
        restart();
    }, {
        immediate: true,
    });
    // Applying variables
    var currentVariables;
    var currentVariablesSerialized;
    watch(variablesRef, function (value, oldValue) {
        var serialized = JSON.stringify(value);
        if (serialized !== currentVariablesSerialized) {
            currentVariables = value;
            restart();
        }
        currentVariablesSerialized = serialized;
    }, {
        deep: true,
        immediate: true,
    });
    // Internal enabled returned to user
    // @TODO Doesn't fully work yet, need to initialize with option
    // const enabled = ref<boolean>()
    var enabledOption = computed(function () { return !currentOptions.value || currentOptions.value.enabled == null || currentOptions.value.enabled; });
    // const isEnabled = computed(() => !!((typeof enabled.value === 'boolean' && enabled.value) && enabledOption.value))
    var isEnabled = enabledOption;
    // watch(enabled, value => {
    //   if (value == null) {
    //     enabled.value = enabledOption.value
    //   }
    // })
    // Auto start & stop
    watch(isEnabled, function (value) {
        if (value) {
            start();
        }
        else {
            stop();
        }
    }, {
        immediate: true,
    });
    // Teardown
    onBeforeUnmount(stop);
    return {
        result: result,
        loading: loading,
        error: error,
        // @TODO doesn't fully work yet
        // enabled,
        start: start,
        stop: stop,
        restart: restart,
        document: documentRef,
        variables: variablesRef,
        options: optionsRef,
        subscription: subscription,
        onResult: resultEvent.on,
        onError: errorEvent.on,
    };
}
//# sourceMappingURL=useSubscription.js.map