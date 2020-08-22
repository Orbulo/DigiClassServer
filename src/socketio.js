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

	socket.on('disconnect-from-classroom', () => {

	})
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId)
		socket.to(roomId).broadcast.emit('user-connected', userId)

		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('user-disconnected', userId)
		})
	})
}
