import { getCurrentInstance, inject } from 'vue-demi';
export var DefaultApolloClient = Symbol('default-apollo-client');
export var ApolloClients = Symbol('apollo-clients');
function resolveDefaultClient(providedApolloClients, providedApolloClient) {
    var resolvedClient = providedApolloClients
        ? providedApolloClients.default
        : providedApolloClient;
    return resolvedClient;
}
function resolveClientWithId(providedApolloClients, clientId) {
    if (!providedApolloClients) {
        throw new Error("No apolloClients injection found, tried to resolve '" + clientId + "' clientId");
    }
    return providedApolloClients[clientId];
}
export function useApolloClient(clientId) {
    var resolveImpl;
    if (!getCurrentInstance()) {
        resolveImpl = function () { return currentApolloClient; };
    }
    else {
        var providedApolloClients_1 = inject(ApolloClients, null);
        var providedApolloClient_1 = inject(DefaultApolloClient, null);
        resolveImpl = function (id) {
            if (currentApolloClient) {
                return currentApolloClient;
            }
            else if (id) {
                return resolveClientWithId(providedApolloClients_1, id);
            }
            return resolveDefaultClient(providedApolloClients_1, providedApolloClient_1);
        };
    }
    function resolveClient(id) {
        if (id === void 0) { id = clientId; }
        var client = resolveImpl(id);
        if (!client) {
            throw new Error("Apollo client with id " + (id || 'default') + " not found. Use provideApolloClient() if you are outside of a component setup.");
        }
        return client;
    }
    return {
        resolveClient: resolveClient,
        get client() {
            return resolveClient();
        },
    };
}
var currentApolloClient;
export function provideApolloClient(client) {
    currentApolloClient = client;
    return function (fn) {
        var result = fn();
        currentApolloClient = null;
        return result;
    };
}
//# sourceMappingURL=useApolloClient.js.map