// // const redis = require('redis');

// // // Redis configuration options
// // const redisConfig = {
// //   url: 'rediss://red-cjds7cavvtos73bpvvn0:8ALjoxstNZgb9CotNIAQpxr45IYWdMBP@singapore-redis.render.com:6379',
  
// // };
// // console.log('redis config started with redis url: ',redisConfig.url)
// // // Create a Redis client
// // const client = redis.createClient(redisConfig);
// // console.log("client added: ",client)
// // // Event listeners for Redis client
// // client.once('connect', () => {
// //   console.log('Connected to Redis');
// // });

// // client.on('error', (error) => {
// //   console.error('Error connecting to Redis:', error);
// // });
// // console.log('exporting the connection')

// // // Export the Redis client
// // module.exports = client;
// const redis = require('redis');

// // Redis configuration options
// const redisConfig = {
//   url: 'rediss://red-cjds7cavvtos73bpvvn0:8ALjoxstNZgb9CotNIAQpxr45IYWdMBP@singapore-redis.render.com:6379',
//   host: 'red-cjds7cavvtos73bpvvn0'
// };
// console.log('redis config started with redis url: ',redisConfig.url)

// // Create a Redis client
// const client = redis.createClient(redisConfig);
// console.log("client added: ",client)

// // Event listeners for Redis client
// client.once('connect', () => {
//   console.log('Connected to Redis');
// });

// client.on('error', (error) => {
//   console.error('Error connecting to Redis:', error);
// });

// console.log('exporting the connection')

// // Export the Redis client
// module.exports = client;

// // Add the async function to connect
// (async () => {
//   await client.connect();
// })();
const redis = require('redis');

// Redis configuration options
// const redisURL = 'rediss://red-cjds7cavvtos73bpvvn0:8ALjoxstNZgb9CotNIAQpxr45IYWdMBP@singapore-redis.render.com:6379';
const redisURL = 'redis://red-cjds7cavvtos73bpvvn0:6379'
const redisOptions = {
  url: redisURL,
};

// Create a Redis client using the URL as the configuration
const client = redis.createClient(redisOptions);

// Event listeners for Redis client
client.once('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

// Export the Redis client
module.exports = client;
