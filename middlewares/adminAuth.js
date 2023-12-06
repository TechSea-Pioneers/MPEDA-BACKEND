export const adminAuthentication = (req,res,next)=>{
    console.log("ADMIN AUTHENTICATION MIDDLEWARE REACHED!")
    next()
}