const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail :  {
        type: String,        
        required: [true,"Username must be provided" ],
        unique:true

    },
    userName : {
        type: String,
         required: [true,"Username must be provided" ]

    },
    userPhoneNumber:{
        type:Number,
        required : [true, "PhoneNumber must be provided"]
    },
    userPassword :{
        type: String,
        required : [true, "Password must be provided"]

    },
    role:{
        type : String,
        enum : ["customer","admin"],
        default : "customer"
    },
    otp:{
        type: Number
    },
    isOtpVerified:{
        type : Boolean,
        default:false
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User