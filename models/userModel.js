import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
  name:{
    type:String,
    required:[true,"plase enter your full name"]
  },
  email:{
    type:String,
    unique:true,
    required:[true,"please enter your email"]
  },
  password:{
    type:String,
    required:[true,"please enter your password"]
  },
  image:{
    type:String,
    default:'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?rs=1&pid=ImgDetMain'
  },
  role:{
    type:String,
    default:'user'
  },
  emailVerified:{
    type:Boolean,
    default:false
  },
  defaultPaymentMethod:{
    type:String,
    default:""
  },
  address: [
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  ],
  wishlist: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      style: {
        type: String,
      },
    },
  ],
},{timestamps:true});

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;