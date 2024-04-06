const AppConfig = require('../../../config/app.config');
const { NotFoundError } = require('../../../errors/http/http.errors');
const { CommonLib } = require('../../../lib');
const {User} = require('../db/models');
const UserService = {
    async createUser(userData) {
        return await User.create(userData);
    },
    async getUsers({page, limit}) {
        // const where = {};
        const aggregate = {};
        let users = [];
        let offset;
        let pagination = null;
        if(page && limit) {
            offset = CommonLib.getOffset(page, limit);
            const total = await User.count();
            pagination = CommonLib.getPagination(page, limit, total);
            users = await User.findAll(aggregate).skip(offset).limit(limit);
        } else {
            users = await User.findAll(aggregate);
        }
        // Sanitize will be on the controller
        return {users, pagination};
    },
    async getUserByKeySet(data) {
        const where = {};
        for(const key of AppConfig.registration_keys) {
            if(key.unique) {
                where[key.column_key] = data[key.post_key];
            }
        }
        if(!CommonLib.isEmpty(where)) {
            return await User.findOne({...where});
        }else {
            return null;
        }
    },
    async getUserByUserId(userId, userIdCol = AppConfig.auth_primary_userid){
        const authType = AppConfig.auth_type.split("+")[1];
        const user = await User.findOne({
            [userIdCol]: userId
        });
        return {user, authType};
    },
    async getUserById(userId){
        const user = await User.findOne({_id: userId});
        return user;
    },
    async updatePassword(password, userId) {
        return await User.updateOne({password: password}, {_id: userId});
    },
    async updateMyProfile(id, {first_name, last_name}) {
        const user = await this.getUserById(id);
        if(!user) throw new NotFoundError('No user found with the id.');
        return await User.updateOne({first_name, last_name}, {_id: id});
    }
};

module.exports = UserService;