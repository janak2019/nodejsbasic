const mongoose = require('mongoose')
const User = require('../model/userModel')
const adminSeeder = require('../adminSeeder')
exports.connectDatabase = async(URI)=>{
    await mongoose.connect(URI)
    console.log("Database connected successfully")


//admin seeder function call

adminSeeder()

}


