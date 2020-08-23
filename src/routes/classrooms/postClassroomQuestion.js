import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const { classroomId } = req.params;
	const userId = req.user.id;
	const { title, content } = req.body;
	const questionId = nanoid();
	await redis.sadd(`classroom:${classroomId}:question-ids`, questionId);
	await redis.hmset(`classroom:${classroomId}:question:${questionId}`, {
		id: questionId,
		upvotes: 0,
		title,
		content,
		userId,
	});
	res.sendStatus(200);
}
