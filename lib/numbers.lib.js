const NumberLib = {
    generateRandomNumber(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    },
    /**
     * 
     * @param {number} number 
     * @param {boolean} positify 
     * @returns {string | number}
     */
    appendZero(number, positify = true) {
        if (number < 10) {
            if (number < 0) {
                if(positify) {
                    number = Math.abs(number);
                    return NumberLib.appendZero(number);
                } else {
                    if(number < -9) {
                        return number;
                    }
                    const str = number + "";
                    return `-0${str.split("-").pop()}`;
                }
            }
            return "0" + number;
        }
        return number;
    },
    getNumberSuffix(number) {
        let suffix = '';
        if (number === 1 || number === 21 || number === 31) {
            suffix = 'st';
        } else if (number === 2 || number === 22) {
            suffix = 'nd';
        } else if (number === 3 || number === 23) {
            suffix = 'rd';
        } else {
            suffix = 'th';
        }
        return suffix;
    }
};

module.exports = NumberLib;