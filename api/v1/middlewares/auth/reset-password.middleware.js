const AppConfig = require('../../../../config/app.config');
const {security, StringLib, DateLib} = require('../../../../lib');
const ResetPasswordMiddleware = {
    enabledPasswordFlow(req, res, next) {
        try {
            if(AppConfig.auth_type.split('+')[1] !== 'password') throw new Error('Not allowed');
            next();
        } catch(e) {
            next(e);
        }
    },
    async checkToken(req, res, next) {
        try {
            const token = req.headers['x-reset-token'];
            if(!token) throw new Error('Please provide the token');
            const decoded = security.decrypt(token);
            if(!decoded) throw new Error('Invalid token provided.');
            if(!StringLib.isJsonParsable(decoded)) throw new Error('Token payload is malformed.');
            const data = JSON.parse(decoded);
            // check the time stanmp
            const createdAt = new Date(data.timestamp);
            if(!createdAt.getTime) throw new Error('Payload is malformed.');
            const date = new Date();
            const expiryDate = DateLib.modifyAKADate(createdAt, `+${process.env.AUTH_FORGET_PASSWORD_TIME_GAP || '5min'}`);
            if(expiryDate.getTime() < date.getTime()) throw new Error('Session expired');
            req.body.user_id = data._id;
            next();
        } catch(e) {
            next(e);
        }
    },
    checkPassword(req, res, next) {
        try {
            const password = req.body.new_password;
            const confirmPassword = req.body.confirm_password;
            if(!password) throw new Error('Password not provided.');
            if(!confirmPassword) throw new Error('Confirm password not provided.');
            if(password !== confirmPassword) {
                throw new Error('Password and confirm password did not match.');
            }
            next();
        } catch(e) {
            next(e);
        }
    }
};

module.exports = ResetPasswordMiddleware;