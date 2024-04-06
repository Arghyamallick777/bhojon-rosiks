const Router = require('express').Router();
const AppConfig = require('../../../config/app.config');
const AuthController = require('../controllers/auth.controller');
const {RegisterMiddleware, ResetPasswordMiddleware, ChangePasswordMiddleware} = require('../middlewares');
if(AppConfig.is_frontend_auth_enabled) {
    Router.post('/login', AuthController.login);
    if(AppConfig.is_registration_enabled) {
        Router.post('/register', [
            RegisterMiddleware.validateRegister, 
            RegisterMiddleware.checkUniqueIntigrity
        ], AuthController.register);
    }
}
Router.post('/verify-otp', AuthController.verifyOtp);
Router.post('/resend-otp', AuthController.resendOtp);
Router.post('/logout', AuthController.logout);
Router.post('/forget-password', 
    ResetPasswordMiddleware.enabledPasswordFlow, 
AuthController.forgetPassword);
Router.post('/reset-password', [
    ResetPasswordMiddleware.enabledPasswordFlow,
    ResetPasswordMiddleware.checkToken,
    ResetPasswordMiddleware.checkPassword
], AuthController.resetPassword);
// Profile
Router.get('/profile', AuthController.myProfile);
Router.put('/profile', AuthController.updateMyProfile);
Router.post('/change-password', [
    ChangePasswordMiddleware.validateChangePassword
], AuthController.changePassword);
// Admin
Router.post('/admin', AuthController.adminLogin);

module.exports = Router;