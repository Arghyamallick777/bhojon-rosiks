const {envs} = require('../lib');
module.exports = {
    handleFinalResponse(data, req, res, next) {
        if(data && data.error) {
            // This is just for a fail safe test.
            // This will never get called
            return res.status(500).send(data);
        }
        let response = {
            error: false,
            status: 200,
            message: data.message || 'Success',
            data: data,
        };
        delete data['message'];
        if(envs.useEncryptedPipe()) {
            response = Lib.encryptAES(JSON.stringify(response));
        }
        res.status(200).send(response);
    }
}