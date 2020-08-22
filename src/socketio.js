export default function onConnection(socket) {
	socket.on('disconnect', () => {
		console.log('User disconnected.');
	})
}
