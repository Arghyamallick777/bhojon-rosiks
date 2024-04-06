const { security } = require('../../../../lib');
const {UserService} = require('../../services');
const ChangePasswordMiddleware = {
    async validateChangePassword(req, res, next) {
        try {
            const {old_password, new_password, confirm_passwprd} = req.body;
            // Check if the old password is matched
            const user = await UserService.getUserById(req.user._id);
            if(!user) throw new Error('Not a valid user');
            if(user.password !== security.hashPassword(old_password)) {
                throw new Error('Old password did not match.');
            }
            // check for the password and confirm password
            if(new_password !== confirm_passwprd) {
                throw new Error('Password and confirm password did not match.');
            }
            next();
        } catch(e) {
            next(e);
        }
    },
};

module.exports = ChangePasswordMiddleware;
