import redis from '~/redis';
import {checkClassroom} from '~/utils';

export default async (req, res) => {
	const { classroomId } = req.params;
	await checkClassroom(classroomId);
	res.json(await redis.hgetall(`classroom:${classroomId}`));
}
