import mongoose,{Schema} from "mongoose";

const subCategorySchema = new Schema({
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
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:[true,'please select category']
  }
},{timestamps:true});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory",subCategorySchema);
export default SubCategory;