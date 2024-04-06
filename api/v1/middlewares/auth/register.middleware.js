const AppConfig = require('../../../../config/app.config');
const UserService = require('../../services/user.service');

const RegisterMiddleware = {
    async validateRegister(req, res, next) {
        const keySets = AppConfig.registration_keys;
        const data = req.body;
        for(let i = 0; i < keySets.length; i++) {
            const keyData = keySets[i];
            if(keyData.required && !data[keyData.post_key]) {
                return next({error: true, code: 422, message: `${keyData.post_key} is missing.`})
            }
        }
        next();
    },
    async checkUniqueIntigrity(req, res, next) {
        const user = await UserService.getUserByKeySet(req.body);
        if(user) {
            next({error: true, code: 409, message: `User already exist.`});
            return;
        }
        next();
    }
};
module.exports = RegisterMiddleware;