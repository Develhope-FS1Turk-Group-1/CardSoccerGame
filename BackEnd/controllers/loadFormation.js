const { pool } = require('./playerController');

async function loadFormation(req, res) {
	const { userId } = req.body;

	if (!userId) {
		res.status(400).send('Invalid Request: Missing userId');
		return;
	}

	try {
		const result = await pool.query(
			`SELECT formation.positionId, formation.playerId, basePlayers.*, onlinePlayers.*
		 FROM formation
		 JOIN onlinePlayers ON formation.playerId = onlinePlayers.id
		 JOIN basePlayers ON onlinePlayers.baseId = basePlayers.id
		 WHERE formation.userId = $1
		 ORDER BY formation.positionId`,
			[userId],
		);

		if (result.rows.length === 0) {
			res.status(404).send('Formation not found for the specified user');
			return;
		}

		const formation = result.rows.map((row) => {
			return {
				positionId: row.positionid,
				playerId: row.playerid,
				name: row.name,
				position: row.position,
				power: row.power,
				att: row.att,
				mid: row.mid,
				def: row.def,
				gk: row.gk,
				team: row.team,
				img: row.img,
				level: row.level,
				cardCount: row.cardcount,
			};
		});

		res.status(200).json({ formation });
	} catch (error) {
		console.error('Error loading formation', error);
		res.status(500).send('Database error');
	}
}
