const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });

const registerUser = async (req, res) => {
	const { username, password, mail } = req.body;

	try {
		const registrationDate = new Date();

		const query = `
        INSERT INTO users (username, password, mail, registrationDate, money, xp)
        VALUES ($1, $2, $3, $4, 0, 0)
        RETURNING *
      `;

		const result = await pool.query(query, [
			username,
			password,
			mail,
			registrationDate,
		]);

		res.status(201).json({
			message: 'User registered successfully',
			user: result.rows[0],
		});
	} catch (error) {
		console.error('Error registering user', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const loginUser = async (req, res) => {
	const { mail, password } = req.body;
	console.log(mail, password);
	try {
		const query = `
      SELECT userId, username, money, xp
      FROM users
      WHERE mail = $1 AND password = $2
    `;
		const result = await pool.query(query, [mail, password]);
		if (result.rows.length === 1) {
			console.log(result.rows[0]);
			const user = result.rows[0];
			res.json({
				userId: user.userid,
				username: user.username,
				money: user.money,
				level: user.xp,
			});
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		console.error('Error logging in', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
const getUsername = async (req, res) => {
	const userId = req.params.userId;

	try {
		const query = `
      SELECT username
      FROM users
      WHERE userId = $1
    `;

		const result = await pool.query(query, [userId]);

		if (result.rows.length === 1) {
			const username = result.rows[0].username;
			res.json({ username });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.error('Error retrieving username', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updatePassword = async (req, res) => {
	const { mail, oldPassword, newPassword } = req.body;

	try {
		const query = `
        UPDATE users
        SET password = $1
        WHERE mail = $2 AND password = $3
        RETURNING *
      `;

		const result = await pool.query(query, [
			newPassword,
			mail,
			oldPassword,
		]);

		if (result.rows.length === 1) {
			const updatedUser = result.rows[0];
			res.json({
				message: 'Password updated successfully',
				user: updatedUser,
			});
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		console.error('Error updating password', error);
		res.status(500).json({ message: 'Invalid credentials' });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUsername,
	updatePassword,
};
