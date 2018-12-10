import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import styles from './SideNav.module.scss';

const SideNav = ({ pages }) => (
  <nav>
    <ul className={styles.component}>
      {pages.map(({ node: page }) => (
        <li key={page.id}>
          <Link
            to={page.fields.slug}
            activeStyle={{
              fontWeight: 600
            }}
          >
            {page.frontmatter.navLinkText}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

SideNav.PropTypes = {
  pages: PropTypes.array.isRequired
};

export default SideNav;
