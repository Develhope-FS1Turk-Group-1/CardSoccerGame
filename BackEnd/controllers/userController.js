const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')

const registerUser = async (req, res) => {
	const { username, password, mail } = req.body;

	try {
		const registrationDate = new Date();

		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) {
				res.status(500).json({
					message: 'Internal Server Error',
					err,
				});
			} else {
				const query = `
					INSERT INTO users (username, password, mail, registrationDate, money, xp)
					VALUES ($1, $2, $3, $4, 0, 0)
					RETURNING *
				`;

				try {
					const result = await pool.query(query, [
						username,
						hash,
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
			}
		});
	} catch (error) {
		console.error('Error registering user', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};


const loginUser = async (req, res) => {
	const { mail, password } = req.body;

	try {
		const enteredPassword = password;
		const query = `
      SELECT userId, username, password, money, xp
      FROM users
      WHERE mail = $1
    `;

		const result = await pool.query(query, [mail]);

		if (result.rows.length === 1) {
			const user = result.rows[0];

			const same = bcrypt.compareSync(enteredPassword, user.password);

			if (same) {
				// Doğrulama başarılı, JWT oluştur ve kullanıcıya gönder
				const token = creatToken(user.userId);

				res.status(200).json({
					userId: user.userId,
					username: user.username,
					money: user.money,
					level: user.xp,
					token: token,
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	} catch (error) {
		console.error('Entering Error', error);
		res.status(500).json({ message: 'Internal Server Error' });
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

const creatToken = (userId) => {

const secretKey = process.env.JWT_KEY;

	return jwt.sign({ userId }, secretKey, {
	expiresIn:'1d'
}	)

}

module.exports = {
	registerUser,
	loginUser,
	getUsername,
	updatePassword,
};
