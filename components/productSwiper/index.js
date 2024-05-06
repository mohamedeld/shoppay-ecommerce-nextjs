import styles from './styles.module.scss'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
const ProductSwiper = ({ header, products }) => {
  return (
    <div className={styles.wrapper}>
      {header && <div className={styles.header}>{header}</div>}
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          100:{
            slidesPerView:1
          },
          600:{
            slidesPerView:2
          },
          700:{
            slidesPerView:3
          },
          900:{
            slidesPerView:4
          },
          1200:{
            slidesPerView:5
          },
          1300:{
            slidesPerView:6
          },

        }}
        modules={[Navigation]}
        className="productSwiper"
      >
        {products?.map(product => {
          return (
              <SwiperSlide key={product.price}>
            <div className={styles.product} > 
              <div className={styles.product__img}>
                <Image src={`${product?.image}`} alt="swiper women address" fill={true}/>
                </div>
              <div className={styles.product__infos}>
                <h1>{product?.name.length > 35 ? `${product?.name?.slice(0,35)}`: product?.name}</h1>
                <span>${product?.price}</span>
              </div>
            </div>
              </SwiperSlide>
          )
        })}

      </Swiper>
    </div>
  )
}

export default ProductSwiper