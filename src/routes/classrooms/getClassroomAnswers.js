import redis from '~/redis';

export default async (req, res) => {
	const { classroomId, questionId } = req.params;
	const answerIds = await redis.smembers(`classroom:${classroomId}:question:${questionId}:answer-ids`);
	res.json(await Promise.all(answerIds.map(async (answerId) => {
		await redis.hgetall(`classroom:${classroomId}:question:${questionId}:answer:${answerId}`);
	})));
}
