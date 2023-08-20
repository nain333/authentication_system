const Redis = require('ioredis');

// Redis configuration options
const redisConfig = {
  host: 'rediss://red-cjds7cavvtos73bpvvn0:8ALjoxstNZgb9CotNIAQpxr45IYWdMBP@singapore-redis.render.com:6379', // Replace with your Redis host provided by Render.com
  port: 6379, // Default Redis port
  // Other configuration options if needed
};

// Create an ioredis instance
const redis = new Redis(redisConfig);

// Test the connection
redis.ping().then(() => {
  console.log('Connected to Redis');
}).catch(error => {
  console.error('Error connecting to Redis:', error);
});

// Use the 'redis' instance to interact with your Redis server
