const express = require('express')
const { connectDatabase } = require('./database/index')
const User = require('./model/userModel')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { registerUser, loginUser } = require('./controller/auth/authController')
//Routes here
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")

//Routes end here
require('dotenv').config()
//jon format data handle ko lagi use gareko

app.use(express.json())
//form bata aayako data handle ko lagi use gareko
app.use(express.urlencoded({extended : true}))

app.use(express.static("uploads"))

//give permision to access uploads folder
connectDatabase(process.env.MONGO_URI)

// test api to check if server is live or not 
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello From Digital Momo"
    })
})
app.use("/api",authRoute)
app.use("/api",productRoute)




app.listen(process.env.PORT,()=>{
    console.log("NodeJs Project start at ",process.env.PORT)
})