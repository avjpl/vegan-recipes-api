require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const ContentfulAPI = require('./src/datasourses/contentful');
const { schema } = require('./src/schema');

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    contentfulAPI: new ContentfulAPI(),
  }),
  context: async () => {
    const {
      CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      CONTENTFUL_SPACE_ID,
    } = process.env;

    return {
      contentful_space_id: CONTENTFUL_SPACE_ID,
      contentful_access_token: CONTENTFUL_DELIVERY_ACCESS_TOKEN,
    };
  },
});

apolloServer
  .listen({
    port: 4001,
    path: '/api/graphql',
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
