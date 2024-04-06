const fs = require('fs');
const {StringLib, NumberLib, DateLib, security} = require('../../../lib');
const AppConfig = require('../../../config/app.config');
const MessageConfig = require('../../../config/messages.config');
const NotificationService = require('./notification.service');
const AuthService = require('./auth.service');

const {Otp} = require('../db/models');
const enumConfig = require('../../../config/enum.config');

const OtpService = {
    async sendOtp(emailOrPhone, reason, optionalReplacer = {}) {
        const otp = this.generateOtp();
        const templateFormat = AppConfig.notification_templates.find(n => n.key === reason);
        if(!templateFormat) throw new Error("No Template found");
        if(StringLib.isEmail(emailOrPhone)) {
            // send otp to email
            /**
             * 1. Select the template
             * 2. Replace the otp
             * 3. send through email
             */
            const template = templateFormat.template || 'generic.template.html';
            const pathOfTemplate = AppConfig.template_path || `${__dirname}/../../../templates`;

            const fullPath = `${pathOfTemplate}/${template}`;
            let templateData = fs.readFileSync(fullPath, {encoding: 'utf-8'});
            // replace the data
            if(!optionalReplacer) optionalReplacer = {};
            optionalReplacer.otp = otp;
            for(const [key, value] of Object.entries(optionalReplacer)) {
                const regEx = new RegExp(`{{${key}}}`, 'g');
                if(regEx.test(templateData) && value) {
                    templateData = templateData.replace(new RegExp(`{{${key}}}`, 'g'), value);
                }
            }
            let subject = '';
            switch(reason) {
                case 'auth_registration':
                    subject = 'OTP for registration';
                break;
                case 'auth_login':
                    subject = 'OTP for Login';
                break;
            }
            // now send the email
            NotificationService.sendEmail({body:templateData, text: templateData,  to:emailOrPhone, subject: subject || 'New OTP'}).then(r => {}).catch(err => {console.log(err)});
        } else if(StringLib.isPhone(emailOrPhone)) {
            // send to the phone
            /**
             * 1. Select the message template
             * 2. Replace the otp
             * 3. Send through SMS
             */
            let message = MessageConfig[templateFormat.key];
            if(!message) throw new Error("Message feed is invalid");
            if(!optionalReplacer) optionalReplacer = {};
            optionalReplacer.otp = otp;
            for(const [key, value] in Object.entries(optionalReplacer)) {
                message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
            NotificationService.sendSMS(message, emailOrPhone);
        }
        return otp;        
    },
    generateOtp() {
        return AppConfig.otp_alpha_numeric ?
        StringLib.generateRandomStrings(AppConfig.otp_length).toUpperCase() :
        NumberLib.generateRandomNumber(AppConfig.otp_length);
    },
    async createOtp(otp, userId, reason, expTime=process.env.OTP_TOKEN_EXP_TIME) {
        const otpData = {
            otp: otp,
            token_id: security.generateToken(),
            user_id: userId,
            reason: reason,
            exp_time: DateLib.modifyAKADate(new Date(), expTime ? `+${expTime}` : '+5min')
        };
        return await Otp.create(otpData);
    },
    async getOtpByTokenId(tokenId) {
        return await Otp.findOne({
            where: {
                token_id: tokenId
            }
        });
    },
    async getResponseBasedOnOtpTrigger(otpRes) {
        if(!otpRes.reason) return null;
        switch(otpRes.reason) {
            case 'auth_login':
                // create a session based on the user id
                return await AuthService.createSessionFromUserId(otpRes.user_id);
            case 'auth_registration':
                if(AppConfig.login_after_registration) {
                    const session = await AuthService.createSessionFromUserId(otpRes.user_id);
                    return {login_flow: true, ...session};
                } else {
                    return {login_flow: false};
                }
            case 'auth_forget_password_otp':
                /**
                 * 1. Get the user id 
                 * 2. Create a change password session token with the user id
                 * 3. return 
                 */
                if(!otpRes.user_id) return null;
                return {token: security.encrypt(JSON.stringify({_id: otpRes.user_id, timestamp: Date.now()}))};
            // TODO add more cases here
        }
    },
    async invalidateOtp(id) {
        return await Otp.updateOne({invalidate: enumConfig.OTP_INVALIDATE.INVALID}, {_id: id});
    }
};

module.exports = OtpService;