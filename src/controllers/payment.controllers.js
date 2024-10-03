const { createError } = require("../middleware/errorHandler.middleware")
const { PaymentService } = require("../services")



const payment = async (req,res,next)=>{
    console.log("body getting",req.body)
    console.log("file data",req.file)
    const {order_id,user_id,payment_mode} = req.body
    if(!order_id || !user_id || !payment_mode ){
        return next(createError("Kindly Fill All the Details",400,"payment controller error"))
    }
    try {
        console.log(req.body,req.file);
        
        const result = await PaymentService.Payment.payment(req.body,req.file)
        const mailResponse = await PaymentService.Payment.paymentMail(result.user_id,result.order_id,result.total_amount)
        
        return res.status(200).json({
            success:true,
            message:"Payment done successfully",
            result:{...result,...mailResponse},
        })
    } catch (error) {
        return next(createError(error.message,500,"error in payment controller"))
    }
}

module.exports = {payment}