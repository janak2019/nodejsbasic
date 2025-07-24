const express = require('express')
const { connectDatabase } = require('./database/indes')
const User = require('./model/userModel')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { registerUser, loginUser } = require('./controller/auth/authController')
//Routes here
const authRoute = require("./routes/authRoute")

//Routes end here
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
app.use("",authRoute)





app.listen(process.env.PORT,()=>{
    console.log("NodeJs Project start at ",process.env.PORT)
})