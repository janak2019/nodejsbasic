const mongoose = require('mongoose')
const User = require('../model/userModel')
exports.connectDatabase = async(URI)=>{
    await mongoose.connect(URI)
    console.log("Database connected successfully")


    //admin seeding
const isAdminExists = await User.findOne({userEmail:"admin@gmail.com", role:"admin"})
if(!isAdminExists){
    await User.create({
    userEmail : "admin@gmail.com",
    userPassword : "admin",
    userPhoneNumber : 9849139266,
    userName :"admin",
    role:"admin"

})

}else{
    console.log("Admin already seeded")
}

}


