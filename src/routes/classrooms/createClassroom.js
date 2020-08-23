import redis from '~/redis';
import { customAlphabet } from 'nanoid';

const generateClassroomId = customAlphabet('2346789ABCDEFGHJKLMNPQRTUVWXYZabcdefghijkmnpqrtwxyz', 8);

export default async (req, res) => {
	const classroomId = generateClassroomId();
	const { name, courseCode } = req.body;
	const userId = req.user.id;
	await redis.hmset(`classroom:${classroomId}`, {
		id: classroomId,
		name,
		courseCode,
	});
	await redis.sadd(`user:${userId}:classroom-ids`, classroomId);
	res.json({ classroomId });
}
