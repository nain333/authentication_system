require('dotenv').config()
console.log(process.env.redisUrl)
// const Redis = require('ioredis');

// // Redis configuration options
// const redisConfig = {
//   host: process.env.redisUrl,
//   port: 6379, // Default Redis port
  
// };

// // Create an ioredis instance
// const redis = new Redis(redisConfig);
// console.log('Instance created: ',redis)

// // Test the connection
// redis.ping().then(() => {
//   console.log('Connected to Redis');
// }).catch(error => {
//   console.error('Error connecting to Redis:', error);
// });

// Use the 'redis' instance to interact with your Redis server



const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.redisUrl,
    port: 6379
})

redis.on('connect', ()=>{
    console.log("Successfully Connected to Redis!");
})

redis.on('error', (error)=>{
    console.log("Error Connecting to the Redis Server!",error);
})

module.exports = redis;