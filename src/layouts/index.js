import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'typeface-open-sans';
import 'typeface-shadows-into-light';
import 'typeface-roboto-slab';
import 'typeface-architects-daughter';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './index.css';

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0
      }}
    >
      {children()}
    </div>
    <Footer
      address={data.site.siteMetadata.address}
      phone={data.site.siteMetadata.phone}
      email={data.site.siteMetadata.email}
      instagram={data.site.siteMetadata.instagram}
    />
  </div>
);

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
