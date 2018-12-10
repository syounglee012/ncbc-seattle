import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';
import DirectionsButton from '../components/DirectionsButton/DirectionsButton';

import styles from './location.module.scss';

export const LocationPageTemplate = ({ title, content }) => (
  <Page title="Location" className={styles.component}>
    <Helmet title={`${title} | Location`} />
    <article className={styles.article}>
      <h2 className={styles.articleTitle}>{title}</h2>
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <DirectionsButton />
    </article>
  </Page>
);

const LocationPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title },
    html
  } = page;

  return <LocationPageTemplate title={title} content={html} />;
};

LocationPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default LocationPage;

export const LocationPageQuery = graphql`
  query LocationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
