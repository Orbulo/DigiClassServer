import redis from '~/redis';

export default async (req, res) => {
	const userId = req.user.id;
	const { classroomId } = req.body;
	if (await redis.exists(`classroom:${classroomId}`)) {
		await redis.sadd(`user:${userId}:classroom-ids`, classroomId);
		await redis.sadd(`classroom:${classroomId}:user-ids`, userId);
		await redis.hmset(`classroom:${classroomId}:user:${userId}`, {
			reputation: 0,
		});
		await redis.publish(`classroom:${classroomId}:student-joined`, {
			userId,
		});
		res.sendStatus(200);
	} else {
		throw new Error('Classroom not found.');
	}
}
