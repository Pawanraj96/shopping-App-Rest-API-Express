const express = require('express')
const router = express.Router()
const productController = require('../controllers/products.js')
const authonticate = require('../middlewares/auth.js')
// get 
router.get('/products',authonticate.authorizeUserAndAdmin,productController.getProducts)
//add
router.post('/add-product',authonticate.authorizeAdmin,productController.addProducts)           //if we you want use get means data is passed in header. But here we are sending in body so use post. 
//edit
// router.get('/edit-product',productController.editProduct)      //no need of this          // first we need to get the products using _id and then update it
router.put('/edit-product',authonticate.authorizeAdmin,productController.editProduct)
//delete
router.delete('/delete-product', authonticate.authorizeAdmin,productController.deleteProduct)
                                                                        



module.exports = router