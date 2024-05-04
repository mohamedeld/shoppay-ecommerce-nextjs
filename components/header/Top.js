
import { useState } from 'react'
import styles from "./header.module.scss"
import Image from 'next/image'
import {MdSecurity } from "react-icons/md"
import {BsSuitHeart} from "react-icons/bs"
import {RiArrowDropDownFill,RiAccountPinCircleLine} from "react-icons/ri"
import Link from 'next/link'
import UserMenu from './userMenu'
import { useSession } from 'next-auth/react'
const Top = () => {
  const {data:session} = useSession();
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image src={"/images/pyramids.jpg"} width={28} height={28} alt="pyramids image"/>
            <span>Cairo | EGP</span>
          </li>
          <li className={styles.li}>
          <MdSecurity  />
          <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <div
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
             <>
              <li className={styles.li}>
                <div className={styles.flex}>
                  <Image src={session?.user?.image} alt={`image for user ${session?.user?.name}`} width={28} height={28} />
                  <span>{session?.user?.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
             </>
            ) : (
             <>
               <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
             </>
            )}
            {visible && <UserMenu session={session} />}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Top