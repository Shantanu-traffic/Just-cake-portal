const { createError } = require("../middleware/errorHandler.middleware")
const { ContactUsServices } = require("../services")


const contactUs = async (req,res,next)=>{
    const {title,email,message} = req.body
        try {
            const result = await ContactUsServices.ContactUs.contactUsByCustomer(req.body)
            console.log(result,"result data")
            return res.status(200).json({
                success:true,
                message:"email send successfully",
                result
            })
        } catch (error) {
            return next(createError(error.message,500,"contact us controller"))
        }
}

module.exports = {contactUs}