import express from 'express'
import { adminAuthentication } from '../middlewares/adminAuth.js';
import { authentication } from '../middlewares/userAuth.js';

const UserRouter = express.Router();

// define routes for the user.

// login route
UserRouter.post("/login",(req,res)=>{res.send("Reached Login user")})
// signup route
UserRouter.post("/register",(req,res)=>{res.send("Reached Register User")})
// verification route
UserRouter.get("/verify",(req,res)=>{res.send("Reached Verify User")})
// resend mail route
UserRouter.post("/resendmail",(req,res)=>{res.send("Reached Resend Mail to User")})
// get details of the user (requires auth)
UserRouter.use(authentication)
UserRouter.get("/",(req,res)=>{res.send("Reached GetUser")})

export default UserRouter