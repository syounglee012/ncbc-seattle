import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../components/Nav/Nav';
import logo from '../img/logo.svg';

import styles from './index.module.scss';

const IndexPage = ({ data, siteTitle }) => {
  const { markdownRemark: page } = data;
  const { frontmatter, html } = page;

  return (
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
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title,
        main {
          heading,
          lead
        }
      }
    }
  }
`;
