const product = require('../models/product.js')         // now product is collection name

const getProducts = async (req, res, next) => {
    try {
        const data = await product.find().lean()
        res.status(200).json({
            error: false,
            message: "Products getting succesfully",
            data: data
        })
    } catch (err) {
        next(err)
    }
}

const addProducts = async (req, res, next) => {
    // console.log(req.body);
    try {
        const { pName, pDesc, pPrice } = req.body
        await product.insertMany({
            pName,
            pDesc,
            pPrice
        })
        res.status(200).json({
            error: false,
            message: "Products added successfully",
            data: {
                pName,
                pDesc,
                pPrice
            }
        })
    } catch (err) {
        next(err)
    }
}

//Already they have whole data again no need of of getting the data while edit.

// const editProduct = async (req,res,next)=>{
//     console.log(req.params._id);
//     try{
//         const _id = req.query._id //destructuring      // we need to use req.query to get the params.
//         const selectedProduct = await product.findOne({_id:_id})     // one _id is backend Id and req.params._id is front end id if it matches we will get the product.
//         console.log(selectedProduct);
//         res.status(200).json({
//             error:false,
//             message:"Selected product found",
//             data:selectedProduct
//         })
//     }catch(err){
//         next(err)
//     }
// }

//when clicking edit button in front end the edit form will open and user will edit the field and click on update
//After clicking update button the data along with id is sent back to back end if the id matches then only update happens or else not
const editProduct = async (req, res, next) => {
    console.log(req.body);
    try {
        const {  pName, pDesc, pPrice } = req.body
            const {_id} = req.query
            await product.updateOne({ _id }, {
                $set: {
                    pName,
                    pDesc,
                    pPrice
                }
            })
            res.status(200).json({
                error: false,
                message: 'Product updated successfully',
                data: {
                    pName,
                    pDesc,
                    pPrice
                }
            })
         
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    console.log(req.query);   // here we need to use req.query bcoz id is passed in query params.
    try{
        const _id = req.query._id       //destructuring
        await product.deleteOne({_id})
        res.status(200).json({
            error:false,
            message:"Products deleted successfully",
            data:null
        })

    }catch(err){
        next(err)
    }
}



module.exports = { getProducts, addProducts, editProduct, deleteProduct }