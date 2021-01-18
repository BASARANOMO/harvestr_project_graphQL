import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

const { RedisCache } = require('apollo-server-cache-redis');
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const cacheControl = { defaultMaxAge: 1 };

const cache = new RedisCache({
  host: '127.0.0.1',
  port: 6379,
  // Options are passed through to the Redis client
})

const server = new ApolloServer({
  schema,
  context: createContext(),
  tracing: true,
  cache: cache,
  cacheControl,
  plugins: [responseCachePlugin({ cache })],
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
