import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const { classroomId } = req.params;
	checkClassroom(classroomId);
	const userId = req.user.id;
	const { question } = req.body;
	const reputation = await redis.hget(`classroom:${classroomId}:user:${userId}`, 'reputation');
	const questionId = nanoid();
	await redis.sadd(`classroom:${classroomId}:question-ids`, questionId);
	await redis.hmset(`classroom:${classroomId}:question:${questionId}`, {
		upvotes: 0,
		question,
		authorId: userId,
	});
	await redis.publish(`classroom:${classroomId}:question-posted`, {
		question,
		authorId: userId,
	})
}
