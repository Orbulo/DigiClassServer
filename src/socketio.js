import Redis from 'ioredis';
import camelcase from 'camelcase';

export default function onConnection(socket) {
	let currentClassroomId;
	const sub = new Redis(process.env.REDIS_URL);

	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('connectToClassroom', async (classroomId) => {
		await sub.punsubcribe(`classroom:${currentClassroomId}:*`);
		currentClassroomId = classroomId;
		sub.psubscribe(`classroom:${classroomId}:*`);
		sub.on('pmessage', (pattern, channel, msg) => {
			console.log(pattern, channel, msg);
			const topic = channel.split(':').pop();
			socket.to(classroomId).broadcast.emit(camelcase(topic, { pascalCase: true }), JSON.parse(msg));
		});
	});

	socket.on('joinRoom', (roomId, userId) => {
		socket.join(roomId)
		socket.to(roomId).broadcast.emit('userConnected', userId)

		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('userDisconnected', userId)
		});
	})
}
