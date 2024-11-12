import { Button, Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";


const Info = ({product}) => {
  const router = useRouter();
  const [size,setSize] = useState(router?.query?.size);

  return (
    <div className={styles.info}>
      <div className={styles.info__container}>
        <h1 className={styles.infos__name}>{product?.name}</h1>
        <h2 className={styles.infos__sku}>{product?.sku}</h2>
        <div className={styles.infos__rating}>
        <Rating
            name="half-rating-read"
            defaultValue={product?.rating}
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-root":{
                width:'fit-content !important'
              }
            }}
            style={{ color: "#FACF19",width:'fit-content' }}
          />
        {product?.numReviews} {" "}
        {
          product?.numReviews === 1 ? "review" : "reviews"
        }
        </div>
        <div className={styles.infos__price}>
          {
            product?.priceRange ? (
              <h2>{product?.priceRange}</h2>
            ):(
              <h1>{product?.price}</h1>
            )
          }
          {
            product.discount > 0 ? (
              <h3>
                <span>{product?.priceBefore}</span>
                <span>(-{product?.discount}%)</span>
              </h3>
            ):(<></>)
          }
        </div>
        <span className={styles.infos__shipping}>
          {
            product?.shipping ? `+${product?.shipping}$ Shipping fee` : "Free Shipping"
          }
        </span>
        <span>
          {
            size ? product?.quantity : product?.sizes?.reduce((start,next)=> start + next?.qty,0)
          } pieces available
        </span>
        <div className={styles.infos__sizes}>
          <h4>Select a size</h4>
          <div className={styles.infos__sizes_wrap}></div>
          {product?.sizes?.map((size,index)=>{
            return (
              <Link href={`/product/${product?.slug}?style=${router?.query?.style}&size=${index}`} key={size?._id}>
                <div className={`${styles.infos__sizes_size} ${index === router?.query?.size && styles.active_size}`} onClick={()=> setSize(size?.si)}>{size?.size}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Info