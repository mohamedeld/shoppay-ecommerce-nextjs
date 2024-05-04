import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/db";
import User from "@/models/userModel";
import { connectDb } from "@/utils/db";

connectDb();
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  
  providers: [
    CredentialsProvider({
       // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const email = credentials?.email;
      const password = credentials?.password;
      const user = await User.findOne({email})
      if (user) {
        // Any object returned will be saved in `user` property of the JWT

        return SignInUser({password,user});
      } else {
        throw new Error('This email does not exist')
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  
  callbacks:{
    async session({session,token}){
      let user = await User.findById(token?.sub);
        session.user._id = token?.sub  || user?._id?.toString();
        session.user.role = user?.role || "user";
        token.role = user?.role || "user";
      return session;
    }
  },
  pages:{
    signIn:'/signin'
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.JWT_SECRET
}

export default NextAuth(authOptions)


const SignInUser = async ({password,user })=>{
  if(!user?.password){
    throw new Error("please enter your password");
 
  }
  const comparePassword = await bcrypt.compare(password,user?.password);
  if(!comparePassword){
    throw new Error("password or email is incorrect");
   
  }
  return user;
}