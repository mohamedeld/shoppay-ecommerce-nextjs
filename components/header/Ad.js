import Link from 'next/link'
import React from 'react'
import styles from "./header.module.scss"
const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}></div>
    </Link>
  )
}

export default Ad