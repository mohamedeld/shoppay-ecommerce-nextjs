import { MdFlashOn } from "react-icons/md";
import CountDown from "@/components/countdown";
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import styles from "./styles.module.scss";

// import required modules
import { Navigation } from 'swiper/modules';
import { flashDealsArray } from "@/data/home";
import Card from "./Card";
const FlashDeals = () => {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE
          <MdFlashOn />
        </h1>
        <CountDown date={new Date(2024,4,11)}/>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="flashDealSwiper"
        breakpoints={{
          450:{
            slidesPerView:2
          },
          630:{
            slidesPerView:3
          },
          920:{
            slidesPerView:4
          },
          1232:{
            slidesPerView:5
          },
          1520:{
            slidesPerView:6
          }
        }}
      >
        <div className={styles.flashDeals__list}>
          {
            flashDealsArray?.map((item,index)=>{
              return (
                <SwiperSlide key={item?.price}>
                  <Card product={item}/>
                </SwiperSlide>
              )
            })
          }
        </div>
      </Swiper>
      </div>
  )
}

export default FlashDeals