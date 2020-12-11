// api/server.ts
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

export const server = new ApolloServer({ schema, context: createContext });
