const redis = require('redis');

// Redis configuration options
const redisConfig = {
  url: 'redis://red-cjds7cavvtos73bpvvn0:6379'
};

// Create a Redis client
const client = redis.createClient(redisConfig);

// Event listeners for Redis client
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

// Export the Redis client
module.exports = client;
