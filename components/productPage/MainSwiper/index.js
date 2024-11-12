import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import styles from "./styles.module.scss";

const MainSwiper = ({ images, activeImage }) => {
  const [active,setActive] = useState(0);
  
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: images[active]?.url
          },
          largeImage: {
            src: images[active]?.url,
            width: 1200,
            height: 1800
          },
          enlargedImageContainerDimensions:{
            width:'150%',
            height:'150%'
          }
        }} />
      </div>
      <div className={styles.swiper__list}>
        {images?.length > 0 && (
          images?.map((image,index) => {
            return (
              <div key={image?.url} onMouseEnter={()=> setActive(index)} className={`${styles.swiper__list_item} ${index === active && styles.active}`}>
                <img src={image?.url} alt="product image" />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MainSwiper