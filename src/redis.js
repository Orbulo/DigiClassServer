import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export function subscribeTo(key, cb) {
	const sub = new Redis(process.env.REDIS_URL);
	sub.subscribe(key, cb);
}

export function psubscribeTo(patt, cb) {
	const sub = new Redis(process.env.REDIS_URL);
	sub.psubscribe(patt, cb);
}

export default redis;
