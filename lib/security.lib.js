const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const AppConfig = require('../config/app.config');

const Security = {
    // Collected
    /**
     * This will encypt the data.
     * 
     * For server related use only
     * @param {string} rawdata 
     * @returns {string} encrypted string
     */
    encrypt(rawdata) {
        if (!rawdata) return "";
        try {
            const cipher = crypto.createCipheriv(process.env.CRYPTO_ENC_ALGO,
                process.env.SECRET_KEY,
                process.env.INIT_VECTOR);
            let encryptedData = cipher.update(rawdata, "utf-8", "hex");
            encryptedData += cipher.final('hex');
            return encryptedData;
        }catch (e) {
            console.log(e)
            return "";
        }
    },
    /**
     * Decrypted the encrypted text.
     * 
     * Only for server use
     * @param {string} encryptdata 
     * @returns {string} return the decrypted data in string format
     */
    decrypt(encryptdata) {
        if (!encryptdata) return "";
        try {
            const cipher = crypto.createDecipheriv(process.env.CRYPTO_ENC_ALGO, process.env.SECRET_KEY, process.env.INIT_VECTOR);
            let decryptedData = cipher.update(encryptdata, "hex", "utf-8");
            decryptedData += cipher.final('utf-8');
            return decryptedData;
        } catch (e) {
            this.log(e.stack, "DECRYPT001");
            return "";
        }
    },
    /**
     * Encrypt the data with AES algo. Compatible with the frontend framework. Angular and React JS
     * @param {string} data 
     * @returns {string} The encrypted data
     */
    encryptAES(data) {
        try {
            if(!data) return "";
            const secret = process.env.ENCRYPTION_KEY;
            const salt = CryptoJS.lib.WordArray.random(128 / 8);
            const iv = CryptoJS.lib.WordArray.random(128 / 8);
    
            const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.PBKDF2(secret, salt, {
                keySize: 256 / 32,
                iterations: 100
            }) /* key */, {iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC})
            const transitmessage = salt.toString() + iv.toString() + encrypted.ciphertext.toString();
            return encodeURIComponent(transitmessage);
        } catch(e) {
            this.clog(e);
            return "";
        }
    },
    /**
     * Decrypt the data with frontend compatibility
     * @param {string} encryptedData 
     * @returns {string} Decrypted data
     */
    decryptAES(encryptedData) {
        try {
            const text = decodeURIComponent(encryptedData);
            const secret = process.env.ENCRYPTION_KEY;
    
            const key = CryptoJS.PBKDF2(secret, CryptoJS.enc.Hex.parse(text.substring(0, 32)) /* Salt */, {
                keySize: 256 / 32,
                iterations: 100
            });
            let cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Hex.parse(text.substring(64))
            });
            const decrypted = CryptoJS.AES.decrypt(cipherParams/*text.substring(64)*/ /* encrypted */, key, {
                iv: CryptoJS.enc.Hex.parse(text.substring(32, 64)) /* iv */,
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
    
        } catch(e) {
            return "";
        }
    },
    hashPassword(password) {
        return AppConfig.hash_password ? Security.generateHash(password) : password;
    },
    generateHash(data) {
        return crypto.createHash(AppConfig.hash_algo || 'sha256').update(data).digest('hex');
    },
    generateAccessToken(userData, forOtp = false, expiresIn = null) {
        const option = expiresIn ? { expiresIn: expiresIn } : (forOtp ? {expiresIn: process.env.OTP_TOKEN_EXP_TIME} : {expiresIn: process.env.AUTH_ACCESS_TOKEN_EXP_TIME});
        userData.type = 'access';
        return this.encrypt(jwt.sign(userData, process.env.JWT_SECRET_KEY, option));
    },
    generateRefreshToken(userData, forOtp = false, expiresIn = null){
        const key = forOtp ? 'otp_refresh_token' : 'login-auth';
        const option = expiresIn ? {expiresIn: expiresIn} : (forOtp ? {expiresIn: process.env.OTP_REFRESH_TOKEN_EXP_TIME} : {expiresIn: process.env.AUTH_REFRESH_TOKEN_EXP_TIME});
        userData.type = 'refresh';
        return this.encrypt(jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET_KEY, option));
    },
    generateToken(length = 8){
        return crypto.randomBytes(length).toString('hex').toUpperCase();
    },
    validateToken(token) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    }
};
module.exports = Security;