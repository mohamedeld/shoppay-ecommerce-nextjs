import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please enter product name']
  },
  description:{
    type:String,
    required:[true,'please enter product description']
  },
  slug:{
    type:String,
    required:[true,'please enter product slug'],
    unique:true,
    lowercase:true
  },
  brand:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Brand'
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:[true,'product should have a category']
  },
  category:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'SubCategory',
  }], 
  details:[{
    name:String,
    value:String
  }],
  questions:[{
    question:String,
    answer:String
  }] ,
  refundPolicy:{
    type:String,
    default:'30 days'
  },
  rating:{
    type:Number,
    required:[true,"please add product review"],
    default:0
  },
  numReview:{
    type:Number,
    required:[true,"please add number product review"],
    default:0
  },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  shipping:{
    type:Number,
    required:true,
    default:0
  },
  subProducts:[{
    images:[],
    descriptionImages:[],
    color:{
      color:{
        type:String
      },
      image:{
        type:String
      }
    },
    sizes:[
      {
        size:String,
        qty:Number,
        price:Number
      }
    ],
    discount:{
      type:Number,
      default:0
    },
    sold:{
      type:Number,
      default:0
    }
  }]
},{timestamps:true})

const Product = mongoose?.models?.Product || mongoose?.model("Product",ProductSchema);

export default Product;