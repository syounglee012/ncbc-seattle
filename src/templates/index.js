import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import bible from '../img/bible.jpg';

import style from './index.module.scss';

const DIRECTION_URL = 'https://www.google.com/maps/dir/?api=1&destination=University+Lutheran+Church,+1604+NE+50th+St,+Seattle,+WA+98105';

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
        <div className="container">
          <div className={style.introContent}>
            <h1>{intro.heading}</h1>
            <p>{intro.content}</p>
          </div>
        </div>
      </section>
      <section id="service-info" className={style.serviceInfo}>
        <div className={`container ${style.serviceInfoContainer}`}>
          <img className={style.serviceInfoImage} src={bible}/>
          <div className={style.serviceInfoContent}>
            <h1>{heading}</h1>
            <p>Sundays at {time}</p>
            <p>{location}<br />({room})<br />{streetAddress}<br />{city}, {state}, {zipCode}</p>
            <a className={style.directionButton} href={DIRECTION_URL} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          </div>
        </div>
      </section>
      <section id="key-verse">
        <div className="container">
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
