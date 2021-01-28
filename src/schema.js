const { makeExecutableSchema } = require('apollo-server');
const { merge } = require('lodash');

const schemaDirectives = require('./directives');
const typeDefs = require('./typedefs/typeDefs');
const { postDefs, postResolvers } = require('./typedefs/post');

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, postDefs],
  resolvers: [merge(postResolvers)],
  schemaDirectives,
});

module.exports.schema = schema;
