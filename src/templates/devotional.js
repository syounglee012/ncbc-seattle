import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';

import styles from './devotional.module.scss';

export const DevotionalPageTemplate = ({ title, plan, content }) => (
  <Page title="Daily Devotion" className={styles.component}>
    <Helmet title={`${title} | Daily Devotion`} />
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  </Page>
);

const DevotionalPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title, plan },
    html
  } = page;

  return <DevotionalPageTemplate title={title} content={html} plan={plan} />;
};

DevotionalPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default DevotionalPage;

export const DevotionalPageQuery = graphql`
  query DevotionalPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        plan
      }
    }
  }
`;
