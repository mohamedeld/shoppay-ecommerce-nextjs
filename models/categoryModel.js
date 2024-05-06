import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
  name:{
    type:String,
    required:[true,'please enter category name'],
    minLength:[2,"category name should have at least 2 characters"],
    maxLength:[32,"category name should have less than 32 characters"],
  },
  slug:{
    type:String,
    required:[true,'please enter category slug'],
    unique:true,
    lowercase:true,
    index:true
  },

},{timestamps:true});

const Category = mongoose.models.Category || mongoose.model("Category",categorySchema);
export default Category;