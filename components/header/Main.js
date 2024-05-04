import React, { useState } from 'react'
import styles from "./header.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { RiSearch2Line } from 'react-icons/ri';
import {FaOpencart} from "react-icons/fa"
const Main = () => {
  const [query,setQuery] =useState('');
  const handleSearch = (e)=>{
    e.preventDefault();

  }
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
            <img src="/logo.png"  alt="logo for search" />
       
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart" className={styles.cart}>
         
            <FaOpencart />
            <span>0</span>
         
        </Link>
      </div>
    </div>
  )
}

export default Main