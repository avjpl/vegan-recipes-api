const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { postDefs, postResolvers } = require('../../src/typedefs/post');
const typeDefs = require('../../src/typedefs/typeDefs');

const createTestServer = ({ ctx, sources }) => {
  const server = new ApolloServer({
    typeDefs: [typeDefs, postDefs],
    resolvers: postResolvers,
    mockEntireSchema: false,
    mocks: true,
    dataSources: () => sources,
    context: () => ctx,
  });

  return createTestClient(server);
};

module.exports.createTestServer = createTestServer;
