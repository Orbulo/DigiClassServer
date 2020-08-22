import redis from '~/redis';

export default async (req, res) => {
	res.json(await redis.hgetall(`classroom:${req.params.classroomId}`));
}
