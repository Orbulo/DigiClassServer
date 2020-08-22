import redis from '~/redis';

export async function getUser(userId) {
	return await redis.hgetall(`user:${userId}`);
}

