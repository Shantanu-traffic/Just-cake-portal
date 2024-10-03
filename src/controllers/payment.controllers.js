const { createError } = require("../middleware/errorHandler.middleware")
const { PaymentService } = require("../services")

const payment = async (req,res,next)=>{

    const {order_id,user_id,payment_mode} = req.body
    if(!order_id || !user_id || !payment_mode ){
        return next(createError("Kindly Fill All the Details",400,"payment controller error"))
    }
    try {
        const result = await PaymentService.Payment.payment(req.body)
        return res.status(200).json({
            success:true,
            message:"Payment done successfully",
            payment_id:result
        })
    } catch (error) {
        return next(createError(error.message,500,"error in payment controller"))
    }
}

module.exports = {payment}