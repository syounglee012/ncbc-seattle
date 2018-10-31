import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './index.css';

const Layout = ({ children, data, location, ...rest }) => {
  const {
    title,
    address,
    phone,
    email,
    instagram
  } = data.site.siteMetadata;

  return (
    <div>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' }
        ]}
      />

      {location.pathname === '/'
        ? children({data, location, siteTitle: title, ...rest})
        : <Header siteTitle={title} />}

      {location.pathname !== '/' && (
        <section>
          {children()}
        </section>
      )}

      <Footer
        address={address}
        phone={phone}
        email={email}
        instagram={instagram}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteMetadataQuery {
    site {
      siteMetadata {
        title,
        address {
          name,
          streetAddress,
          unit,
          city,
          state,
          zipCode
        }
        phone,
        email,
        instagram
      }
    }
  }
`;
