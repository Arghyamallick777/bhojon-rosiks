const AppConfig = require("../../../config/app.config");
const { UnprocessableEntityError } = require("../../../errors/http/http.errors");
const { CommonLib } = require("../../../lib");
const {UserService} = require("../services");

const UserController = {
    async createUser(req, res, next) {
        try {
            const data = req.body;
            const payload = {};
            for(let i = 0; i < AppConfig.registration_keys.length; i++) {
                const keyData = AppConfig.registration_keys[i];
                if(!keyData.skip) {
                    if(!data[keyData.post_key] && keyData.default) payload[keyData.column_key || keyData.post_key] = keyData.default;
                    if(data[keyData.post_key]) payload[keyData.column_key || keyData.post_key] = data[keyData.post_key]; 
                }
            }
            if(CommonLib.isEmpty(payload)) {
                throw new UnprocessableEntityError('User data is not valid');
            }
            const user = await UserService.createUser(payload);
            next(user);
        } catch(e) {
            next(e);
        }
    },
    async updateUser(req, res, next) {

    },
    async listUser(req, res, next) {
        const users = await UserService.getUsers({
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 0
        });
        next({users: users.users.map(u => u.toJSON()), pagination: users.pagination});
    },
    async getUser(req, res, next) {
        
    },
    async deleteUser(req, res, next) {

    }
};

module.exports = UserController;