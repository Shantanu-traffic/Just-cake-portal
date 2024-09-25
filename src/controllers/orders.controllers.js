const { createError } = require("../middleware/errorHandler.middleware")
const { OrderServices } = require("../services")
const Order = require("../services/orders/orders.services")

// address
const delivery_address = async (req,res,next)=>{
    const {address,user_id,street,city,state,postal_code,country} = req.body
    if(!address || !user_id || !street || !city || !state || !postal_code || !country){
        return next(createError("All field are mandatory",400,"delivery address controller"))
    }

    try {
        const result = await OrderServices.Order.deliveryAddress(req.body)
        return res.status(200).json({
            success:true,
            message:"address save successfully",
            result
        })
    } catch (error) {
        return next(createError(error.message,500,"deleivery address controller"))
    }
}
// order placed

const orderProduct = async (req,res,next)=>{}


module.exports = {orderProduct,delivery_address}