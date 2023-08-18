const redis = require('redis');

// Redis configuration options
const redisConfig = {
  url: 'redis://red-cjds7cavvtos73bpvvn0:6379',
  host: 'red-cjds7cavvtos73bpvvn0'
};
console.log('redis config started with redis url: ',redisConfig.url)
// Create a Redis client
const client = redis.createClient(redisConfig);
console.log("client added: ",client)
// Event listeners for Redis client
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});
console.log('exporting the connection')

// Export the Redis client
module.exports = client;
