import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { userSwiperArray } from "@/data/home";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards,Navigation } from 'swiper/modules';
const UserMenu = () => {
  const {data:session} = useSession();
  return (
    <div className={styles.user}>
      <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <Image src={session.user?.image} alt="user profile image"  width={100} height={100} objectFit="cover" objectPosition="center"/>
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <Image
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              alt="user info"
              width={100} height={100} objectFit="cover" objectPosition="center"
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
             
                <IoSettingsOutline />
              
            </Link>
          </li>
          <li>
            <Link href="">
              
                <HiOutlineClipboardList />
              
            </Link>
          </li>
          <li>
            <Link href="">
              
                <AiOutlineMessage />
              
            </Link>
          </li>
          <li>
            <Link href="">
             
                <BsHeart />
             
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <img
            src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
            alt=""
            className={styles.new}
          />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide key={item?.image}>
                <Link href="">
                  <Image src={item.image} alt="user menu image" fill={true} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="../../../images/userHeader.jpg"
        alt=""
        className={styles.user__footer}
      />
    </div>
  )
}

export default UserMenu