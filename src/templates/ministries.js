import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';
import SideNav from '../components/SideNav/SideNav';

import styles from './ministries.module.scss';

export const MinistriesPageTemplate = ({ pages, title, content }) => (
  <Page title="Ministries">
    <Helmet title={`${title} | Ministries`} />
    <SideNav pages={pages} />
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  </Page>
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
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title },
    html
  } = page;

  return <MinistriesPageTemplate pages={pages} title={title} content={html} />;
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
      sort: { order: ASC, fields: [frontmatter___index] }
      filter: { frontmatter: { templateKey: { eq: "ministries" } } }
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
