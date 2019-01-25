import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Page from '../components/Page/Page';

import styles from './devotional.module.scss';

export class DevotionalPageTemplate extends React.Component {
  state = {
    passage: '',
    text: 'Placeholder text...'
  };

  componentDidMount() {
    fetch(this.props.passagesUrl)
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
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    const date = new Date().toLocaleDateString('en-US', options);

    return (
      <Page title="Daily Devotion" className={styles.component}>
        <Helmet title={`${this.props.title} | Daily Devotion`} />
        <article className={styles.article}>
          <p className={styles.date}>{date}</p>
          <h2 className={styles.articleTitle}>{this.state.passage}</h2>
          {/* <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
          <div className={styles.articleContent}>{this.state.text}</div>
        </article>
      </Page>
    );
  }
}

const DevotionalPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { title, passagesUrl }
  } = page;

  return <DevotionalPageTemplate title={title} passagesUrl={passagesUrl} />;
};

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
