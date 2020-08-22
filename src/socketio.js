import Redis from 'ioredis';

export default function onConnection(socket) {
	let currentClassroomId;
	const sub = new Redis(process.env.REDIS_URL);

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('connect-to-classroom', async (classroomId) => {
		await sub.punsubcribe(`classroom:${currentClassroomId}:*`);
		currentClassroomId = classroomId;
		sub.psubscribe(`classroom:${classroomId}:*`, (channel, msg) => {
			const topic = channel.split(':').pop();
			console.log(channel, msg);
			socket.to(classroomId).broadcast.emit(camelcase(topic), JSON.parse(msg));
		});
	});

	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId)
		socket.to(roomId).broadcast.emit('user-connected', userId)

		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('user-disconnected', userId)
		})
	})
}
