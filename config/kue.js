
const kue = require("kue");
const redisClient = require("../config/redis"); // Import the Redis client from redis.js

const queue = kue.createQueue({
    redis: {
        createClientFactory: () => {
            return redisClient;
        }
    }
});

module.exports = queue;

