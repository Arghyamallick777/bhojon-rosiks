const StringLib = {
    /**
     * 
     * @param {string} email 
     * @returns {boolean}
     */
    isEmail(email) {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test(email);
    },
    /**
     * 
     * @param {string | number} phone 
     * @returns {boolean}
     */
    isPhone(phone) {
        const regexExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
        return regexExp.test(phone);
    },
    /**
     * 
     * @param {number} length 
     * @returns {string}
     */
    generateRandomStrings(length) {
        const arr = "0123456789abcdefghijklmnopqrstuvwxyz";
        let str = '';
        for (let i = length; i > 0; i--) {
            str +=
                arr[(Math.floor(Math.random() * arr.length))];
        }
        return str;
    },
    /**
     * Check to see if a string is actualy a valid JSON
     * @param {string} str 
     * @returns {boolean}
     */
    isJsonParsable(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
};

module.exports = StringLib;