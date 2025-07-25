const  isAuthenticated = (req,res,next)=>{

    const token = req.headers.authorization
    console.log(token)
    if(!token){
        res.status(403).json({
            message:"Please send token"
        })
    }

    // next()

}

module.exports = isAuthenticated