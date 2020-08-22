import redis from '~/redis';

export default async (req, res) => {
	const { classroomId } = req.params;
	res.json(await redis.hgetall(`classroom:${classroomId}`));
}
