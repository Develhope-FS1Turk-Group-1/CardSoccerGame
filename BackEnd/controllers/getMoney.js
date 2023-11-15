const { pool } = require('./playerController');

async function getMoney(req, res) {
	const { userId } = req.params;

	if (!userId) {
		return res.status(400).json({ message: 'userId parameter is missing' });
	}

	try {
		const playerMoney = await pool.query(
			'SELECT money FROM users WHERE userid = $1',
			[userId],
		);

		if (playerMoney.rows.length === 1) {
			const money = playerMoney.rows[0].money;
			return res.status(200).json({ money });
		} else {
			return res.status(404).json({ message: 'User Not Found' });
		}
	} catch (error) {
		console.error('ERROR: ', error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}
