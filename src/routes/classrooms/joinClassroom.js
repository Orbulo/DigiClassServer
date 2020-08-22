import redis from '~/redis';
import {checkClassroom } from 'utils';

export default async (req, res) => {
	const userId = req.user.id;
	const {classroomId} = req.body;
	await checkClassroom(classroomId);
	if (await redis.exists(`classroom:${classroomId}`)) {
		await redis.sadd(`user:${userId}:classroom-ids`, classroomId);
		await redis.sadd(`classroom:${classroomId}:user-ids`, userId);
		res.sendStatus(200);
	} else {
		throw new Error('Classroom not found.');
	}
}
