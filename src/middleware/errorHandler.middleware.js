const createError = (errorMessage,statusCode,errorFound)=>{
    return {errorMessage,statusCode,errorFound}
}


const errorHandler = async (error,req,res,next)=>{
   const {errorMessage,statusCode,errorFound} = error
   return res.status(statusCode || 500).json({
    success:false,
    message:errorMessage,
    errorFound
   })
}


module.exports = {createError,errorHandler}