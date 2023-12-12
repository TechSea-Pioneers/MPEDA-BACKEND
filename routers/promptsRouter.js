import express from 'express'
import {adminAuthentication} from '../middlewares/adminAuth.js'
const PromptRouter = express.Router();

// define routes for the user.

//  admin authentication
PromptRouter.use(adminAuthentication)
// get all the prompts of a user
PromptRouter.get("/history/:id",(req,res)=>{res.send("sending Prompt History of A Specific User")})

export default PromptRouter