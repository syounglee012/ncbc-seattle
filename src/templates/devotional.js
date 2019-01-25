import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';

import styles from './devotional.module.scss';

export const DevotionalPageTemplate = ({ title, passage, content }) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  const date = new Date().toLocaleDateString('en-US', options);

  return (
    <Page title="Daily Devotion" className={styles.component}>
      <Helmet title={`${title} | Daily Devotion`} />
      <article className={styles.article}>
        <p className={styles.date}>{date}</p>
        <h2 className={styles.articleTitle}>{passage}</h2>
        {/* <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
        <div className={styles.articleContent}>Passage placeholder</div>
      </article>
    </Page>
  );
};

class DevotionalPage extends React.Component {
  state = {
    passages: undefined
  };

  componentDidMount() {
    const { markdownRemark: page } = this.props.data;

    fetch(page.frontmatter.passagesUrl)
      .then(response => response.json())
      .then(passages => {
        const today = new Date();
        const passagesForCurrentMonth = passages[today.getMonth()];
        const passage = passagesForCurrentMonth[today.getDate() - 1];
        this.setState({ passage });
      })
      .catch(error => console.warn('Error', error.message));
  }

  render() {
    const { markdownRemark: page, html } = this.props.data;
    const { passage } = this.state;

    if (!passage) {
      return null;
    }

    return (
      <DevotionalPageTemplate
        title={page.frontmatter.title}
        content={html}
        passage={this.state.passage}
      />
    );
  }
}

DevotionalPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default DevotionalPage;

export const devotionalPageQuery = graphql`
  query DevotionalPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        passagesUrl
      }
    }
  }
`;
