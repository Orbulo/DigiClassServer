import redis from '~/redis';

export default async (req, res) => {
	const { roomId } = req.params;
	const roomData = await redis.hgetall(`room:${roomId}`);
	if (!roomData) {
		throw new Error(`Room ${roomId} not found.`);
	}
	res.json(roomData);
}
