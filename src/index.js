/*
THIS FILE IS AN EXAMPLE
NO NEED TO BE USED
*/

const { PrismaClient } = require('@prisma/client');
const {ApolloServer, gql} = require('apollo-server');

/*
const typeDefs = gql`
    type Project {
        id: String
        name: String
    }

    type Query {
        projects: [Project]
        info: String!
    }
`;
*/

const resolvers = {
    Query: {
        projects: () => projects,
        info: () => `GraphQL + Apollo test`
    },
};

const server = new ApolloServer({ 
    typeDefs: './src/schema.graphql', 
    resolvers 
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });