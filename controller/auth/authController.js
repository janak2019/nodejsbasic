

const User = require("../../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")

exports.registerUser= async(req,res)=>{
   const {email,password, phoneNumber,userName} =req.body
   
   if(!email || !password || !phoneNumber || !userName){
    res.status(400).json({
        message:"Please provide email, password, phoneNumber,username"
    })
   }
   //check if that email user already exist or not
   const userFound = await User.find({userEmail : email})
   if(userFound.length>0){
    return res.status(400).json({
        message: "Already registered from this eamil"
    })
   }
   await User.create({
    userName : userName,
    userPhoneNumber : phoneNumber,
    userEmail : email,
    userPassword : bcrypt.hashSync(password,10)

   })
   res.status(201).json({
    message: "User registered successfully"
   })
}

exports.loginUser = async(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){

        res.status(400).json({
            message: "Please provide email, password"
        })

    }
    //check if that email user exist or not
    const userFound = await User.find({userEmail:email})
    if(userFound.length ==0){
        return res.status(400).json({
            message:"User with that email is not Registered"
        })
    }
    //password check
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched){
        // generate token
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{

            expiresIn : '30d'
        })
        


        res.status(200).json({
            message:"User logged in successfully",
            token
        })
    }else{
        res.status(404).json({
            message:"Invalid Password"

        })
    }
}

// forget password

exports.forgetPassword = async(req,res)=>{
    const{email} =req.body
    if(!email){
        return res.status(400).json({
            message: "Please provide email"

        })
    }

    //check if that email is registered or not
    const userExist = await User.find({userEmail:email})
    if (userExist.length == 0){
        return res.status(400).json({
            message: "Email is not registered"
        })
    }
    //send otp to that email
    ///otp generate
    const otp = Math.floor(1000 + Math.random()*9000)
    userExist[0].otp = otp
    await userExist[0].save()

    await sendEmail({
        email : "withjanak@gmail.com",
        subjects :"otp code email",
        message : `Your OTP is ${otp}. Do not share with anyone`
    })
    res.status(200).json({
        message:"OTP sent successfully"
    })

}


///verify otp
exports.verifyOtp = async(req,res)=>{
    const {email,otp} =req.body
    if(!email || !otp){
        return res.status(400).json({
            message: "Please provide email, otp"
        })

    }
    //check if that otp is correct or not of that email
    const userExists = await User.find({userEmail:email})
    if(userExists.length == 0){
        return res.status(404).json({
            message: "Email is not registered"
        })
    }
    if(userExists[0].otp!==otp){
     res.status(400).json({
            message:"Invalid OTP"
        })

    }else{
        // dispose the otp so cannot be used next time the same otp
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()
        res.status(200).json({
            message:"OTP is correct"
        })
    }
}

// new password setting
exports.resetPassword = async(req,res)=>{
    const{email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: "Please provide email,newPassword,confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "newPassword and confirmPassword does not match "
        })
    }
    const userExists = await User.find({userEmail:email})
    if(userExists.length == 0){
        return res.status(400).json({
            message: "User email not registered"
        })
    }
    if(userExists[0].isOtpVerified !== true){
         return res.status(400).json({
            message: "You cannot perform this action"
        })

    }
    userExists[0].userPassword = bcrypt.hashSync(newPassword,10)
    userExists[0].isOtpVerified = false
    await userExists[0].save()
    res.status(200).json({
        message:"Password changed successfully"

    })
}