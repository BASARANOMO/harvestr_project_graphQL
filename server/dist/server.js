"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const context_1 = require("./context");
const { RedisCache } = require('apollo-server-cache-redis');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const cacheControl = { defaultMaxAge: 3600 };
const cache = new RedisCache({
    host: '127.0.0.1',
    port: 6379,
});
const server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.createContext(),
    tracing: true,
    cache: cache,
    cacheControl,
    plugins: [responseCachePlugin({ cache })],
});
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=server.js.map