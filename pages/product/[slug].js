const ProductDetail = ()=>{
  return (
    <></>
  )
}

export default ProductDetail;

export async function getServerSideProps(context){
  const {query} = context;
  const slug = query?.slug;
  const style = query?.style;
  const size = query?.size || 0;

  return {
    props:{
      
    }
  }
}