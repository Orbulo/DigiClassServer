import db from '~/db';
import bcrypt from 'bcrypt';
import camelcaseKeys from 'camelcase-keys';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
	const { email, password } = req.body;

	const { rows } = await db.query(`
		select password_hash, user_id from account where email = $1;
	`, [email]);
	const { passwordHash, userId } = camelcaseKeys(rows[0]);

	if (await bcrypt.compare(password, passwordHash)) {
		res.json({ token: jwt.sign({ id: userId }, process.env.APP_SECRET)});
	}
}
