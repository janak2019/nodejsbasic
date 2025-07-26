
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const promisify = require('util').promisify

const  isAuthenticated = async(req,res,next)=>{

    const token = req.headers.authorization
    
    if(!token){
        res.status(403).json({
            message:"Please login"
        })
    }
// jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
//     if(err){
//         res.status(400).json({
//             message: "Invalid Token"
//         })
//     }else{
//         res.status(200).json({
//             message:"Valid Token"
//         })
//     }
// })

//Alternate 
 try{
 const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
 if(!decoded){
    return res.status(403).json({
        message : "Do not try to this"
    })
 }

 // check if decoded.id(userId) exists in the user table
 const doesUserExist = await User.findOne({_id : decoded.id})
 if(!doesUserExist){
    return res.status(404).json({
        message: "User doesn't exists with that token/id"
    })
 }
 req.user = doesUserExist

    next()
 }catch(error){
    res.status(400).json({
        message:error.message
    })
}

}

module.exports = isAuthenticated