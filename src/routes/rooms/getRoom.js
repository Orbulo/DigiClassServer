import redis from '~/redis';

export default async (req, res) => {
	const { roomId } = req.params;
	if (!await redis.exists(roomId)) {
		return await res.json({ exists: false });
	}
	const roomData = await redis.hgetall(`room:${roomId}`);
	await res.json(roomData);
}
