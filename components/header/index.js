import React from 'react'
import styles from "./header.module.scss";
import Ad from './Ad';
import Top from './Top';
import Main from './Main';
const Header = () => {
  return (
    <header className={styles.header}>
      <Ad/>
      <Top/>
      <Main/>
    </header>
  )
}

export default Header