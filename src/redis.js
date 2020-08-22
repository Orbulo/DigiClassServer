import Redis from 'ioredis';

Redis.Command.setArgumentTransformer("publish", function (args) {
	return [args[0], JSON.stringify(args[1])];
});

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
