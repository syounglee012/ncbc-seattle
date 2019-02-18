import React from 'react';
import Link from 'gatsby-link';

import styles from './Nav.module.scss';

class Nav extends React.Component {
  state = {
    showLinks: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown = event => {
    if (
      this.navRef &&
      !this.navRef.contains(event.target) &&
      (this.hamburgerMenuRef && !this.hamburgerMenuRef.contains(event.target))
    ) {
      this.setState(
        ({ showLinks }) => (showLinks ? { showLinks: false } : null)
      );
    }
  };

  handleHamburgerMenuClick = event => {
    this.setState(({ showLinks }) => ({
      showLinks: !showLinks
    }));
  };

  setNavRef = ref => (this.navRef = ref);
  setHamburgerMenuRef = ref => (this.hamburgerMenuRef = ref);

  render() {
    const { showLinks } = this.state;

    return (
      <div className={styles.component}>
        <button
          ref={this.setHamburgerMenuRef}
          className={styles.navbarToggle}
          aria-label="Menu"
          onClick={this.handleHamburgerMenuClick}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <nav
          ref={this.setNavRef}
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
