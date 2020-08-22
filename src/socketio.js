import {psubscribeTo} from 'redis';

export default function onConnection(socket) {
	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('connect-to-classroom', (classroomId) => {
		psubscribeTo(`classroom:${classroomId}:*`, (channel, msg) => {
			console.log(channel, msg);
		});
	});
}
