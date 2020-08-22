import Redis from 'ioredis';

Redis.Command.setArgumentTransformer("publish", function (args) {
	return [args[0], JSON.stringify(args[1])];
});

const redis = new Redis(process.env.REDIS_URL);

export default redis;
