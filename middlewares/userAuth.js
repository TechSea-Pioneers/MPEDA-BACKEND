import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const authentication = (req,res,next)=>{
    const token = req.header('Authorization').split(" ")[1]
	console.log(token)
	if (!token) {
		return res.json({
			success: false,
			message: 'Authentication token is required.'
		})
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET)
		req.user = data.user
		next()
	} catch (error) {
		res.json({
			success: false,
			message: 'Authentication token is not valid.'
		})
		console.log(error.message)
	}
}