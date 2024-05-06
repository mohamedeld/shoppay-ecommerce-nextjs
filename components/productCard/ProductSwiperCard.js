import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay } from 'swiper/modules';
import styles from "./styles.module.scss";
import Image from 'next/image';
const ProductSwiperCard = ({ images }) => {

  const swiperRef = useRef(null);
  return (
    <div className={styles.swiperCard}>
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        autoplay={{ delay: 500, stopOnLastSlide: false }}
        speed={500}
        modules={[Autoplay]}
        className="cardSwiper"
      >
        {
          images?.map((item, i) => {
            return (
              <SwiperSlide key={item?.url}>
                <img src={item?.url}
                  alt="images for slider" />
              </SwiperSlide>
            )
          })
        }


      </Swiper>
    </div>
  )
}

export default ProductSwiperCard