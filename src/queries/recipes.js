const { gql } = require('apollo-server');

const RECIPES_QUERY = gql`
  query recipes {
    recipes: posts {
      id
      title
      slug
      image {
        file {
          url
          details {
            image
          }
        }
      }
    }
  }
`;

const RECIPE_QUERY = gql`
  query($slug: String!) {
    recipe: post(slug: $slug) {
      id
      title
      slug
      body
      video
      image {
        file {
          url
          details {
            image
          }
          type
        }
      }
    }
  }
`;

module.exports.RECIPES_QUERY = RECIPES_QUERY;
module.exports.RECIPE_QUERY = RECIPE_QUERY;
