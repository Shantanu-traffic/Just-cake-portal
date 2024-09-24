const {createError} = require('../middleware/errorHandler.middleware')
const { CartServices } = require('../services')
// add to cart 
const addToCart = async (req,res,next)=>{
        const {product_id,user_id,quantity,total_price,} = req.body
        if(!product_id || !user_id || !quantity || !total_price){
            return next(createError("Provide all details",400,"add to cart controller error"))
        }
    try {
        const result = await CartServices.Cart.addToCart(req.body)
        return res.status(200).json({
            success:true, 
            message:"Item added into cart successfully",
            result:result
        })
    } catch (error) {
        return next(createError(error.message,500,"add to cart controller error"))
    }
}

// delete 

const deleteCart = async (req,res,next)=>{}


module.exports = {addToCart,deleteCart}