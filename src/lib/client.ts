import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('🚩 Redis connection error:', err);
});

redisClient.connect();

export default redisClient;
