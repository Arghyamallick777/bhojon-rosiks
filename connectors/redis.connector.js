const Redis = require('redis');

const {envs} = require('../lib');
const chalk = require('chalk');
const redisConfig = {};
if(envs.isSecureRedis()) {
    redisConfig.password = process.env.REDIS_PASSWORD;
}

let client = {};
if(envs.isRedisEnable()) {
  console.log(chalk.yellowBright("Redis service is enabled. Attempting connection..."));
  client = Redis.createClient(redisConfig);

  // hooks to check the connections
  client.on('connect', function() {
      console.log(chalk.bgWhiteBright.green("Redis Service Connected."));
  });
  client.once('error', function(err) {
      console.log(chalk.red("Redis client error when connecting to the redis server."), err);
  });
  (async() => {
      await client.connect();
      client.ft.info("idx:pss").then(async indexInfo => {
        if(!indexInfo) {
          await client.ft.create(
              `idx:pss`,
              {
                '$.signature': {
                  type: Redis.SchemaFieldTypes.TEXT,
                  AS: 'signature',
                },
              },
              {
                ON: 'JSON',
                PREFIX: 'PSS:',
              }
            );
        }
      }).catch(async e => {
        await client.ft.create(
          `idx:pss`,
          {
            '$.signature': {
              type: Redis.SchemaFieldTypes.TEXT,
              AS: 'signature',
            },
          },
          {
            ON: 'JSON',
            PREFIX: 'PSS:',
          }
        );
        console.log("Index Info Error: => ", e);
      });
  })().then(() => {}).catch(e => {console.log(e);});
}
module.exports = client;