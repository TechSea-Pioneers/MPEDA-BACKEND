import UserModel from '../models/UserModel.js'
import PromptModel from '../models/PromptModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from '../mailer/SendMail.js'
import mongoose from 'mongoose'

const createUser = async (req, res) => {
    try {
		const { name,email, password,phone } = req.body
		const user = await UserModel.findOne({ email })
		if (user) {
			return res.json({ success: false, message: 'User Already Exists.' })
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = await UserModel.create({
            name,
			email,
			phone,
			password: hashedPassword
		})
		if (!newUser) {
			return res.json({ success: false, message: 'Error Creating User.' })
		}
		const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)
		const link = `${process.env.HOST}/api/v1/user/verify/${token}`
		const mailInfo = await sendMail(email, link, "Please click the link below or copy paste in browser to verify your email address.")
		if (!mailInfo) {
			return res.json({ success: false, message: 'Error Creating User.' })
		}
		return res.json({
			success: true,
			message: 'User Created Successfully.'
		})
	} catch (error) {
		console.log(error)
		console.log(error.message)
		res.json({
			success: false,
			message: 'Some Internal Server Error Occured.'
		})
	}
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        if (!user.verified) {
            return res.json({ success: false, message: 'User Not Verified.', verified: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect Password.' })
        }
        const data = { user: { _id: user._id } }
        const token = jwt.sign(data, process.env.JWT_SECRET)
        return res.json({
            success: true,
            message: 'User Logged In Successfully.',
            type: user.type,
            token
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: 'Some Internal Server Error Occured.'
        })
    }
}
const verifyUser = async (req, res) => {
	try {
		const { token } = req.params
		const data = jwt.verify(token, process.env.JWT_SECRET)
		const user = await UserModel.findOne({ _id: data._id })
		if (!user) {
			return res.json({ success: false, message: 'User Not Found.' })
		}
		if (user.verified) {
			return res.json({
				success: false,
				message: 'User Already Verified.'
			})
		}
		const updatedUser = await UserModel.updateOne({ _id: user._id }, { $set: { verified: true } })
		if (!updatedUser) {
			return res.json({
				success: false,
				message: 'Error Verifying User.'
			})
		}
		return res.send(
			"<h1>User Verified Successfully.</h1><p>You can now <a href='https://webcrawlers.tech'>login</a>.</p>"
		)
	} catch (error) {
		console.log(error.message)
		res.json({
			success: false,
			message: 'Some Internal Server Error Occured.'
		})
	}
}
const sendVerificationEmail = async (req, res) => {
	try {
		const { email } = req.body
		const user = await UserModel.findOne({ email })
		if (!user) {
			return res.json({ success: false, message: 'User Not Found.' })
		}
		if (user.verified) {
			return res.json({
				success: false,
				message: 'User Already Verified.'
			})
		}
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
		const link = `${process.env.HOST}/api/user/verify/${token}`
		const mailInfo = await sendMail(user.email, link , "Please click the link below or copy paste in browser to verify your email address.")
		if (!mailInfo) {
			return res.json({
				success: false,
				message: 'Error Sending Verification Email.'
			})
		}
		return res.json({
			success: true,
			message: 'Verification Email Sent Successfully.'
		})
	} catch (error) {
		console.log(error.message)
		res.json({
			success: false,
			message: 'Some Internal Server Error Occured.'
		})
	}
}
const getUser = async (req,res)=>{
	try{
		const user = UserModel.findOne({"_id":new mongoose.Types.ObjectId(req.user._id)},'-password').then(res=>res.toJSON()).then(data=>{
			if(data){
				res.send({"success":"true","message":"User retireved successfully","data":data})
			}
		})
	}catch (err){
		console.log(err)
	}
}
const savePrompt = async(req,res)=>{
	try{
		const prompt = new PromptModel({...req.body, "author":req.user._id});
		prompt.save().then((data)=>{
			res.json({"success":"true","message":"Prompt Saved Successfully","data":data})
		}).catch(err=>{res.send({"sucess":"true","message":"failed to save prompt","err":err})})
	}catch(err){
		console.log(err);
	}
}
const getMessages = async(req,res)=>{
	try{
		PromptModel.find({"author":req.user._id}).lean().then(data=>{
			res.json({"success":"true","message":"prompts revieved successfully","data":data})
		})

	}catch(err){
		console.log(err);
	}
}

const recoverPassword = async (req, res)=>{
	try{
		const user = UserModel.find(req.body)
		console.log(req.body)
		const token = jwt.sign({ "email":req.body.email }, process.env.JWT_SECRET)
		const link = `${process.env.APP}/api/v1/user/newpassword/${token}`
		const mailInfo = await sendMail(req.body.email, link, "Please click the link below or copy paste in browser to generate a new password for your account.")
		if (!mailInfo) {
			return res.json({ success: false, message: 'Error Sending Recovery Mail.' })
		}
		return res.json({
			success: true,
			message: 'Recovery Mail Sent!'
		})

	}catch(err){
		console.log(err);
	}
}

const newpassword = async (req,res)=>{
	try{
		const { token } = req.params
		const data = jwt.verify(token, process.env.JWT_SECRET)
		console.log(data)
		const user = await UserModel.findOne({"email":data.email})
		if (!user) {
			return res.json({ success: false, message: 'User Not Found.' })
		}else{
			const hashedPassword = await bcrypt.hash(req.body.password, 10)
			console.log(req.body.password);
			console.log(hashedPassword);
			await UserModel.updateOne(user, { $set: { password: hashedPassword } })
			res.send({"success":"true", "message":"Password changed successfully, please login.."})
		}
	}catch(err){
		console.log(err);
		res.send({"success":"false", "message":"Internal Server Error"})
	}
}
export { createUser, loginUser, verifyUser, sendVerificationEmail, getUser, savePrompt, getMessages, recoverPassword, newpassword }
