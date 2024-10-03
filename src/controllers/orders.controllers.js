const { createError } = require("../middleware/errorHandler.middleware")
const { OrderServices } = require("../services")
const Order = require("../services/orders/orders.services")

// address
const delivery_address = async (req,res,next)=>{
    const {user_id,street,city,state,postal_code,country,phone} = req.body
    if( !user_id || !street || !city || !state || !postal_code || !country || !phone){
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

const orderProduct = async (req,res,next)=>{
    const { user_id} = req.body
    if(!user_id){
        return next(createError("user_id mandatory",400,"order proudct controller"))
    }
    try {
        const result = await OrderServices.Order.orderProduct(req.body)
        return res.status(200).json({
            success:true,
            message:"Item added for order",
            order_id:result
        })
    } catch (error) {
        return next(createError(error.message,500,"order product control"))
    }
}

// order history
const orderHistory = async (req,res,next)=>{
    const { user_id } = req.params;
    try {
        const result = await OrderServices.Order.orderHistory(user_id)
        return res.status(200).json({
            success:true,
            message:"all order history data fetched...",
            result
        })
    } catch (error) {
        return next(createError(error.message,500,"order history controller"))
    }
}


// order history for admin
const adminOrderHistory = async (req,res,next)=>{
    try {
        const result = await OrderServices.Order.adminOrderHistory()
        return res.status(200).json({
            success:true,
            message:"all order history data fetched...",
            result
        })
    } catch (error) {
        return next(createError(error.message,500,"order history controller"))
    }
}


const cancelOrder = async (req,res,next)=>{
    try {
        const {order_id} =req.body
        const result = await OrderServices.Order.cancelOrder(order_id)
        return res.status(200).json({
            success:true,
            message:" Order cancelled",
            result
        })
    } catch (error) {
        return next(createError(error.message,500,"order cancel controller"))
    }
}

module.exports = {orderProduct,delivery_address,orderHistory,adminOrderHistory,cancelOrder}