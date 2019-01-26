import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Page from '../components/Page/Page';

import styles from './devotional.module.scss';

const ESV_API_ENDPOINT = `https://api.esv.org/v3/passage/html/`;
const API_KEY = `e774b4f993c184ef6c9a3165f672089e558a6add`;
const DAY = 60 * 60 * 24 * 1000;

export class DevotionalPageTemplate extends React.Component {
  state = {
    passage: '',
    text: ''
  };

  static defaultProps = {
    date: new Date()
  };

  componentDidMount() {
    this.fetchPassageText();
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.fetchPassageText();
    }
  }

  fetchPassageText() {
    fetch(this.props.passagesUrl)
      .then(response => response.json())
      .then(passages => {
        const { date } = this.props;
        const passagesForCurrentMonth = passages[date.getMonth()];
        const passage = passagesForCurrentMonth[date.getDate() - 1];
        this.setState({ passage }, () => this.getPassageText(passage));
      })
      .catch(error => console.warn('Error', error.message));
  }

  getPassageText(passage) {
    const url = `${ESV_API_ENDPOINT}?q=${passage}&include-passage-references=false`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${API_KEY}`
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(({ passages }) => this.setState({ text: passages }))
      .catch(error => console.warn('Error', error.message));
  }

  render() {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    const { passage, text } = this.state;
    const { date } = this.props;

    return (
      <Page title="Daily Devotion" className={styles.component}>
        <Helmet title={`${this.props.title} | Daily Devotion`} />
        <article className={styles.article}>
          <h2 className={styles.articleTitle}>{passage}</h2>
          <p className={styles.date}>
            {date.toLocaleDateString('en-US', options)}
          </p>
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className={styles.passageNav}>
            <Link
              rel="prev"
              to={{
                pathname: '/devotional/',
                state: {
                  date: new Date(date.getTime() - DAY)
                }
              }}
            >
              ← Previous
            </Link>
            <Link
              rel="next"
              to={{
                pathname: '/devotional/',
                state: {
                  date: new Date(date.getTime() + DAY)
                }
              }}
            >
              Next →
            </Link>
          </div>
        </article>
      </Page>
    );
  }
}

class DevotionalPage extends React.Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    const { state } = this.props.location;

    if (state && state.date) {
      this.setState({ date: new Date() });
    }
  }

  componentDidUpdate(prevProps) {
    const { state: currentState } = this.props.location;
    const { state: prevState } = prevProps.location;

    if (currentState !== prevState) {
      const date = (currentState && currentState.date) || new Date();
      this.setState({ date: date });
    }
  }

  render() {
    const { markdownRemark: page } = this.props.data;
    const {
      frontmatter: { title, passagesUrl }
    } = page;
    const { date } = this.state;

    return (
      <DevotionalPageTemplate
        title={title}
        passagesUrl={passagesUrl}
        date={date}
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
