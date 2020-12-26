const { gql } = require('apollo-server');

const { GraphQLObject } = require('../types');
const { mapPost } = require('../mappings');

const typeDefs = gql`
  type Details {
    size: Int
    image: Object
  }

  type File {
    url: String
    details: Details
    filename: String
    type: String
  }

  type Asset {
    title: String
    file: File
  }

  type Post {
    id: ID!
    title: String!
    slug: String!
    image: Asset
    body: Object!
    video: String
  }

  extend type Query {
    posts: [Post!]!
    post(slug: String!): Post
  }
`;

const resolvers = {
  Object: GraphQLObject,
  Query: {
    posts: async (_, __, { dataSources: { contentfulAPI } }) => {
      const { items } = await contentfulAPI.getEntries('recipe');
      return items.map(mapPost);
    },
    post: async (_, { slug }, { dataSources: { contentfulAPI } }) => {
      const { items } = await contentfulAPI.getEntry('recipe', slug);
      return items.map(mapPost)[0];
    }
  },
};

module.exports.postDefs = typeDefs;
module.exports.postResolvers = resolvers;
