import redis from '~/redis';
import { nanoid } from 'nanoid';
import {checkClassroom} from 'utils';

export default async (req, res) => {
	const { classroomId } = req.params;
	await checkClassroom(classroomId);
	const userId = req.user.id;
	const { message } = req.body;
	const messageId = nanoid();
	await redis.hmset(`classroom:${classroomId}:chat-message:${messageId}`, {
		userId,
		message,
	});
	await redis.rpush(`classroom:${classroomId}:chat-messages`, messageId);
	res.sendStatus(200);
};
