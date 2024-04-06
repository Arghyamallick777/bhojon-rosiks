const { AuthService } = require('../api/v1/services');
const AppConfig = require('../config/app.config');
const {security} = require('../lib');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyAuth(req, res, next) {
        const skipAuth = !!(AppConfig.skip_auth.find(s => {
            const regExp = new RegExp(s.path);
            return regExp.test(req.path) && s.method === req.method.toUpperCase();
        }));
        req.skipAuth = skipAuth;
        try {
            const tokenData = req.headers[AppConfig.auth_token_key];
            if(!tokenData) throw Error('Authentication Error. 1');
            const tokenArr = tokenData.split(AppConfig.auth_token_separator);
            if(tokenArr[0] !== AppConfig.auth_token_initial_text) throw Error(`Authentication Error.2`);
            if(!tokenArr[1]) throw Error('Authentication Error.3');
            const token = security.decrypt(tokenArr[1]);
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch(e) {
            if(skipAuth) return next();
            next({message: e.toString(), code: 401, error: true});
        }
    },
    async verifySession(req, res, next) {
        try {
            if(req.skipAuth) return next();
            const user = req.user;
            console.log(user, "USER");
            const sessionId = user.sessionId;
            const session = await AuthService.getSession(sessionId);
            if(!session) throw new Error('No Session');
            const expTime = session.expiry_time;
            if(expTime.getTime() <= new Date().getTime()) {
                // update the session with logout
                await AuthService.logoutSession(sessionId, session.expiry_time);
                throw new Error('Session Expired');
            }
            next();
        }catch(e) {
            next(e);
        }
    }
}