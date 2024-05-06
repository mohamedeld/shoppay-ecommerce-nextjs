import mongoose,{Schema} from "mongoose";

const reviewSchema = new Schema({
  reviewBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  rating:{
    type:Number,
    required:[true,'please enter product rating'],
    default:0
  },
  review:{
    type:String,
    required:[true,'please enter product rating'],
  },
  size:{
    type:String
  },
  style:{
    color:String,
    image:String
  },
  fit:{
    type:String,
  },
  images:[],
  likes:[]
},{timestamps:true});

const Review = mongoose.models.Review || mongoose.model("Review",reviewSchema);
export default Review;