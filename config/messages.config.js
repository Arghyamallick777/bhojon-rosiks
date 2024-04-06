/**
 * This section is being used in the SMS message template
 */
const Messages = {
    auth_login: 'Hi, Your OTP for login is {{otp}}',
    auth_registration: 'Hi, Your OTP for registration is {{otp}}',
    auth_forget_password_otp: 'Hi, Your OTP for forget password is {{otp}}. Please do not share the OTP with anyone.',
    auth_forget_password_link: 'Hi, Your reset password link is {{link}}. Please click on the same to change the password. The link is valid for 5 minutes.'
    // Keep adding the keys and text
};
module.exports = Messages;