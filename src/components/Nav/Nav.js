import React from 'react';
import Link from 'gatsby-link';

import styles from './Nav.module.scss';

class Nav extends React.Component {
  state = {
    showLinks: false
  };

  handleHamburgerMenuClick = () =>
    this.setState(({ showLinks }) => ({
      showLinks: !showLinks
    }));

  render() {
    const { showLinks } = this.state;

    return (
      <div className={styles.component}>
        <button
          className={styles.navbarToggle}
          aria-label="Menu"
          onClick={this.handleHamburgerMenuClick}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <nav
          className={`${styles.navbar} ${
            showLinks ? styles.navbarToggleShow : ''
          }`.trim()}
        >
          <ul>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/ministries/">Ministries</Link>
            </li>
            <li>
              <Link to="/devotional/">Devotional</Link>
            </li>
            <li>
              <Link to="/location/">Location</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
