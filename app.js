const express = require('express')
const { connectDatabase } = require('./database/indes')
const User = require('./model/userModel')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended : true}))


connectDatabase(process.env.MONGO_URI)

// test api to check if server is live or not 
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello From Digital Momo"
    })
})
//register user api

app.post("/register",async(req,res)=>{
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
})
//login user api

app.post("/login",async(req,res)=>{
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
        const token = jwt.sign({id:userFound[0]._id},"thisissecretkey",{

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
})





app.listen(process.env.PORT,()=>{
    console.log("NodeJs Project start at ",process.env.PORT)
})