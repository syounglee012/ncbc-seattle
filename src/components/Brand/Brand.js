import React from 'react';
import Link from 'gatsby-link';
import logo from '../../img/logo.svg';

import style from './Brand.module.scss';

const Brand = () => (
  <div className={style.brandContainer}>
    <img src={logo} alt="NCBC Logo" className={style.logo} />
    <Link className={style.brand} to="/">New Covenant Baptist Church</Link>
  </div>
);

export default Brand;