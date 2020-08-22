import redis from '~/redis';

export default async (req, res) => {
	const userId = req.user.id;
	const classroomIds = await redis.smembers(`user:${userId}`, 'classroom-ids');
	return Promise.all(classroomIds.map(async (classroomId) =>
		await redis.hgetall(`classroom:${classroomId}`
	)));
}
