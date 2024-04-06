module.exports = class BaseError extends Error {
    constructor(name, errorStatus, isOperational, description, stack) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = errorStatus;
        this.code = errorStatus;
        this.isOperational = isOperational;
        Error.captureStackTrace(stack || this);
        // if(envs.isDev() || envs.isStaging()) {
        // } else {
        //     // Production
        //     /**
        //      * For production do not send any stack trace
        //      */
        //     Error.captureStackTrace({});
        // }
    }
}