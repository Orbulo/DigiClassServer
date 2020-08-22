import redis from '~/redis';

export default async (req, res) => {
	const userId = req.user.id;
	const classroomIds = await redis.smembers(`user:${userId}`, 'classrooms-ids');
	res.json(await Promise.all(classroomIds.map(async (classroomId) => {
		return await redis.hgetall(`classroom:${classroomId}`)
	})));
}
