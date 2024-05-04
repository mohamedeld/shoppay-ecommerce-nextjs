import nodemailer from "nodemailer";

import {google} from "googleapis";
import { sendEmailActivation } from "@/email/activeEmail";
const {OAuth2} = google.auth;

const OAUTH_BACKGROUND='https://developers.google.com/oauthplayground'

const {
  MAILING_SERVICE_CLIENT_ID,MAILING_SERVICE_CLIENT_SECRET,MAILING_SERVICE_CLIENT_REFRESH_TOKEN,SENDER_EMAIL_ADDRESS} = process.env;

const oauth2Client = new OAuth2(MAILING_SERVICE_CLIENT_ID,MAILING_SERVICE_CLIENT_SECRET,MAILING_SERVICE_CLIENT_REFRESH_TOKEN,OAUTH_BACKGROUND);

export const sendEmail = (to,url,txt,subject,template)=>{
  oauth2Client.setCredentials({
    refresh_token:MAILING_SERVICE_CLIENT_REFRESH_TOKEN
  });
  const access_token = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service:"gmail",
    auth:{
      type:"OAuth2",
      user:SENDER_EMAIL_ADDRESS,
      clientId:MAILING_SERVICE_CLIENT_ID,
      clientSecret:MAILING_SERVICE_CLIENT_SECRET,
      refreshToken:MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
      accessToken:access_token
    }
  });
  const mailOptions = {
    from:SENDER_EMAIL_ADDRESS,
    to:to,
    subject:subject,
    html:template
  }
  smtpTransport.sendMail(mailOptions,(err,infos)=>{
    if(err){
      console.log(err);
      return;
    }
    return infos;
  })
}