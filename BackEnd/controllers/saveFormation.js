const { pool } = require('./playerController');

const saveFormation = async (req, res) => {
	const { userId, players } = req.body;

	if (!userId || !Array.isArray(players) || players.length < 18) {
		if (players.length < 18) {
			console.error('Error saving formation');
			res.status(400).json({
				error: 'Fill all positions, including substitutes',
			});
		} else {
			res.status(400).send('Invalid Request: Invalid parameters');
		}

		console.log(userId);
		return;
	}

	try {
		await pool.query('DELETE FROM formation WHERE userId = $1', [userId]);
	} catch (error) {
		console.error('Error deleting previous formation records', error);
		res.status(500).send('Database error');
		return;
	}

	try {
		const values = players.map((player, index) => [
			userId,
			index + 1,
			player.onlineplayerid,
		]);

		for (let i = 0; i < 18; i++) {
			const queryText = `INSERT INTO formation (userId, positionId, playerId) VALUES ($1, $2, $3)`;
			await pool.query(queryText, [
				values[i][0],
				values[i][1],
				values[i][2],
			]);
		}

		res.status(200).send('Formation saved successfully');
	} catch (error) {
		console.error('Error saving formation', error);
		res.status(500).send('Database error');
	}
};
