const express = require('express')
const { registerUserManually, loginUserManually, forgotUserPassword, resetUserPassword } = require('../controllers/user.controllers')
const userRouter = express.Router()

userRouter.post('/register',registerUserManually)
userRouter.post('/login',loginUserManually)
userRouter.post('/forgot-password',forgotUserPassword)
userRouter.post('/reset-password',resetUserPassword)


module.exports = userRouter