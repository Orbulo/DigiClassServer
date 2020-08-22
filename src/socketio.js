import { psubscribeTo } from '~/redis';

export default function onConnection(socket) {
	const videoGrid = document.getElementById('video-grid') //from ejs file that has script tags pointing to peer and js files
	const peer = new peer(undefined, {
		host: '/',
		port: '5000'
	})
	const myVideo = document.createElement('video')
	myVideo.muted = true
	const peers = {}
	navigator.mediaDevices.getUserMedia({//telling browser that mic and cam are needed
		video: true,
		audio: true
	}).then(stream => {
		addVideoStream(myVideo, stream)
		myPeer.on('call', call => {//allows a user to "pick up" a call and adds their other's video to theirs
			call.answer(stream)
			const video = document.createElement('video')
			call.on('stream', userVideoStream => {
				addVideoStream(video, userVideoStream)
			})
		})

		socket.on('user-connected', userId => {
			connectToNewUser(userId, stream)
		})
	})

	socket.on('user-disconnected', userId => {
		if (peers[userId]) peers[userId].close()//removes the stream of the person who left
	})

	myPeer.on('open', id => {
		socket.emit('join-room', ROOM_ID, id)//join the room, ROOM_ID is from the ejs file
	})

	function connectToNewUser(userId, stream) {//connect new user
		const call = myPeer.call(userId, stream)
		const video = document.createElement('video')
		call.on('stream', userVideoStream => {
			addVideoStream(video, userVideoStream)
		})
		call.on('close', () => {
			video.remove()
		})

		peers[userId] = call
	}

	function addVideoStream(video, stream) {//add a new video
		video.srcObject = stream
		video.addEventListener('loadedmetadata', () => {
			video.play()
		})
		videoGrid.append(video)
	}
	socket.on('disconnect', () => {//disconnect user
		console.log('User disconnected.');
	});

	//stuff from before
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
