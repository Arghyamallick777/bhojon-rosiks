const RedisClient = require('../../../connectors/redis.connector');
const RedisService = {
    async addPublicSession(sessionId, signedObject) {
        try {
            return await RedisClient.json.set(`PSS:${sessionId}`, '$', signedObject);
        } catch(e) {
            console.log(e);
            return null;
        }
    },
    async getAllPublicSession(sessionId) {
        return await RedisClient.json.get(`PSS:${sessionId}`);
    },
    async clearAllPublicSession(sessionId) {
        await RedisClient.json.del(`PSS:${sessionId}`);
    },
    async searchSignature(signature){
        console.log(signature, "SIGNATURE");
        const searchresult = await RedisClient.ft.search('idx:pss', `@signature:(${signature})`);
        return searchresult;
    }
};

module.exports = RedisService;