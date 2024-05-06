import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import styles from "./styles.module.scss"
import Image from 'next/image';
export default function App() {
  return (
    <div className={styles.swiper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          [...Array(15).keys()].map(item=>{
            return(
              <SwiperSlide key={item}>
              <Image src={`/images/swiper/${item+1}.jpg`} fill={true}
           alt="images for slider" />
            </SwiperSlide>
            )
          })
        }
       
        
      </Swiper>
    </div>
  );
}
