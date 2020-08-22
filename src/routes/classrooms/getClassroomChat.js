import redis from '~/redis';

export default async (req, res) => {
	const { classroomId } = req.params;
	const chatMessageIds = await redis.lindex(`classroom:${classroomId}:chat-messages`, 0, -1);
	res.json(await Promise.all(chatMessageIds.map(async (chatMessageId) => {
		return await redis.hgetall(`classroom:${classroomId}:chat-message:${chatMessageId}`);
	})));
}
