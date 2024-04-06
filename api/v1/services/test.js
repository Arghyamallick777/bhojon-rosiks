const RedisService = require('./redis.service');
(async () => {
    await RedisService.addPublicSession('session-01', {
        session_id: 'session-01',
        signature: 'signature-321',
        token: 'eyzzsd'
    });
    await RedisService.addPublicSession('session-00', {
        session_id: 'session-00',
        signature: 'signature-123',
        token: 'eyzzsd'
    });
    await RedisService.addPublicSession('session-02', {
        session_id: 'session-00',
        signature: 'abcdgh-12345',
        token: 'eyzzsd'
    });
    const data = await RedisService.getAllPublicSession('session-01');
    console.log(data);

    const search = await RedisService.searchSignature('abcdgh-1234');
    console.log(search);
})();