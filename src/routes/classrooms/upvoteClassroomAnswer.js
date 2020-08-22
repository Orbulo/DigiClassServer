import redis from '~/redis';

export default async (req, res) => {
	const { classroomId, questionId, answerId } = req.params;
	const upvotes = await redis.hincrby(`classroom:${classroomId}:question:${questionId}:answer:${answerId}`, 'upvotes', 1);
	await redis.publish(`classroom:${classroomId}:answer-upvoted`, {
		answerId,
		upvotes,
	});
	res.sendStatus(200);
}
