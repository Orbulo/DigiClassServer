import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const classroomId = nanoid(8);
	const { name, courseCode } = req.body;
	const userId = req.user.id;
	await redis.hmset(`classroom:${classroomId}`, {
		name,
		courseCode,
	});
	await redis.sadd(`user:${userId}:classroom-ids`, classroomId);
	res.json({ classroomId });
}
