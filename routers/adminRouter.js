import express from 'express'
import { adminAuthentication } from '../middlewares/adminAuth.js';

const AdminRouter = express.Router();


// get details of the user
AdminRouter.use(adminAuthentication)
AdminRouter.get("/",(req,res)=>{res.send("Reached GetAdmin")})
// login route
AdminRouter.post("/login",(req,res)=>{res.send("Reached Login Admin")})
// get all users
AdminRouter.get("/all",(req,res)=>{res.send("Reached Get All Users")})

export default AdminRouter
