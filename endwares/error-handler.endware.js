const {envs} = require('../lib');
module.exports = {
    /**
     * Logs the error if any
     * @param {*} error 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    errorLogger(error, req, res, next){
        // Create a log
        if((error && error.error) || error instanceof Error) clog(error, req.path);
        // other log (file or database)
        next(error);
    },
    /**
     * Responds to the client based on the type.
     * @param {*} error 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    errorResponder(error, req, res, next){
        // handle the response of the error
        if (error && error.error && error.type === "redirect"){
            if(!envs.isStackTraceEnabled()) delete error['stack'];
             res.redirect("/error");
          } else if (error && error.type === "time-out") {
            if(!envs.isStackTraceEnabled()) delete error['stack'];
            // arbitrary condition check
            error.message = error.message || "Server Timeout";
            res.status(408).send(error);
          } else {
            if(!envs.isStackTraceEnabled()) delete error['stack'];
            next(error); // forwarding exceptional case to fail-safe middleware. Operational error
          }
    },
    /**
     * Fail safe to response to the client in case of unknown error
     * @param {*} error 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    failSafeHandler(error, req, res, next){
        // send the response to the client
        if((error && error.error) || error instanceof Error){
            // generic handler
            const errObj = {};
            const errorCode = error.code || error.status || error.statusCode || 500;
            errObj.status = errorCode;
            errObj.message = error.message || error.toString() || "Internal Server Error"; 
            errObj.error = true;
            if(envs.isStackTraceEnabled()) errObj.stack = error.stack;
            res.status(errorCode).send(errObj);
          } else {
            // This will proceed to next response handler
            next(error);
          }
    }
}