import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import favicon from '../img/favicon.png';

import './index.scss';

class Layout extends React.Component {
  componentDidMount() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleMouseDown() {
    document.body.classList.add('usingMouse');
  }

  handleKeyDown() {
    document.body.classList.remove('usingMouse');
  }

  render() {
    const { data, location, children } = this.props;
    const { title, address, phone, email, instagram } = data.site.siteMetadata;

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            {
              name: 'description',
              content: 'Welcome to New Covenant Baptist Church!'
            },
            { name: 'keywords', content: 'baptist, church, seattle' }
          ]}
          link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }
          ]}
        />

        {location.pathname === '/' ? children() : <Header />}

        {location.pathname !== '/' && children()}

        <Footer
          address={address}
          phone={phone}
          email={email}
          instagram={instagram}
        />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteMetadataQuery {
    site {
      siteMetadata {
        title
        address {
          name
          streetAddress
          unit
          city
          state
          zipCode
        }
        phone
        email
        instagram
      }
    }
  }
`;
