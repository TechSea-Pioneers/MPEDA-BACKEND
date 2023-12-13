export const adminAuthentication = (req,res,next)=>{
    const token = req.header('Authorization').split(" ")[1]
	if (!token) {
		return res.json({
			success: false,
			message: 'Authentication token is required.'
		})
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_ADMIN)
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