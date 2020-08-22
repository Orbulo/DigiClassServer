import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const classroomId = nanoid();
	const { name, code } = req.body;
	await redis.hmset(`classroom:${classroomId}`, {
		name,
		code,
	});
	res.json({ classroomId });
}
