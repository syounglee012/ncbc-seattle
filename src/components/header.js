import React from 'react';
import Link from 'gatsby-link';

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="header--container">
      <Link to="/">{siteTitle}</Link>
      <nav className="header--nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/ministries/">Ministries</Link></li>
          <li><Link to="/devotional/">Devotional</Link></li>
          <li><Link to="/directions/">Directions</Link></li>
          <li><Link to="/contact/">Contact</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
