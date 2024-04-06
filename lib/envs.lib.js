const AppConfig = require("../config/app.config");

module.exports = {
    /**
     * Returns true if the environment is running in production.
     * 
     * Key:- NODE_ENV
     * @returns {boolean}
     */
    isProd(){
        return process.env.NODE_ENV === 'production';
    },
    /**
     * Returns true if the environment is running in development.
     * 
     * Key:- NODE_ENV
     * @returns {boolean}
     */
    isDev(){
        return process.env.NODE_ENV === 'development';
    },
    /**
     * Returns true if the environment is running in staging.
     * 
     * Key:- NODE_ENV
     * @returns {boolean}
     */
    isStaging(){
        return process.env.NODE_ENV === 'staging';
    },
    /**
     * Returns true if the stack trace is enabled.
     * 
     * Key:- PRINT_STACK_TRACE
     * @returns {boolean}
     */
    isStackTraceEnabled(){
        return process.env.PRINT_STACK_TRACE === 'true';
    },
    /**
     * Returns true if the encrypt is enabled.
     * 
     * Key:- USE_ENCRYPTED_PIPE
     * @returns {boolean}
     */
    useEncryptedPipe(){
        return process.env.USE_ENCRYPTED_PIPE === 'true';
    },
    /**
     * Returns the frontend url of the server App
     * 
     * Key:- APP_FRONTEND_URL
     * 
     * Returns from env if not found then find in app_frontend_url in the app config.
     * @returns {string} the frontend url of the APP
     */
    getFrontEndUrl() {
        return process.env.APP_FRONTEND_URL || AppConfig.app_frontend_url;
    },
    isSecureRedis() {
        return process.env.REDIS_PASSWORD_PROTECTED === 'true';
    },
    isSecureRedis() {
        return process.env.REDIS_PASSWORD_PROTECTED === 'true';
    },
    isRedisEnable() {
        return process.env.REDIS_ENABLE === 'true';
    },
    getAWSUrl() {
        return process.env.AWS_URL;
    },
    getAWSAccessKeyId() {
        return process.env.AWS_ACCESS_KEY_ID;
    },
    getAWSSecretAccessKey() {
        return process.env.AWS_SECRET_ACCESS_KEY;
    },
    getAWSRegion() {
        return process.env.AWS_REGION;
    },
    getAWSBucket() {
        return process.env.AWS_BUCKET;
    },
    getAWSACL() {
        return process.env.AWS_ACL;
    },
    isMailSecure(){
        return process.env.MAIL_SECURE === 'true';
    }
};