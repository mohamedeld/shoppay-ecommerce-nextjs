import { useEffect, useState } from 'react';
import styles1 from './styles.module.scss';
import Link from 'next/link';
import ProductSwiperCard from './ProductSwiperCard';
import Image from 'next/image';

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
    <div className={styles1.product}>
      <div className={styles1.product__container}>
        <div>
          <Link href={`/product/${product?.slug}?style=${active}`}>
            <div>
              <ProductSwiperCard images={images}/>
            </div>
          </Link>
          {
            product?.subProducts[active]?.discount && (
              <div className={styles1.product__discount}>{product?.subProducts[active]?.discount}</div>
            )
          }
          <div className={styles1.product__infos1}>
            <h1>{product?.name?.length > 45 ? `${product?.name?.substring(0,45)}...`:`${product?.name}`}</h1>
            <span>{prices?.length === 1 ? `USD${prices[0]}$`:`USD${prices[0] - prices[prices.length - 1]}$`}</span>
            <div className={styles1.product__colors}>
              {
                styles?.length > 0 && styles?.map((item,index)=>{
                  return(
                    item?.image ?(
                      <Image src={item?.image} key={index} width={20} height={20} className={index === active && styles1.active}  onClick={
                        ()=>{
                          setImages(product?.subProducts[index]?.image);
                          setActive(index)
                        }
                      } alt="active image"
                      />
                    ):(
                      <span key={index} style={{backgroundColor:`${item?.color}`}} onClick={
                        ()=>{
                          setImages(product?.subProducts[index]?.image);
                          setActive(index)
                        }
                      }>
                      </span>
                    )
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductCard