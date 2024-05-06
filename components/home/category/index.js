import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import Image from "next/image";

const Category = ({header,products,background}) => {
  return (
    <div className={styles.category} style={{backgroundColor:`${background}`}}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle/>
      </div>
      <div className={styles.category__products}>
        {
          products?.map(product=>{
            return (
              <div className={styles.product} key={product.price}>
                <img src={product?.image} alt="women dresses" />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category