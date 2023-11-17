const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendRegistrationEmail, sendResetPassword } = require('./EmailController');
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
					SELECT mail, username FROM users WHERE mail = $1 or username = $2
				`;

				try {
					const checkUserIfExist = await pool.query(queryCheck, [mail, username]);
					if (checkUserIfExist.rows.length > 0) {
						if (checkUserIfExist.rows[0].mail == mail){
							return res.status(409).json({
								message: 'Your email address is registered before. Please try again with another emails!!!',
							});
						}

						return res.status(409).json({
							message: 'Your username is registered before. Please try again with another username!!!',
						});
						
					}
				} catch (error) {
					res.status(500).json({ message: 'Internal server error' });
				}


				const query = `
					INSERT INTO users (username, password, mail, registrationDate, money, xp, is_activated, activation_token, energy)
					VALUES ($1, $2, $3, $4, 0, 0, false, $5, 100)
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
      	SELECT userId, username, password, money, xp, is_activated, activation_token, energy
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
						energy: user.energy
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


const updateCountupPowers = () => {
	pool.query('UPDATE users SET energy = LEAST(energy + 10, 100) RETURNING *', [], (error, result) => {
	  if (error) {
		console.error('Error updating countdown energy:', error);
	  } else {
		result.rows.forEach((user) => {
		  console.log(`Updated energy for user ${user.id}. New energy: ${user.power}.`);
		});
	  }
	});
};


const updateCountdownPowers = async (req, res) => {
	const { userId } = req.body;
	try {
	  const result = await pool.query(
		'UPDATE users SET energy = GREATEST(energy - 30, 0) WHERE userId = $1 RETURNING *',
		[userId]
	  );
  
	  res.status(200).json({
		message: 'Updated energy successfully',
		data: result.rows,
	  });

	} catch (error) {
	  console.error('Error updating countdown energy:', error);
	  res.status(500).json({
		message: 'Internal server error',
		error: error.message,
	  });
	}
  };
  

const resetPassword = async (req, res) => {
	const { resetToken, newPassword } = req.body;  
	try {
		const userResult = await pool.query('SELECT * FROM users WHERE reset_token = $1', [resetToken]);
		const user = userResult.rows[0];
		if (!user) {
			return res.status(400).json({ success: false, message: 'Invalid reset token.' });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		console.log(user);
		console.log('sergen is asking');
		await pool.query('UPDATE users SET password = $1, reset_token = NULL WHERE userid = $2', [hashedPassword, user.userid]);
		res.status(200).json({ success: true, message: 'Password reset successful.' });
	} catch (error) {
		console.error('Error resetting password:', error);
		res.status(500).json({ success: false, message: 'Internal server error.' });
	}
}


const sendUserResetPassword = async (req, res) => {
	const { mail } = req.body;
	sendResetPassword(mail)
}


async function saveResetToken(userMail, resetToken) {
	try {
	  await db.query('UPDATE users SET reset_token = $1 WHERE mail = $2', [resetToken, userMail]);
	  console.log(`Reset token saved for user with ID ${userMail}`);
	} catch (error) {
	  console.error('Error saving reset token:', error);
	  throw error;
	}
}


async function updateFormation(req, res) {
	const {userId,newFormation} = req.body;

	console.log(userId,newFormation,"Formation type");

	
	try {
	  const query = 'UPDATE users SET formation = $1 WHERE userid = $2 RETURNING *';
	  const result = await pool.query(query, [newFormation, userId]);
  
	  if (result.rows.length > 0) {
		res.json(result.rows[0].formation);
		} 
	}
	catch (error) {
		console.error('Error fetching and adding players', error);
		res.status(500).json({ message: 'Internal server error' });
	}
  }


  
async function getFormationType(req, res) {
	const {userId} = req.body;

	try {
	  const query = 'select formation from users  WHERE userid = $1';
	  const result = await pool.query(query, [userId]);
  
	  if (result.rows.length > 0) {
		res.json(result.rows[0]);
		} 
	}
	catch (error) {
		console.error('Error fetching and adding players', error);
		res.status(500).json({ message: 'Internal server error' });
	}
  }

module.exports = {
	registerUser,
	loginUser,
	getUsername,
	updatePassword,
	activateUser, 
	randomPlayer,
	updateCountupPowers,
	updateCountdownPowers,
	resetPassword,
	sendUserResetPassword,
	saveResetToken,
	updateFormation,
	getFormationType
};
