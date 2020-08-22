import db from '~/db';

export default async (req, res) => {
	const { email, password } = req.body;

	await db.query(`
		select password_hash from account where email = $1;
	`, [email]);

	if (await bcrypt.compare(password, passwordHash)) {
		res.json({ token: JWT.sign({ id }, process.env.APP_SECRET)});
	}
}
