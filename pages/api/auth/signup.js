import bcrypt from "bcrypt";


import User from "@/models/userModel";
import { connectDb, disconnectDb } from "@/utils/db";
import { emailValidation } from "@/validations/backend/authValidation";
import { createActiveToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";
import { sendEmailActivation } from "@/email/activeEmail";


export default async function handler(req,res){
  if(req.method === "POST"){
    try{
      await connectDb();
      const {name,email,password} = req.body;
      if(!name || !email || !password){
        return res.status(400).json({
          message:"please fill all fields"
        })
      } 
      if(!emailValidation(email)){
        return res.status(400).json({
          message:"please enter a valid email"
        })
      }
      const hashedPassword = await bcrypt.hash(password,12);
      const user = await User.findOne({email:email});
      if(user){
        return res.status(400).json({
          message:"email is already exists"
        })
      }
      const newUser = new User({
        name,
        email,
        password:hashedPassword
      });
      const addedUser = await newUser.save();
      const token = createActiveToken({
        id:addedUser?._id?.toString()
      })
      let url = `${process.env.BASE_URL}/active/${token}`;
      sendEmail(email,url,'',"Activate your account",sendEmailActivation(to,url));
      await disconnectDb();
      res.status(200).json({
        message:"sign up successfully",
      })
    }catch(err){
      console.error(err);
      return res.status(400).json({
        message:"bad request"
      })
    }
  }
}