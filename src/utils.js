import redis from '~/redis';

export async function checkClassroom(classroomId) {
	if (!await redis.exists(`classroom:${classroomId}`)) {
		throw new Error(`Classroom ${classroomId} does not exist.`);
	}
}

