const AppConfig = require("../../../config/app.config");
const MessageConfig = require('../../../config/messages.config');
const {StringLib} = require('../../../lib');
const transporter = require('../../../connectors/nodemailer.connector');
const NotificationService = {
    async sendNotification(userId, payload, templatekey) {
        if(!templatekey) {
            templatekey = 'generic_template';
        }
        if(StringLib.isEmail(userId)) {
            const template = AppConfig.notification_templates.find(n => n.key === templatekey);
            let body = template.template;
            let text = template.text;
            for(const [key, value] of Object.entries(payload)) {
                body = body.replace(new RegExp(`{{${key}}}`, 'g'), value);
                text = text.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
            await NotificationService.sendEmail({to: userId, body: body, text: text, subject: template.subject});
        } else if(StringLib.isPhone(userId)) {
            let text = MessageConfig[templatekey];
            for(const [key, value] of payload) {
                text = text.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
            await NotificationService.sendSMS(text, userId);
        } else {
            throw new Error('User id is not supported');
        }
    },
    async sendEmail({body, text, to, subject}){
        const res = await transporter.sendMail({
            to: to,
            text: text,
            html: body,
            from: process.env.MAIL_NAME,
            subject: subject || 'New Mail'
        });
        return true;
    },
    async sendSMS(message, to) {
        // TODO send SMS
        console.log(message, to);
        return true;
    }
};

module.exports = NotificationService;