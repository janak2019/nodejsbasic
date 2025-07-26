const { createProduct } = require('../controller/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')

const router = require('express').Router()

//routes here
router.route("/product").post(isAuthenticated, restrictTo("admin","superadmin"), createProduct)



module.exports = router