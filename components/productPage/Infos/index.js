import { Button, Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {TbMinus, TbPlus} from "react-icons/tb"
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "../share";
import Accordins from "../Accordin";

const Info = ({product,handleChangeImage}) => {
  const router = useRouter();
  const [size,setSize] = useState(router?.query?.size);
  const [qty,setQty] = useState(1);

  useEffect(()=>{
    setSize("");
    setQty(1);
  },[router?.query?.style])

  useEffect(()=>{
    if(qty > product?.quantity){
      setQty(product?.quantity)
    }
  },[router?.query?.size])

  const handleDecrease = ()=>{
    qty > 1 && setQty(prev=> prev - 1)
  }

  const handleIncrease = ()=>{
    qty < product?.quantity && setQty(prev=> prev + 1)
  }

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
            !size ? (
              <h2>{product?.priceRange}</h2>
            ):(
              <h1>{product?.price}</h1>
            )
          }
          {
            product.discount > 0 ? (
              <h3>
               {size&& <span>{product?.priceBefore}</span>}
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
            !size ? product?.quantity : product?.sizes?.reduce((start,next)=> start + next?.qty,0)
          } pieces available
        </span>
        <div className={styles.infos__sizes}>
          <h4>Select a size</h4>
          <div className={styles.infos__sizes_wrap}>
          {product?.sizes?.map((size,index)=>{
            return (
              <Link href={`/product/${product?.slug}?style=${router?.query?.style}&size=${index}`} key={size?._id}>
                <div className={`${styles.infos__sizes_size} ${index === router?.query?.size && styles.active_size}`} onClick={()=> setSize(size?.size)}>{size?.size}</div>
              </Link>
            )
          })}
          </div>
        </div>
        <div className={styles.infos__colors}>
          {
            product?.colors?.length > 0 ? product?.colors?.map((color,index)=>{
              return(
                <span key={color?.image} className={`${index === router?.query?.style ? styles?.active_color : ''}`} onMouseEnter={()=>handleChangeImage(product?.subProducts[index]?.images[0]?.url)} onMouseLeave={()=>handleChangeImage("")} >
                  <Link href={`/product/${product?.slug}?style=${index}`}>
                    <Image width={50} height={50} objectFit="cover" alt={`image from product color`} src={color?.image}/>
                  </Link>
                </span>
              )
            }):(
              <></>
            )
          }
        </div>
        <div className={styles.infos__qty}>
          <button onClick={handleDecrease}>
            <TbMinus/>
          </button>
          <span>{qty}</span>
          <button onClick={handleIncrease}>
            <TbPlus/>
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button disabled={product?.quantity < 1}>
            <BsHandbagFill/>
            <b>Add To Cart</b>
          </button>
          <button>
            <BsHeart/>
            <b>Wishlist</b>
          </button>
        </div>
        <Share/>
        <Accordins details={[product?.description ,...product?.details]}/>
      </div>
    </div>
  )
}

export default Info