import bcrypt from "bcrypt";


import User from "@/models/userModel";
import { connectDb, disconnectDb } from "@/utils/db";
import { emailValidation } from "@/validations/backend/authValidation";
import { createActiveToken, resetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";
import resetEmailTemplate from "@/email/resetEmailTemplate";


export default async function handler(req,res){
  if(req.method === "POST"){
    try{
      await connectDb();
      const {email} = req.body;
      if(!email || !email.includes("@")){
        return res.status(400).json({
          message:"please fill all fields"
        })
      } 
      
      const user = await User.findOne({email});
      if(!user){
        res.status(404).json({
          message:"user is not found"
        })
      }
      
      const token = resetToken({
        id:user?._id?.toString()
      })
      let url = `${process.env.BASE_URL}/auth/reset-password/${token}`;
      sendEmail(email,url,'',"Activate your account",resetEmailTemplate);
      // await disconnectDb();
      res.status(200).json({
        message:"An email has been sent successfully",
      })
    }catch(err){
      console.error(err);
      return res.status(400).json({
        message:"bad request"
      })
    }
  }
}