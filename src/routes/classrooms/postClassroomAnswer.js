import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const { classroomId, questionId } = req.params;
	const { answer } = req.body;
	const userId = req.user.id;
	const answerId = nanoid();
	await redis.hmset(`classroom:${classroomId}:question:${questionId}:answer:${answerId}`, {
		upvotes: 0,
		answer,
		authorId: userId,
	});
	await redis.sadd(`classroom:${classroomId}:question:${questionId}:answer-ids`, answerId);
	await redis.publish(`classroom:${classroomId}:answer-posted`, {
		questionId,
		answer,
		authorId: userId,
	});
	res.sendStatus(200);
}
