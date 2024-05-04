import Link from 'next/link'
import React from 'react'
import styles from "./header.module.scss";
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
const UserMenu = ({session}) => {
  
  return (
    <div className={styles.menu}>
    <h4>Welcome to Shoppay !</h4>
    {session ? (
      <div className={styles.flex}>
        <Image src={session?.user?.image} alt="logged in user image" className={styles.menu__img} width={100} height={100} />
        <div className={styles.col}>
          <span>Welcome Back,</span>
          <h3>{session?.user?.name}</h3>
          <span onClick={() => signOut()}>Sign out</span>
        </div>
      </div>
    ) : (
      <div className={styles.flex}>
        <button className={styles.btn_primary}>Register</button>
        <button className={styles.btn_outlined} onClick={() => signIn()}>
          Login
        </button>
      </div>
    )}
    <ul>
      <li>
        <Link href="/profile">Account</Link>
      </li>
      <li>
        <Link href="/profile/orders">My Orders</Link>
      </li>
      <li>
        <Link href="/profile/messages">Message Center</Link>
      </li>
      <li>
        <Link href="/profile/address">Address</Link>
      </li>
      <li>
        <Link href="/profile/whishlist">Whishlist</Link>
      </li>
    </ul>
  </div>
  )
}

export default UserMenu