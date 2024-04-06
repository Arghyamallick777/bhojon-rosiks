const NumberLib = require('./numbers.lib');
const DateLib = {
    /**
     * Modify the date by the numstr parameter and returns the new date.
     * 
     * Possbile Formats:-
     * 
     * days - d, days, day
     * 
     * month - m, months, month
     * 
     * year - y, years, year
     * 
     * hour - h, hours, hour
     * 
     * minute - i, min, minutes, minute
     * 
     * second - s, sec, seconds, second
     * @param {Date} dateToConvert 
     * @param {string} numstr is the format to which the date to be modified. 
     * Just add + or - to add or subtract the days, months, years, hour, minute, seconds. For example:- if you want to add 5 hour to the current date just pass +5h
     * @returns {Date}
     */
    modifyAKADate(dateToConvert, numstr) {
        const date = new Date(dateToConvert.valueOf());
        if (typeof numstr === 'undefined' || numstr === '' || numstr.length === 0) return date;
        let operator = numstr.trim();
        operator = operator.substring(0, 1);
        numstr = numstr.replace(operator, "");
        let num = parseInt(numstr.replace(/\D+$/g, ""));
        if (isNaN(num)) {
            return date;
        }
        let str = numstr.replace(/[0-9]/g, '');
        str = str.trim();
        switch (str.toLowerCase()) {
            case 'days':
            case 'day':
            case 'd':
                if (operator === '+') {
                    date.setDate(date.getDate() + num);
                } else if (operator === "-") {
                    date.setDate(date.getDate() - num);
                }
                break;
            case 'months':
            case 'month':
            case 'm':
                if (operator === '+') {
                    date.setMonth(date.getMonth() + num);
                } else if (operator === "-") {
                    date.setMonth(date.getMonth() - num);
                }
                break;
            case "years":
            case "year":
            case 'y':
                if (operator === '+') {
                    date.setFullYear(date.getFullYear() + num);
                } else if (operator === "-") {
                    date.setFullYear(date.getFullYear() - num);
                }
                break;
            case "hours":
            case "hour":
            case 'h':
                if (operator === '+') {
                    date.setHours(date.getHours() + num);
                } else if (operator === "-") {
                    date.setHours(date.getHours() - num);
                }
                break;
            case "minutes":
            case "mintue":
            case "min":
            case 'i':
                if (operator === '+') {
                    date.setMinutes(date.getMinutes() + num);
                } else if (operator === "-") {
                    date.setMinutes(date.getMinutes() - num);
                }
                break;
            case "seconds":
            case "second":
            case "sec":
            case 's':
                if (operator === '+') {
                    date.setSeconds(date.getSeconds() + num);
                } else if (operator === "-") {
                    date.setSeconds(date.getSeconds() - num);
                }
                break;
            default:
                return date;
        }
    
        return date;
    },
    /**
     * 
     * @param {Date} date The date to format 
     * @param {string} format the format to convert to
     * @param {boolean} utc if true then the formatted date will be return in UTC
     * @returns {string} the formatted date as string
     */
    formatDate(date, format, utc = false) {
        let formatResult = "";

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // Get the UTC
        if(utc) {
            year = date.getUTCFullYear();
            month = date.getUTCMonth() + 1;
            day = date.getUTCDate();

            hour = date.getUTCHours();
            minutes = date.getUTCMinutes();
            seconds = date.getUTCSeconds();
        }
        const MONTHS = [
            { long: 'January', short: 'Jan' },
            { long: 'February', short: 'Feb' },
            { long: 'March', short: 'Mar' },
            { long: 'April', short: 'Apr' },
            { long: 'May', short: 'May' },
            { long: 'June', short: 'Jun' },
            { long: 'July', short: 'Jul' },
            { long: 'August', short: 'Aug' },
            { long: 'September', short: 'Sep' },
            { long: 'October', short: 'Oct' },
            { long: 'November', short: 'Nov' },
            { long: 'December', short: 'Dec' },
        ];
        const WEEK_DAYS = [
            { long: 'Sunday', short: 'Sun' },
            { long: 'Monday', short: 'Mon' },
            { long: 'Tuesday', short: 'Tue' },
            { long: 'Wednesday', short: 'Wed' },
            { long: 'Thursday', short: 'Thu' },
            { long: 'Friday', short: 'Fri' },
            { long: 'Saturday', short: 'Sat' },
        ];
        const KEYWORDS = [
            'Y', 'y', 'm', 'M', 'd', 'D',
            // Word
            'mm', // Short month 
            'MM', // Long moth
            'dd', // Short day
            'DD', // Long day
            // Time
            'H', // => 24 Hour
            'h', // => 12 Hour
            'i', // => Minute
            's', // => Seconds
        ];
        // calculate based on the format
        let yearLength = 0;
        let monthLength = 0;
        let dayLength = 0;
        let yearStr, monthStr, dayStr;

        format.split('').forEach(char => {
            
        })
        
        
        return formatResult;
    }
};

module.exports = DateLib;