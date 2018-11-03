import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';

import style from './index.module.scss';

const IndexPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const { frontmatter: { 
    main,
    intro,
    worshipServiceInfo,
    keyVerse
  } } = page;

  const {
    heading,
    time,
    location,
    room,
    streetAddress,
    city,
    state,
    zipCode
  } = worshipServiceInfo;

  return (
    <div className={style.component}>
      <main className={style.main}>
        <Header className={style.header} />
        <div className={style.mainContent}>
          <h1 className={`${style.title} ${style.fadeInDown}`}>{main.heading}</h1>
          <p className={`${style.lead} ${style.fadeInUp}`}>{main.lead}</p>
        </div>
      </main>
      <section id="intro">
        <div className={style.container}>
          <div className={style.introContent}>
            <h1>{intro.heading}</h1>
            <p>{intro.content}</p>
          </div>
        </div>
      </section>
      <section id="service-info" className={style.serviceInfo}>
        <div className={`${style.container} ${style.serviceInfoContainer}`}>
          <div className={style.serviceInfoContent}>
            <h1>{heading}</h1>
            <p>Sundays at {time}</p>
            <p>{location}<br />({room})<br />{streetAddress}<br />{city}, {state}, {zipCode}</p>
            <button className={style.directionButton}>
              Get Directions
            </button>
          </div>
        </div>
      </section>
      <section id="key-verse">
        <div className={`${style.container} ${style.keyVerseContainer}`}>
          <div className={style.keyVerseContent}>
            <h1 className={style.verse}>"{keyVerse.verse}"</h1>
            <p className={style.reference}>{keyVerse.reference}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title,
        main {
          heading,
          lead
        },
        intro {
          heading,
          content
        },
        worshipServiceInfo {
          heading,
          time,
          location,
          room,
          streetAddress,
          city,
          state,
          zipCode
        },
        keyVerse {
          verse,
          reference
        }
      }
    }
  }
`;
