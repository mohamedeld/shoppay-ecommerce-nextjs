/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  env:{
    DB_PASSWORD:'Bw4hHftemnpb3qJN',
    DB_URL:'mongodb+srv://mohamedazoz20010:Bw4hHftemnpb3qJN@cluster0.itjocbr.mongodb.net/ecommerce'
    ,API_KEY:'jdgr7x1kb196wbqi'
  },
  sassOptions:{
    includePaths:[path.join(__dirname,"styles")],
    prependData:`@import "base.scss";`
  },
  images:{
    domains: ['avatars.githubusercontent.com','th.bing.com','ae01.alicdn.com','assets.stickpng.com','res.cloudinary.com','img.ltwebstatic.com','ae03.alicdn.com'],
  }
};

module.exports= nextConfig;
