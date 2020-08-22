import db from '~/db';
import bcrypt from 'bcrypt';
import redis from '~/redis';
import { nanoid } from 'nanoid';

export default async (req, res) => {
	const { email, password, fullName } = req.body;

	const passwordHash = await bcrypt.hash(password, 10);
	await db.query(`
		insert into account (email, password_hash) values ($1, $2)
	`, [passwordHash]);
	const userId = nanoid();
	await redis.hmset(`user:${userId}`, {
		avatarUrl: '',
		name: fullName,
	});
	res.json({ token: JWT.sign({ id: userId }, process.env.APP_SECRET)});
}
