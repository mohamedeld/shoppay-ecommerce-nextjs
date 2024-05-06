import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination,Navigation } from 'swiper/modules';
import styles from "./styles.module.scss";
import { offersAarray } from '@/data/home';
import Image from 'next/image';
export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination,Navigation]}
        className="offerSwiper"
      >
        {
          offersAarray?.map(item=>{
            return (
              <SwiperSlide key={item?.price}>
                <Image src={item?.image} alt="image for offers" fill={true} />
                <span>{item?.price}$</span>
                <span>-{item?.discount}%</span>
              </SwiperSlide>
            )
          })
        }

      </Swiper>

    </div>
  );
}
