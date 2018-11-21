import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import styles from './about.module.scss';

export const AboutPageTemplate = ({ pages, title, content }) => (
  <section className={styles.component}>
    <div className={styles.container}>
      <Helmet title={`${title} | About Us`} />
      <h1 className={styles.pageTitle}>About Us</h1>
      <div className={styles.pageContent}>
        <ul className={styles.sideNav}>
          {pages.map(({ node: page }) => (
            <li key={page.id}>
              <Link to={page.fields.slug}>
                {page.frontmatter.navLinkText}
              </Link>
            </li>
          ))}
        </ul>
        <article className={styles.article}>
          <h2 className={styles.articleTitle}>{title}</h2>
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  </section>
);

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
      filter: { frontmatter: { templateKey: { eq: "about" } } }
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
            navLinkText
            index
          }
        }
      }
    }
  }
`;
