const Product = require("../../../model/productModel")


exports.createProduct = async(req,res)=>{
    const file = req.file
    let filePath;
    if(!file){
        filePath = "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg"

    }else{
        filePath=req.file.filename
    }
    
    const {productName,productDescription,productPrice,productStatus,productStockQty} =req.body
    if(!productName || !productDescription || !productPrice || !productStockQty||!productStatus){
        return res.status(400).json({
            message: "Please provide productName,productDescription, productPrice,productStatus,productStockQty"
        })
    }
    //insert into the product collection/table
    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
        productImage:"http//localhost:3000/"+ filePath
    })
    res.status(200).json({
        message:"product created Successfully"
    })

}