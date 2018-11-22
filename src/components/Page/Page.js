import React from 'react';
import PropTypes from 'prop-types';

import styles from './Page.module.scss';

const Page = ({ title, children }) => (
  <section className={styles.component}>
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </section>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Page;