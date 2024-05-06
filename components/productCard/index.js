import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import ProductSwiperCard from './ProductSwiperCard';

const ProductCard = ({product}) => {
  const [active,setActive] = useState(0);
  const [images,setImages] = useState(product?.subProducts[active]?.images);
  const [prices,setPrices] = useState(product?.subProducts[active]?.sizes?.map((item)=>{
    return item?.price
  }).sort((a,b)=> a-b));
  const [styles,setStyles] = useState(product?.subProducts?.map((item)=>{
    return item?.color
  }))

  useEffect(()=>{
    setImages(product?.subProducts[active]?.images);
    setPrices(product?.subProducts[active]?.sizes?.map((item)=>{
      return item?.price
    }).sort((a,b)=> a-b));

  },[active])
  
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product?.slug}?style=${active}`}>
          <div>
            <ProductSwiperCard images={images}/>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard