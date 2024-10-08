const masterDb = require("../config/db.connect");
const { createError } = require("../middleware/errorHandler.middleware");
const { UserServices } = require("../services/index");
require("../services/index");
async function createUserIfNotExists(profile) {
  const createUser = UserServices.User.registerUser;
  try {
    const result = await createUser(profile);
    return result;
  } catch (error) {
    return error;
  }
}

const registerUserManually = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createError(
        "Kindly Fill All the details",
        400,
        "register user controller"
      )
    );
  }
  try {
    const result = await UserServices.User.registerUserManually(req.body);
    
    if(!result.success){
      return next(createError(result.message,400,"register controller"))
    }
    return res.status(200).json({
      success: true,
      message: "User register successfully",
      result:result,
    });
  } catch (error) {
    return next(
      createError(error.message, 500, "register user-manually controller")
    );
  }
};

const loginUserManually = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError("Fill All the details", 200, "login controller"));
  }
  try {
    const result = await UserServices.User.loginUserManually(req.body);
    if (!result.success) {
     
      return res.status(400).json({
        success: false,
        message: result.message, 
      });
    }

    
    if (result.user.password) {
      delete result.user.password;
    }
    return res.status(200).json({
      success: true,
      message: "User login successfully",
      result: result.user,
    });
  } catch (error) {
    return next(createError(error.message, 500, "login user controller"));
  }
};

const forgotUserPassword = async (req, res, next) => {
  if (!req.body.email) {
    return next(
      createError("Please Provide email address", 400, "forgot user controller")
    );
  }
  try {
    const result = await UserServices.User.forgotPassword(req.body.email);
    return res.status(200).json({
      success: true,
      message:"forgot password mail",
      result,
    });
  } catch (error) {
    throw error;
  }
};


const resetUserPassword = async (req,res,next)=>{
    const { otp, token, newPassword } = req.body;
    if(!otp || !token || !newPassword){
        return next(createError("Fill all the details...",400,"resetn controller"))
    }
    try {
        const response = await UserServices.User.resetPassword(req.body);
        if (response.status === 'success') {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        return next(createError(error.message,500,"resetn controller"))
        
    }
}
module.exports = {
  createUserIfNotExists,
  registerUserManually,
  loginUserManually,
  forgotUserPassword,
  resetUserPassword
};
