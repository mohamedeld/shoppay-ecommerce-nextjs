import { connectDb, disconnectDb } from "@/utils/db";
import Product from "@/models/productModel";
import { toast } from "react-toastify";
import Head from "next/head";
import styles from "../../styles/product.module.scss"
import Category from "@/models/categoryModel";
import MainSwiper from "@/components/productPage/MainSwiper";
import { useState } from "react";
const ProductDetail = ({ product }) => {
  const [activeImage,setActiveImage] = useState("");
  if (!product) {
    toast.error("product not found");
    return;
  }

  return (
    <>
      <Head>
        <title>{product?.name}</title>
      </Head>
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product?.categoryName}
            {product?.subCategories?.map((sub) => (
              <span key={product?._id}>/{sub?.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product?.images} activeImage={activeImage}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;

export async function getServerSideProps(context) {
  connectDb()
  const { query } = context;
  const slug = query?.slug;
  const style = query?.style;
  const size = query?.size || 0;
  let newProduct;
  try {
    const products = await Product?.find({}).lean();
    
    const product = products?.find(p => p?.slug === slug)
    if (!product) {
      throw new Error("product not found");
    }
    const category = await Category?.findById(product?.category).lean();
    
    const subProducts = product?.subProducts[style];
    const prices = subProducts?.sizes?.map(p => p.price).sort((a, b) => a - b);

    newProduct = {
      ...product,
      images: subProducts?.images,
      sizes: subProducts?.sizes,
      discount: subProducts?.discount,
      sku: subProducts?.sku,
      colors: product?.subProducts?.map(p => p?.color),
      priceRange: prices?.length > 1 ? `From ${prices[0]} to ${prices[prices?.length - 1]}$` : '',
      price: subProducts?.discount > 0 ? (subProducts?.sizes[size]?.price - (subProducts?.sizes[size]?.price / subProducts?.discount))?.toFixed(2) : subProducts?.sizes[size]?.price?.toFixed(2),
      priceBefore: subProducts?.sizes[size]?.price?.toFixed(2),
      quantity: subProducts?.sizes[size]?.qty,
      categoryName:category?.name
    }
  } catch (error) {
    console.log(error);
  }
  disconnectDb()

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct))
    }
  }
}