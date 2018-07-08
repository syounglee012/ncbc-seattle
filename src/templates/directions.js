import React from 'react';
import PropTypes from 'prop-types';

const DirectionsPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const { frontmatter, html } = page;

  return (
    <section className="page-container">
      <div className="page">
        <h1 className="page--title">{frontmatter.title}</h1>
        <div
          className="page--content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
};

DirectionsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default DirectionsPage;

export const directionsPageQuery = graphql`
  query DirectionsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
