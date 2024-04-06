const {AuthService, UserService, OtpService, NotificationService} = require('../services');
const AppConfig = require('../../../config/app.config');
const EnumConfig = require('../../../config/enum.config');
const { security, envs } = require('../../../lib');
const {ConflictError, NotFoundError, BadRequestError, ForbiddenError, UnprocessableEntityError, ServiceUnavailableError} = require('../../../errors/http/http.errors');
const AuthController = {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Function} next 
     * @returns {Promise<void>}
     */
    async register(req, res, next) {
        /**
         * 1. Get the data from the body
         * 2. Determine the auth type
         * 3. Based on that call the service
         */
        try {
            const registerData = req.body;
            const authType = AppConfig.auth_type.split("+").pop();
             // check if the user already exist with the unique key sets
             const existingUser = await UserService.getUserByKeySet(registerData);
             if(existingUser) {
                 // User with the unique keys already exist
                 throw new ConflictError("User already exist.");
             }
             // create the user with the keys
             const userData = {};
             for(const key of AppConfig.registration_keys) {
                 if(!key.skip) {
                    if(key.post_key === AppConfig.auth_password_key) {
                        // hash the password
                        userData[key.column_key] = security.hashPassword(registerData[key.post_key]);
                    } else {
                        userData[key.column_key] = registerData[key.post_key];
                    }
                 }
             }
             const userRes = await UserService.createUser(userData);
             const user = userRes.toJSON();
            if(authType === 'otp') {
                // Otp flow
                // send otp to the user
                const otp = await OtpService.sendOtp(user[AppConfig.auth_primary_userid], 
                    'auth_registration', {name: user.name});
                const otpres = await OtpService.createOtp(otp, user.id, 'auth_registration');
                user.otp_token = otpres.token_id;
                // create token if required
                // send the response
                next({
                    token: otpres.token_id
                });
            } else {
                // Password flow
                /**
                 * 1. Create the token and send the response
                 */
                if(!AppConfig.verify_register && AppConfig.login_after_registration) {
                    for(const key of AppConfig.auth_user_excluded_cols) {
                        delete user[key];
                    }
                    const session = await AuthService.createSessionForUser(user);
                    next({...session, login_flow: true});
                } else {
                    // check if any verification method available
                    if(AppConfig.verify_register) {
                        if(AppConfig.verify_register_method === 'otp') {
                            const otp = await OtpService.sendOtp(user[AppConfig.auth_primary_userid], 
                                'auth_registration', {name: user.name});
                            const otpres = await OtpService.createOtp(otp, user.id, 'auth_registration');
                            user.otp_token = otpres.token_id;
                            next({
                                token: otpres.token_id
                            });
                        } else {
                            // TODO handle other verification method
                        }
                    } else {
                        next({login_flow: false});
                    }
                }
            }
        }catch(e) {
            next(e);
        }
    },
    async login(req, res, next) {
        try {
            const authData = req.body;
            const userid = authData[AppConfig.auth_user_id_key];
            const password = authData[AppConfig.auth_password_key];
            // user id fetch the user
            const user = await UserService.getUserByUserId(userid);
            if(!user.user) {
                throw new UnprocessableEntityError("Username or Password is wrong.");
            }
            // check if the app has single session per user enabled
            if(AppConfig.auth_single_session) {
                // check if the user has an open session
                const session = await AuthService.getOpenSessionOfUser(user.user._id);
                if(session) {
                    // There is an ongoing session
                    // check if the session has expired
                    const expiryTime = new Date(Date.parse(session.expiry_time));
                    const date = new Date();
                    if(date.getTime() < expiryTime.getTime()) {
                        // session expiry time is in the future
                        if(AppConfig.throw_error_on_single_session) {
                            throw new ConflictError("Wait! It looks like you have an open session.");
                        }
                    }
                    // Logout
                    // As if the session is not expired or the session is old. then logout and create new session
                    await AuthService.logoutSession(session.session_id, expiryTime);
                    
                }
            }
            let responseData = {};
            if(user.authType === 'otp') {
                /**
                 * 1. Send OTP
                 */
                const otp = await OtpService.sendOtp(userid, 'auth_login');
                const otpres = await OtpService.createOtp(otp, user.user._id || 1, 'auth_login');
                responseData = {
                    token: otpres.token_id
                };
            } else {
                // Password
                if(user.user.password !== security.hashPassword(password)) {
                    throw new UnprocessableEntityError("Username or Password did not match");
                }
                const uData = user.user.toJSON();
                for(const key of AppConfig.auth_user_excluded_cols) {
                    delete uData[key];
                }
                const payload = await AuthService.createSessionForUser(uData);
                responseData = payload;
            }
            next(responseData);
        }catch(e) {
            next(e);
        }
    },

    async verifyOtp(req, res, next) {
        try {
            const otp = req.body.otp;
            const token = req.body.token;
            // With the token get the details
            const otpres = await OtpService.getOtpByTokenId(token);
            if(!otpres) throw new ForbiddenError('Opps! Invalid OTP Session. Please resend and try again.');
            if(otpres.invalidate !== EnumConfig.OTP_INVALIDATE.VALID) {
                throw new ForbiddenError("Opps! Looks like it is not permitted by the system.");
            }
            // check if the otp is expired or not
            const expTime = new Date(Date.parse(otpres.exp_time));
            if(expTime.getTime() < new Date().getTime()) {
                throw new ForbiddenError("OTP expired.");
            }
            if(otp.toString() !== otpres.otp) {
                throw BadRequestError("OTP did not match.");
            }
            // update the otp to invalidate
            await OtpService.invalidateOtp(otpres._id);
            const payload = await OtpService.getResponseBasedOnOtpTrigger(otpres);
            next(payload);
        } catch(e) {
            console.log(e);
            next(e);
        }
    },

    async resendOtp(req, res, next) {
        try {
            // const token = req.body.refresh_token;
            const token = req.body.token;
            // validate get the details from the token
            if(!token) throw new ForbiddenError('Token invalid');
            // Check if the otp token is invalid or not
            // this way we can determine to mark the refresh token a invalid
            const otpData = await OtpService.getOtpByTokenId(token);
            if(!otpData || otpData.invalidate !== EnumConfig.OTP_INVALIDATE.VALID) throw new ForbiddenError('Invalid session token');
            // invalidate the otp
            await OtpService.invalidateOtp(otpData._id);
            const reason = otpData.reason;
            // get the user details
            const user = await UserService.getUserById(otpData.user_id);
            if(!user) throw new ForbiddenError('Invalid User Session');
            const serializedUser = user.toJSON();
            // send otp
            const otp = await OtpService.sendOtp(serializedUser[AppConfig.auth_primary_userid], reason, {name: `${serializedUser.first_name}`});
            // create otp
            const otpRes = await OtpService.createOtp(otp, serializedUser._id, reason);
            // generate the access token
            next({
                token: otpRes.token_id
            });
        } catch(e) {
            console.log(e);
            next(e);
        }
    },
    async logout(req, res, next) {
        /**
         * 1. Get the session id
         */
        await AuthService.logoutSession(req.user.sessionId);
        next({message: 'Logout Success'});
    },
    async adminLogin(req, res, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const admin = await AuthService.findAdmin(username);
            if(!admin) throw new UnprocessableEntityError('Invalid credentials!');
            if(admin.password !== security.hashPassword(password)) {
                throw new UnprocessableEntityError('Invalid credentials!');
            }
            if(admin.user_type !== 'admin' && admin.user_type !== 'sub_admin') throw new UnprocessableEntityError('Invalid Credentials!');
            // TODO get the role
            // create the session
            const session = await AuthService.createSessionForUser(admin);
            next(session);
        } catch(e) {
            next(e);
        }
    },
    async myProfile(req, res, next) {
        try {
            const user = await UserService.getUserById(req.user._id);
            next(user);
        } catch(e) {
            next(e);
        }
    },
    async updateMyProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const data = req.body;
            await UserService.updateMyProfile(userId, {first_name: data.first_name, last_name: data.last_name});
            next({message: "Updated successfully."});
        } catch(e) {
            next(e);
        }
    },
    async changePassword(req, res, next) {
        try {
            const userId = req.user._id;
            const newPassword = req.body.new_password;
            await UserService.updatePassword(security.hashPassword(newPassword), userId);
            next({message: "Password Updated successfully."});
        } catch(e) {
            next(e);
        }
    },
    /**
     * Forget password flow
     * 1. Forget password API -> get the phone or email, send the email or sms with otp if otp flow is selected
     * otherwise send the link.
     * 2. Verify OTP API if otp flow selected  -> return a token for change password with user id
     * 3. Verify the token for the change password and change or update the password
     */
    /**
     * 
     *
     * @return {Promise<void>}
     */
    async forgetPassword(req, res, next) {
        try {
            const userid = req.body[AppConfig.auth_user_id_key];
            const forgetPasswordFlow = AppConfig.forget_password_flow;
            // get the user
            const data = await UserService.getUserByUserId(userid, 
                AppConfig.forget_password_primary_userid || AppConfig.auth_primary_userid);
            if(!data.user) {
                throw new NotFoundError('No user found with the id');   
            }
            const user = data.user;
            if(forgetPasswordFlow === 'otp') {
                const otp = await OtpService.sendOtp(userid, 'auth_forget_password_otp', {NAME: user.fullName});
                const otpres = await OtpService.createOtp(otp, user._id, 'auth_forget_password_otp');
                return next({
                    token: otpres.token_id
                });
            } else {
                // generate the link token
                const token = security.encrypt(JSON.stringify({_id: user._id + '', timestamp: Date.now()}));
                const url = `${envs.getFrontEndUrl()}` + token;
                // create the payload
                const messagePayload = {
                    link: url
                };
                NotificationService.sendNotification(userid, messagePayload, 'auth_forget_password_link').then(r =>{console.log(r);}).catch(err => {console.log(err);});
                next({token: token});
            }
        } catch(e) {
            next(e);
        }
    },
    async resetPassword(req, res, next) {
        try {
            const userId = req.body.user_id;
            const password = req.body.new_password;
            await UserService.updatePassword(security.hashPassword(password), userId);
            next({message: 'Password changed successfully'});
        } catch(e) {
            next(e);
        }
    }
};

module.exports = AuthController;