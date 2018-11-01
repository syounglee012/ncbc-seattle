import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../components/Nav/Nav';
import logo from '../img/logo.svg';

import styles from './index.module.scss';

const IndexPage = ({ data, siteTitle }) => {
  const { markdownRemark: page } = data;
  const { frontmatter } = page;
  const {
    heading,
    time,
    location,
    room,
    streetAddress,
    city,
    state,
    zipCode
  } = frontmatter.worshipServiceInfo;

  return (
    <div className={styles.home}>
      <header className={styles.component}>
        <main className={styles.hero}>
          <div className={styles.navContainer}>
            <div className={styles.navBarBrandContainer}>
              <img src={logo} alt="NCBC Logo" className={styles.logo} />
              <Link className={styles.navBarBrand} to="/">{siteTitle}</Link>
            </div>
            <Nav />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{frontmatter.main.heading}</h1>
            <p className={styles.lead}>{frontmatter.main.lead}</p>
          </div>
        </main>
      </header>
      <section id="intro" className={styles.homeSection}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <h1 className={styles.sectionTitle}>{frontmatter.intro.heading}</h1>
            <p className={styles.sectionContent}>{frontmatter.intro.content}</p>
          </div>
        </div>
      </section>
      <section id="service-info" className={`${styles.homeSection} ${styles.serviceInfo}`}>
        <div className={`${styles.container} ${styles.serviceInfoContainer}`}>
          <div className={styles.serviceInfoContent}>
            <h1 className={styles.sectionTitle}>{heading}</h1>
            <p className={styles.sectionContent}>Sundays at {time}</p>
            <p className={styles.sectionContent}>{location}<br />({room})<br />{streetAddress}<br />{city}, {state}, {zipCode}</p>
            <button className={styles.directionButton}>
              Get Directions
            </button>
          </div>
        </div>
      </section>
      <section id="key-verse" className={styles.homeSection}>
        <div className={`${styles.container} ${styles.keyVerseContainer}`}>
          <div className={styles.keyVerseContent}>
            <h1 className={`${styles.sectionTitle} ${styles.verse}`}>"{frontmatter.keyVerse.verse}"</h1>
            <p className={`${styles.sectionContent} ${styles.reference}`}>{frontmatter.keyVerse.reference}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title,
        main {
          heading,
          lead
        },
        intro {
          heading,
          content
        },
        worshipServiceInfo {
          heading,
          time,
          location,
          room,
          streetAddress,
          city,
          state,
          zipCode
        },
        keyVerse {
          verse,
          reference
        }
      }
    }
  }
`;
