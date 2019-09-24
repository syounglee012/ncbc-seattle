import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';

import styles from './events.module.scss';

export const EventsPageTemplate = ({ title, content }) => (
  <Page title="Events" className={styles.component}>
    <Helmet title={`${title} | Events`} />
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  </Page>
);

const EventsPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title },
    html
  } = page;

  return <EventsPageTemplate title={title} content={html} />;
};

EventsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default EventsPage;

export const EventsPageQuery = graphql`
  query EventsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
