import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export const AboutPageTemplate = ({ pages, title, content }) => {
  return (
    <section className="page-container">
      <Helmet title={`${title} | About Us`} />

      <h1>About Us</h1>
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
};

AboutPageTemplate.defaultProps = {
  pages: [],
  title: ''
};

AboutPageTemplate.propTypes = {
  pages: PropTypes.array,
  title: PropTypes.string,
  content: PropTypes.node.isRequired
};

const AboutPage = ({ data }) => {
  const { edges: pages } = data.allMarkdownRemark;
  const { markdownRemark: page } = data;
  const { frontmatter: { title }, html } = page;

  return (
    <AboutPageTemplate
      pages={pages}
      title={title}
      content={html}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    }),
    markdownRemark: PropTypes.object
  }).isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }

    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] },
      filter: { frontmatter: { templateKey: { eq: "about" } }}
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            index
          }
        }
      }
    }
  }
`;
