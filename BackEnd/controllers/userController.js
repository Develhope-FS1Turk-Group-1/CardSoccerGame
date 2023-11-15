const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendRegistrationEmail } = require('./EmailController');
const crypto = require('crypto');

const generateActivationToken = () => {
	return crypto.randomBytes(20).toString('hex');
};

const registerUser = async (req, res) => {
	const { username, password, mail } = req.body;

	try {
		const registrationDate = new Date();
		const activationToken = generateActivationToken();
		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) {
				res.status(500).json({
					message: 'Internal Server Error',
					err,
				});
			} else {
				const queryCheck = `
					SELECT username FROM users WHERE mail = $1 or username = $2
				`;

				try {
					const checkUserIfExist = await pool.query(queryCheck, [mail, username]);
					if (checkUserIfExist.rows.length > 0) {
						return res.status(409).json({
							message: 'User registered before please control your information!!!',
						});
					}
				} catch (error) {
					res.status(500).json({ message: 'Internal server error' });
				}


				const query = `
					INSERT INTO users (username, password, mail, registrationDate, money, xp, is_activated, activation_token)
					VALUES ($1, $2, $3, $4, 0, 0, false, $5)
					RETURNING *
				`;

				
				try {
					await sendRegistrationEmail({
						username: username,
						mail: mail,
						activation_token: activationToken,
					});

					const result = await pool.query(query, [
						username,
						hash,
						mail,
						registrationDate,
						activationToken
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



const randomPlayer = async (req, res) => {
	const { userId } = req.body;
	console.log(userId, 'userId')
	try {
		const result = await pool.query(
			`WITH ranked_players AS (
                SELECT 
                    basePlayers.*, 
                    ROW_NUMBER() OVER (PARTITION BY basePlayers.position ORDER BY RANDOM()) AS position_rank
                FROM basePlayers 
                WHERE basePlayers.power >= 40 AND basePlayers.power <= 70
            )
            SELECT * 
            FROM ranked_players
            WHERE 
                (position = 'ATT' AND position_rank <= 4)
                OR (position = 'MID' AND position_rank <= 6)
                OR (position = 'DEF' AND position_rank <= 6)
                OR (position = 'GK' AND position_rank <= 2)
            ORDER BY RANDOM()
            LIMIT 18;`,
		);
		const players = result.rows;
		for (let i = 0; i < players.length; i++) {
			await pool.query(
				`INSERT INTO onlinePlayers (baseId, userId, level, cardCount) VALUES ($1, $2, $3, $4)`,
				[players[i].id, userId, 1, 1],
			);
		}
		console.log(players)
		res.json(players);
	} catch (error) {
		console.error('Error fetching and adding players', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};








const loginUser = async (req, res) => {
	const { mail, password } = req.body;

	try {
		const enteredPassword = password;
		const query = `
      	SELECT userId, username, password, money, xp, is_activated, activation_token
      	FROM users
      	WHERE mail = $1
    	`;

		const result = await pool.query(query, [mail]);

		if (result.rows.length === 1) {
			const user = result.rows[0];

			const same = bcrypt.compareSync(enteredPassword, user.password);
			if (user.is_activated) {
				if (same) {
					const token = creatToken(user.userid);
					res.status(200).json({
						userId: user.userid,
						username: user.username,
						money: user.money,
						level: user.xp,
						token: token,
					});
				} else {
					res.status(401).json({ message: 'Invalid Credentials' });
				}
			} else {
				res.status(401).json({ message: 'You have not been activated your account. Please activate it first' })
			}

		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	} catch (error) {
		console.error('Entering Error', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const activateUser = async (activationToken) => {
	try {
		const query = `
		UPDATE users
		SET is_activated = true
		WHERE activation_token = $1
		RETURNING *
	  `;

		const result = await pool.query(query, [activationToken]);

		if (result.rows.length === 1) {
			return { success: true, user: result.rows[0] };
		} else {
			return { success: false };
		}
	} catch (error) {
		console.error('Error activating user', error);
		throw error;
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
		expiresIn: '1d'
	})

}

module.exports = {
	registerUser,
	loginUser,
	getUsername,
	updatePassword,
	activateUser, 
	randomPlayer
};
