import Redis from 'ioredis';

export default function onConnection(socket) {
	let currentClassroomId;
	const sub = new Redis(process.env.REDIS_URL);

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('connect-to-classroom', async (classroomId) => {
		await sub.punsubcribe(`classroom:${currentClassroomId}`);
		currentClassroomId = classroomId;
		sub.psubscribe(`classroom:${classroomId}:*`, (channel, msg) => {
			console.log(channel, msg);
		});
	});
}
