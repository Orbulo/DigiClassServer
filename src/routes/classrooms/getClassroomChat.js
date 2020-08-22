import redis from '~/redis';
import {checkClassroom} from '~/utils';

export default async (req, res) => {
	const { classroomId } = req.params;
	await checkClassroom(classroomId);
	const chatMessageIds = await redis.lindex(`classroom:${classroomId}:chat-messages`, 0, -1);
	res.json(await Promise.all(chatMessageIds.map(async (chatMessageId) => {
		return await redis.hgetall(`classroom:${classroomId}:chat-message:${chatMessageId}`);
	})));
}
