import { nanoid } from 'nanoid';

export default async (req, res) => {
	const roomId = nanoid();
	res.json({ roomId });
}
