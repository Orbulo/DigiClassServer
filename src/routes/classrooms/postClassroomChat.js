import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const { classroomId } = req.params;
	const userId = req.user.id;
	const { message } = req.body;
	const messageId = nanoid();
	await redis.hmset(`classroom:${classroomId}:chat-message:${messageId}`, {
		userId,
		message,
	});
	await redis.rpush(`classroom:${classroomId}:chat-messages`, messageId);
	await redis.publish(`classroom:${classroomId}:chat-message-posted`, {
		userId,
		message,
	});
	res.sendStatus(200);
};
