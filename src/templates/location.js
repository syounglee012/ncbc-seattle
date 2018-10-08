import React from 'react';
import PropTypes from 'prop-types';

const LocationPage = ({ data }) => {
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

LocationPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default LocationPage;

export const LocationPageQuery = graphql`
  query LocationPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
