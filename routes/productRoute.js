const { createProduct } = require('../controller/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const router = require('express').Router()
const {multer,storage} = require('../middleware/multerConfig')
const upload = multer({storage : storage})

//routes here
router.route("/product").post(isAuthenticated, restrictTo("admin","superadmin"),upload.single('productImage'), createProduct)



module.exports = router