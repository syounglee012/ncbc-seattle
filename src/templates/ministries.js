import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export const MinistriesPageTemplate = ({ pages, title, content }) => (
  <section className="page-container">
    <Helmet title={`${title} | Ministries`} />

    <h1>Ministries</h1>
    <ul>
      {pages.map(({ node: page }) => (
        <li key={page.id}>
          <Link to={page.fields.slug}>
            {page.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
    <div className="page">
      <h2 className="page--title">{title}</h2>
      <div
        className="page--content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </section>
);

MinistriesPageTemplate.defaultProps = {
  pages: [],
  title: ''
};

MinistriesPageTemplate.propTypes = {
  pages: PropTypes.array,
  title: PropTypes.string,
  content: PropTypes.node.isRequired
};

const MinistriesPage = ({ data }) => {
  const { edges: pages } = data.allMarkdownRemark;
  const { markdownRemark: page} = data;
  const { frontmatter: { title }, html } = page;

  return (
    <MinistriesPageTemplate
      pages={pages}
      title={title}
      content={html}
    />
  );
};

MinistriesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    }),
    markdownRemark: PropTypes.object
  }).isRequired
};

export default MinistriesPage;

export const ministriesPageQuery = graphql`
  query MinistriesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }

    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] },
      filter: { frontmatter: { templateKey: { eq: "ministries"} } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
            index
          }
        }
      }
    }
  }
`;
