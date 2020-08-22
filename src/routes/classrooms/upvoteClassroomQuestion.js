import redis from '~/redis';

export default async (req, res) => {
	const { classroomId, questionId } = req.params;
	const upvotes = await redis.hincrby(`classroom:${classroomId}:question:${questionId}`, 'upvotes', 1);
	await redis.publish(`classroom:${classroomId}:question-upvoted`, {
		questionId,
		upvotes,
	});
	res.sendStatus(200);
}
