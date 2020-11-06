const {ApolloServer, gql} = require('apollo-server');

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

const resolvers = {
    Query: {
        projects: () => projects,
        info: () => `GraphQL + Apollo test`
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });