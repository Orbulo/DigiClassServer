import db from '~/db';
import bcrypt from 'bcrypt';
import redis from '~/redis';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
	const { email, password, fullName } = req.body;

	const userId = nanoid();
	const passwordHash = await bcrypt.hash(password, 10);
	await db.query(`
		insert into account (email, password_hash, user_id) values ($1, $2, $3)
	`, [email, passwordHash, userId]);
	await redis.hmset(`user:${userId}`, {
		avatarUrl: '',
		name: fullName,
	});
	res.json({
		token: jwt.sign({ id: userId }, process.env.APP_SECRET),
		userId,
	});
}
