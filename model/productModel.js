
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    productName: {
        type:String,
        required : [true, "productName must be provided"]
    },
    productDescription: {
        type:String,
        required : [true, "productName must be provided"]
    },
    productStockQty: {
        type:Number,
        required : [true, "productName must be provided"]
    },
    productPrice: {
        type:Number,
        required : [true, "productName must be provided"]
    },
    producStatus: {
        type:String,
        enum :["available","unavailable"]
    },
    productImage:{
        type:String
    }

},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product