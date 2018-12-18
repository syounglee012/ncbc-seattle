import React from 'react';
import PropTypes from 'prop-types';

class AboutIndexPage extends React.Component {
  componentDidMount() {
    const { data, history } = this.props;
    const { edges: pages } = data.allMarkdownRemark;
    const firstPage = pages[0].node;
    const {
      frontmatter: { path }
    } = firstPage;

    history.replace(path);
  }

  render() {
    return null;
  }
}

AboutIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }).isRequired
};

export default AboutIndexPage;

export const aboutPageQuery = graphql`
  query AboutIndexPage {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] }
      filter: { frontmatter: { templateKey: { eq: "about" } } }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            templateKey
            title
            path
            navLinkText
            index
          }
        }
      }
    }
  }
`;
