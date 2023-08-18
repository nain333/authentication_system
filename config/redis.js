const redis=require('redis')
const createClient=redis.createClient

const client = createClient({
    url:'redis://red-cjds7cavvtos73bpvvn0:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

const redisConnection=client.connect();
module.exports=redisConnection