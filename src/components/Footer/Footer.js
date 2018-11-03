import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../img/logo.svg';
import instagramIcon from '../../img/instagram-icon.svg';
import envelopeIcon from '../../img/envelope-icon.svg';
import style from './Footer.module.scss';

const Footer = ({ address, email, phone, instagram }) => {
  const currentYear = new Date().getFullYear();
  const ncbc = 'New Covenant Baptist Church';
  const {
    name,
    streetAddress,
    unit,
    city,
    state,
    zipCode
  } = address;

  return (
    <footer>
      <div>
        <div className={style.brandContainer}>
          <img src={logo} alt="NCBC Logo" className={style.logo} />
          <span className={style.brandName}>{ncbc}</span>
        </div>
        <span>{name} ({unit})</span>
        <span>{streetAddress}, {city}, {state} {zipCode}</span>
        <span>{phone}</span>
        <p>NCBC adheres to the Statement of Faith adopted by the <a href="http://www.sbc.net/" target="_blank" rel="noopener noreferrer">Southern Baptist Convention</a>.</p>
      </div>
      <div>
        <div className="footer-navs">
          <div className="footer-nav-col">
            <span>About</span>
            <span>Who We Are</span>
            <span>Our Core Values</span>
            <span>Our Pastor</span>
          </div>
          <div className="footer-nav-col">
            <span>About</span>
            <span>Young Adult</span>
            <span>College</span>
            <span>Children</span>
          </div>
          <div className="footer-nav-col">
            <span>Devotional</span>
            <span>Location</span>
          </div>
        </div>
        <div className="footer-social-links">
          <img src={instagramIcon} alt="Instagram Icon" className={style.socialLinkIcon} />
          <img src={envelopeIcon} alt="Evenlope Icon" className={style.socialLinkIcon} />
        </div>
      </div>
      <div>
        <p>&copy; {currentYear} {ncbc}. All rights reserved.</p>
      </div>
    </footer>
  )
};

Footer.propTypes = {
  address: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired
}

export default Footer;