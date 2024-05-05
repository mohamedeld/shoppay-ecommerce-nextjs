import styles from './styles.module.scss'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Navigation, Pagination } from 'swiper/modules';
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
        modules={[Navigation]}
        className="productSwiper"
      >
        {products?.map(product => {
          return (
              <SwiperSlide key={product.price}>
            <div className={styles.product} > 
              <div className={styles.product__img}>
                <img src={product?.image} alt="swiper women address"/></div>
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