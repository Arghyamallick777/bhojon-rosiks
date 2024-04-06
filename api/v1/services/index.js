const AuthService = require('./auth.service');
const UserService = require('./user.service');
const NotificationService = require('./notification.service');
const OtpService = require('./otp.service');
const RedisService = require('./redis.service');
module.exports = {
    AuthService,
    UserService,
    NotificationService,
    OtpService,
    RedisService
};
