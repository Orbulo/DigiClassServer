import redis from '~/redis';
import { getUser } from '~/utils';

export default async (req, res) => {
	const { classroomId, userId } = req.params;
	res.json({
		...(await redis.hgetall(`classroom:${classroomId}:user:${userId}`)),
		...(await getUser(userId)),
	});
}
