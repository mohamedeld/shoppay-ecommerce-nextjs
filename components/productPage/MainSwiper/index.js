
const MainSwiper = ({images,activeImage}) => {
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        </div>
        <div className={styles.swiper__list}>
          {images?.length > 0 && (
            images?.map(image=>{
              return (
                <div key={image?.url} className={`${styles.swiper__list_item}`}>
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