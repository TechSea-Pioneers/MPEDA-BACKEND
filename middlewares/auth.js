export const authentication = (req,res,next)=>{
    console.log("AUTHENTICATION MIDDLEWARE REACHED!")
    next()
}