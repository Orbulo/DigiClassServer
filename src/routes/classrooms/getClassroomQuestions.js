import redis from '~/redis';

export default async (req, res) => {
	const { classroomId } = req.params;
	const questionIds = await redis.smembers(`classroom:${classroomId}:question-ids`);
	res.json(await Promise.all(questionIds.map(async (questionId) => {
		await redis.hgetall(`classroom:${classroomId}:question:${questionId}`);
	})));
}
