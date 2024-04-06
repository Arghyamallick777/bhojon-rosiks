const RegisterMiddleware = require('./auth/register.middleware');
const ResetPasswordMiddleware = require('./auth/reset-password.middleware');
const ChangePasswordMiddleware = require('./auth/change-password.middleware');
module.exports = {
    RegisterMiddleware,
    ResetPasswordMiddleware,
    ChangePasswordMiddleware
}