import { psubscribeTo } from '~/redis';

export default function onConnection(socket) {
	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('connect-to-classroom', (classroomId) => {
		psubscribeTo(`classroom:${classroomId}:*`, (channel, msg) => {
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
