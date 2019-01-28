import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Page from '../components/Page/Page';
import Headphones from '../img/svg/headphones.svg';

import styles from './devotional.module.scss';

const ESV_API_URL = `https://api.esv.org/v3/passage/`;
const ESV_AUDIO_URL = 'https://audio.esv.org/hw/';
const ESV_API_KEY = process.env.ESV_API_KEY;
const DAY = 60 * 60 * 24 * 1000;

export class DevotionalPageTemplate extends React.Component {
  state = {
    passage: '',
    text: '',
    audio: null
  };

  static defaultProps = {
    date: new Date()
  };

  componentDidMount() {
    this.fetchDevotionalText();
  }

  componentDidUpdate(prevProps) {
    if (this.props.date !== prevProps.date) {
      this.fetchDevotionalText();
    }
  }

  fetchDevotionalText() {
    fetch(this.props.passagesUrl)
      .then(response => response.json())
      .then(passages => {
        const { date } = this.props;
        const passagesForCurrentMonth = passages[date.getMonth()];
        const passage = passagesForCurrentMonth[date.getDate() - 1];

        return Promise.all([
          this.queryAPI(`html/?q=${passage}&include-passage-references=false`)
          // this.queryAPI(`audio/?q=${passage}`) // 405 (Method Not Allowed) and CORS error while redirecting
        ]).then(([html, audio]) => {
          this.setState({
            passage,
            text: html.passages,
            audio
          });
        });
      })
      .catch(error => console.warn('Error', error.message));
  }

  queryAPI(endpoint) {
    const url = `${ESV_API_URL}${endpoint}`;
    const options = {
      headers: {
        Authorization: `Token ${ESV_API_KEY}`
      }
    };

    return fetch(url, options).then(
      response => (response.ok ? response.json() : Promise.reject(response))
    );
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
          <a
            href={`${ESV_AUDIO_URL}${encodeURIComponent(passage)}.mp3`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.audioLink}
          >
            <Headphones className={styles.headphones} />
          </a>
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
