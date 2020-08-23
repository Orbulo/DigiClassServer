import redis from '~/redis';

export default async (req, res) => {
	const userId = req.user.id;
	const { classroomId } = req.body;
	if (await redis.exists(`classroom:${classroomId}`)) {
		if (await redis.sismember(`user:${userId}:classroom-ids`, classroomId)) {
			throw new Error('Already a member!');
		}
		await redis.sadd(`user:${userId}:classroom-ids`, classroomId);
		await redis.sadd(`classroom:${classroomId}:user-ids`, userId);
		await redis.hmset(`classroom:${classroomId}:user:${userId}`, {
			reputation: 0,
		});
		res.json(await redis.hgetall(`classroom:${classroomId}`));
	} else {
		throw new Error('Classroom not found.');
	}
}
