import redis from '~/redis';

export default async (req, res, next) => {
	const { classroomId } = req.params;
	if (classroomId) {
		if (!await redis.exists(`classroom:${classroomId}`)) {
			throw new Error(`Classroom ${classroomId} does not exist.`);
		}

		const userId = req.user.id;
		if (!await redis.sismember(`user:${userId}:classroom-ids`, classroomId)) {
			throw new Error(`User ${userId} is not part of classroom ${classroomId}`);
		}
	}
	next();
}
