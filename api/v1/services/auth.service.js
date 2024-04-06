const AppConfig = require('../../../config/app.config');
const { StringLib, security, DateLib } = require('../../../lib');
const UserService = require('./user.service');
const {Session} = require('../db/models');
const Models = require('../db/models');
const { NotFoundError, InternalServerError } = require('../../../errors/http/http.errors');
module.exports = {
    login(authData) {
        
    },
    async findAdmin(username) {
        const AdminModel = Models[AppConfig.admin_model || 'User'];
        if(!AdminModel) throw new InternalServerError('No model defined.');
        const admin = await AdminModel.findOne({
            email: username
        }).lean();
        console.log(admin, username);
        return admin;
    },
    async getOpenSessionOfUser(userId) {
        return await Session.findOne({
            user_id: userId,
            logout_time: null
        });
    },
    async getSession(sessionId) {
        return Session.findOne({
            session_id: sessionId
        });
    },
    async logoutSession(sessionId, expiryTime = null) {
        const session = await Session.findOne({session_id: sessionId});
        if(!session) {
            throw new NotFoundError("No active session found");
        }
        session.logout_time = expiryTime || new Date();
        return await session.save();
    },
    async createSessionFromUserId(userId) {
        const user = await UserService.getUserById(userId);
        if(!user) throw new NotFoundError('No User Found!');
        const userData = user.toJSON();
        for(const key of AppConfig.auth_user_excluded_cols) {
            delete userData[key];
        }
        return await this.createSessionForUser(userData);
    },
    async createSessionForUser(user) {
        /**
         * 1. Generate a session id
         * 2. Generate the access token and refresh token
         * 3. Create a session payload
         * 4. Save the session
         * 5. Return the user, session, accesstoken and refresh token
         */
        // Generate the session id
        const sessionId = `${StringLib.generateRandomStrings(4).toUpperCase()}-${StringLib.generateRandomStrings(3).toUpperCase()}-${StringLib.generateRandomStrings(4).toUpperCase()}`;
        user.sessionId = sessionId;
        // generate the accesstoken and refresh token
        const accessToken = security.generateAccessToken(user);
        const refreshToken = security.generateRefreshToken(user);
        // create session payload
        const sessionPayload = {
            session_id: sessionId,
            access_token: accessToken,
            refresh_token: refreshToken,
            user_id: user._id,
            login_time: new Date(),
            expiry_time: DateLib.modifyAKADate(new Date(), `+${process.env.AUTH_ACCESS_TOKEN_EXP_TIME}`)
        };
        // save the session
        const sessionRes = await Session.create(sessionPayload);
        // remove the session id as we dont need it in the frontend
        delete user.sessionId;
        return {
            user,
            accessToken,
            refreshToken
        };
    }
};