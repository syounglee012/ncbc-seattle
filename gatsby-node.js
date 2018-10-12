const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              path
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach(({ node }) => {
      const id = node.id;

      createPage({
        path: node.fields.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          id
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
