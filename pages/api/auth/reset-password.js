import bcrypt from "bcrypt";


import User from "@/models/userModel";
import { connectDb, disconnectDb } from "@/utils/db";
import { emailValidation } from "@/validations/backend/authValidation";
import { createActiveToken, resetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";
import resetEmailTemplate from "@/email/resetEmailTemplate";


export default async function handler(req,res){
  if(req.method === "put"){
    try{
      await connectDb();
      const {userId,password} = req.body;
      if(!userId || !password){
        return res.status(400).json({
          message:"please fill all fields"
        })
      } 
      
      const user = await User.findById(userId);
      if(!user){
        res.status(404).json({
          message:"user is not found"
        })
      }   
      const cryptedPassword = await bcrypt.hash(password,12);
      await User.findByIdAndUpdate(userId,{
        password:cryptedPassword
      },{multi:true})
      const token = resetToken({
        id:user?._id?.toString()
      })
      let url = `${process.env.BASE_URL}/auth/reset-password/${token}`;
      sendEmail(email,url,'',"Activate your account",resetEmailTemplate);
      // await disconnectDb();
      res.status(200).json({
        email:user?.email,
      })
    }catch(err){
      console.error(err);
      return res.status(400).json({
        message:"bad request"
      })
    }
  }
}