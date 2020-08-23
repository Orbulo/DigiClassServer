import redis from '~/redis';

export default async (req, res) => {
	const { roomId } = req.params;
	if (!await redis.exists(`room:${roomId}`)) {
		throw new Error('Room not found.');
	}
	const roomData = await redis.hgetall(`room:${roomId}`);
	await res.json(roomData);
}
