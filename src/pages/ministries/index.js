import React from 'react';
import PropTypes from 'prop-types';
import { MinistriesPageTemplate } from '../../templates/ministries';

const MinistriesIndexPage = ({ data }) => {
  const { edges: pages } = data.allMarkdownRemark;
  const firstPage = pages[0].node;
  const { frontmatter: { title }, html } = firstPage;

  return (
    <MinistriesPageTemplate
      pages={pages}
      title={title}
      content={html}
    />
  );
};

MinistriesIndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }).isRequired
};

export default MinistriesIndexPage;

export const ministriesPageQuery = graphql`
  query MinistriesIndexPage {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___index] },
      filter: { frontmatter: { templateKey: { eq: "ministries" } } }
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
            navLinkText
            index
          }
        }
      }
    }
  }
`;
