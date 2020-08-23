import { nanoid } from 'nanoid';
import redis from '~/redis';

export default async (req, res) => {
	const roomId = nanoid();
	const { name } = req.body;
	await redis.hmset(`room:${roomId}`, { name });
	res.json({ roomId });
}
